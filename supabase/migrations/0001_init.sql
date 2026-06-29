-- ===========================================================================
-- Citizen MVP — initial schema
-- Apply via the Supabase SQL Editor, or `supabase db push` with the CLI.
-- ===========================================================================

-- PostGIS powers geospatial queries (radius search, geofencing, clustering).
create extension if not exists postgis;

-- ---------------------------------------------------------------------------
-- Profiles: 1:1 with auth.users, holds app-level role.
-- ---------------------------------------------------------------------------
create type user_role as enum ('citizen', 'staff', 'admin');

create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  role       user_role not null default 'citizen',
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Reports.
-- ---------------------------------------------------------------------------
create type report_status   as enum ('submitted', 'triaged', 'in_progress', 'resolved', 'rejected');
create type report_severity as enum ('low', 'medium', 'high', 'critical');

create table public.reports (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 3 and 160),
  description text not null check (char_length(description) between 1 and 5000),
  category    text not null,
  severity    report_severity not null default 'medium',
  status      report_status   not null default 'submitted',
  lat         double precision not null check (lat between -90 and 90),
  lng         double precision not null check (lng between -180 and 180),
  -- Derived geography point kept in sync automatically; indexed for fast geo queries.
  geom        geography(Point, 4326)
                generated always as (st_setsrid(st_makepoint(lng, lat), 4326)::geography) stored,
  address     text,
  media_urls  text[] not null default '{}',
  -- Null = anonymous report. Set null (not cascade) so reports survive account deletion.
  reporter_id uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index reports_geom_idx       on public.reports using gist (geom);
create index reports_status_idx     on public.reports (status);
create index reports_created_at_idx on public.reports (created_at desc);
create index reports_reporter_idx   on public.reports (reporter_id);

-- Keep updated_at fresh on every update.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reports_set_updated_at
  before update on public.reports
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — the database enforces access even if app code is wrong.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.reports  enable row level security;

-- Profiles: a user sees and edits only their own profile.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Reports: public read (civic transparency); authenticated insert; owner/staff update.
create policy "reports_select_public" on public.reports
  for select using (true);

create policy "reports_insert_authenticated" on public.reports
  for insert to authenticated
  with check (reporter_id = auth.uid() or reporter_id is null);

create policy "reports_update_owner_or_staff" on public.reports
  for update using (
    reporter_id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('staff', 'admin')
    )
  );
