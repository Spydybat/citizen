# Feature: reports

Self-contained slice for civic reports. Everything specific to reporting lives
here so the domain can later be extracted into its own package/service without
hunting across the codebase.

## Convention (per feature folder)

```
features/<domain>/
├─ types.ts         # domain types (framework-agnostic)
├─ schema.ts        # input validation (Phase 1)
├─ data.ts          # Supabase queries/mutations — the only place that talks to the DB
├─ actions.ts       # Next.js Server Actions wrapping data.ts
├─ components/      # UI specific to this domain
└─ hooks/           # client hooks (realtime subscriptions, etc.)
```

UI components import from `data`/`actions`; nothing else reaches into Supabase
directly for this domain. That boundary is what lets us swap Supabase calls for
a dedicated API client later with a localized change.
