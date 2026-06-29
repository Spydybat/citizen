# Roadmap

Phased delivery for a solo developer. Each phase is shippable on its own.

## ✅ Phase 0 — Foundation (this commit)

Project scaffold, tooling (ESLint/Prettier/TS), Tailwind v4, PWA shell,
Supabase data-access layer, RLS-secured schema + storage, docs/ADRs.

## Phase 1 — MVP core

- Supabase Auth: email/OTP + at least one OAuth provider; profile bootstrap.
- Report creation: form, category/severity, **location capture**, photo upload
  to Supabase Storage.
- Public report list + report detail; map view (MapLibre GL).
- "My reports" dashboard; status lifecycle (submitted → resolved).
- Zod validation shared client/server; Server Actions in `features/reports`.

## Phase 2 — PWA, offline & realtime

- Offline report drafting + background sync queue.
- Supabase Realtime: live status/feed updates.
- Media pipeline: client-side resize + EXIF strip before upload; moderation hook.
- Full-text + geo search.

## Phase 3 — Mobile (Android/iOS)

- Expo React Native app reusing shared types + data contracts.
- Native camera/GPS/push. (Triggers the move to a Turborepo monorepo.)

## Phase 4 — Government & admin portals

- Triage/assignment workflows, SLA tracking, jurisdiction multi-tenancy,
  analytics dashboards, audit log views.

## Phase 5 — Scale & compliance

- Extract hot services (media, realtime) where metrics justify.
- Multi-region + data residency; observability; security audit; WCAG + i18n.

> Heavier infrastructure (NestJS, Docker/K8s, Terraform, Redis, Keycloak,
> OpenSearch) is introduced only when a phase above creates the need — see
> ADR 0002.
