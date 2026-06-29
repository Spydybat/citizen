# Supabase

Database schema, RLS policies, and storage setup for Citizen.

## Apply the schema

**Option A — SQL Editor (fastest):** open your project → SQL Editor → paste and
run each file in `migrations/` in order (`0001`, then `0002`).

**Option B — Supabase CLI (recommended once set up):**

```bash
pnpm dlx supabase login
pnpm dlx supabase link --project-ref <YOUR_PROJECT_REF>
pnpm dlx supabase db push
```

## After applying

Regenerate typed DB types into the app:

```bash
pnpm dlx supabase gen types typescript \
  --project-id <YOUR_PROJECT_REF> --schema public > src/types/database.ts
```

## Notes

- `0001_init.sql` — `profiles` (+ auto-create trigger on signup) and `reports`
  with a PostGIS `geom` column, indexes, and Row Level Security.
- `0002_storage.sql` — the `report-media` bucket and its access policies.
- RLS is **on** for every table. Public can *read* reports; only authenticated
  users can *create*; owners and staff/admins can *update*.
