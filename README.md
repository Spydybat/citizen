# Citizen — Global Civic Reporting & Public Safety Platform

Report civic issues and public-safety incidents, and track them from submission
to resolution. This repository is the **V1 (MVP)** foundation.

## Stack (V1)

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4**
- **Supabase** — Auth, PostgreSQL (+ PostGIS), Storage, Realtime
- **PWA** — installable, offline-aware
- **Vercel** hosting · **pnpm** · **ESLint** + **Prettier**

The architecture is intentionally modular so heavier infrastructure (dedicated
API service, Redis, dedicated auth, search, mobile apps) can be added later
without a rewrite. See [`docs/architecture`](docs/architecture) and
[`docs/ROADMAP.md`](docs/ROADMAP.md).

## Project structure

```
citizen/
├─ src/
│  ├─ app/                 # App Router: pages, layout, manifest, offline
│  │  ├─ dashboard/        # protected example (server-side auth check)
│  │  ├─ login/            # auth entry (placeholder → Phase 1)
│  │  ├─ report/new/       # report form (placeholder → Phase 1)
│  │  └─ offline/          # PWA offline fallback
│  ├─ components/pwa/      # service-worker registration
│  ├─ config/              # site config
│  ├─ features/            # domain slices (reports, …) — modular boundary
│  ├─ lib/
│  │  ├─ env.ts            # fail-fast env access
│  │  └─ supabase/         # browser/server/middleware clients (data boundary)
│  └─ types/               # shared + generated DB types
├─ supabase/
│  └─ migrations/          # schema, RLS policies, storage (portable SQL)
├─ public/                 # service worker, icons
├─ docs/                   # ADRs + roadmap
└─ middleware.ts           # Supabase session refresh + route guard
```

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create a Supabase project

At [supabase.com](https://supabase.com), create a project, then apply the
schema — open the SQL Editor and run, in order:

- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_storage.sql`

(See [`supabase/README.md`](supabase/README.md) for the CLI alternative.)

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`SUPABASE_SERVICE_ROLE_KEY` from **Supabase → Settings → API**.

### 4. Run

```bash
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `pnpm dev`           | Start the dev server                 |
| `pnpm build`         | Production build                     |
| `pnpm start`         | Run the production build             |
| `pnpm lint`          | ESLint                               |
| `pnpm format`        | Prettier write                       |
| `pnpm typecheck`     | TypeScript, no emit                  |

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel (auto-detects Next.js).
3. Add the same env vars from `.env.local` in the Vercel project settings.
4. Deploy.

## Notes

- The PWA service worker registers in **production only**.
- Add raster icons `public/icons/icon-192.png` and `icon-512.png` for full
  installability across all platforms (an SVG icon ships by default).
- Row Level Security is enabled on every table — the database enforces access.
