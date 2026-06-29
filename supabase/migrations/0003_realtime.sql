-- ===========================================================================
-- Citizen MVP — enable Realtime for reports.
-- Lets clients subscribe to live INSERT/UPDATE/DELETE on public.reports.
-- ===========================================================================

-- Emit full old-row data on UPDATE/DELETE (needed for rich realtime payloads).
alter table public.reports replica identity full;

-- Add the table to Supabase's realtime publication.
-- Guarded so re-running the migration is safe.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'reports'
  ) then
    alter publication supabase_realtime add table public.reports;
  end if;
end
$$;
