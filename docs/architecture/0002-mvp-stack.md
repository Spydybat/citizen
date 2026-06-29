# ADR 0002 — MVP technology stack

- **Status:** Accepted
- **Date:** 2026-06-29

## Context

The full target architecture (see project brief) includes a NestJS backend,
Docker/Kubernetes, Terraform, Redis, Keycloak, OpenSearch, and microservices.
For V1, built by a solo developer, that is too much undifferentiated heavy
lifting. We need to ship a usable, secure MVP fast without painting ourselves
into a corner.

## Decision

For V1 we use a **single Next.js 16 app** with **Supabase** as the backend:

| Concern        | V1 choice                          | Grows into (later)                |
| -------------- | ---------------------------------- | --------------------------------- |
| App            | Next.js 16 (App Router), TS, Tailwind | + `apps/` via Turborepo        |
| Backend/API    | Next.js Server Actions / Route Handlers | dedicated NestJS service     |
| Database       | Supabase Postgres + PostGIS        | same Postgres, read replicas      |
| Auth           | Supabase Auth                      | Keycloak / OIDC federation        |
| Authorization  | Postgres Row Level Security        | + ABAC, service-level policy      |
| Storage        | Supabase Storage                   | S3 + media worker                 |
| Realtime       | Supabase Realtime                  | self-hosted WS + Redis pub/sub    |
| Hosting        | Vercel                             | Kubernetes, multi-region          |

We explicitly **defer** NestJS, Docker, Kubernetes, Terraform, Redis, Keycloak,
OpenSearch, and microservices.

## How we stay migration-ready

- **Feature folders** (`src/features/<domain>`) keep domain logic localized.
- **A single data-access boundary** (`src/lib/supabase` + per-feature `data.ts`)
  is the only place that talks to Supabase, so the client can be swapped later.
- **SQL migrations** under `supabase/` mean the schema is portable to any Postgres.
- **Shared types** decouple UI from transport.

## Consequences

- Fast to build and operate; near-zero infra ops for V1.
- Some Supabase-specific coupling — contained behind the data-access boundary.
- When scale or sovereignty demands it, services are extracted additively.
