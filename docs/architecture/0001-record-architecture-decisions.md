# ADR 0001 — Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-06-29

## Context

This platform will grow across web, PWA, mobile, and government/admin portals
over multiple phases by (initially) a solo developer. Decisions made now have
long-lived consequences and need to be discoverable later.

## Decision

We record significant architectural decisions as ADRs in `docs/architecture/`,
numbered sequentially. Each ADR captures context, the decision, and its
consequences. Superseded ADRs are marked, not deleted.

## Consequences

- New contributors (and future-me) can understand *why*, not just *what*.
- Reversing a decision is a deliberate, documented act.
