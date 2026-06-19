# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 04 Database Schema
**In progress:** None
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build

- Tailwind CSS v4 is configured through `@import "tailwindcss"` and `@theme` in `app/globals.css`; no `tailwind.config.ts` is needed for design tokens.
- Inter is wired through `next/font/google` using the `--font-sans` variable expected by the global theme.
- The homepage uses the supplied dashboard, jobs list, agent log, testimonial, and logo assets from `public/`.
- The soft landing-page background is a bitmap asset exposed through the shared `landing-hero-texture` class.
- PostHog uses wizard-compatible client instrumentation plus a guarded server capture helper. The current app tracks landing CTA clicks, OAuth start/success/failure, server auth outcomes, sign-out, and authenticated dashboard views; future product events must stay aligned with `code-standards.md`.
- PostHog browser captures accept `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` as a compatibility fallback and no-op quietly if analytics env vars are absent.
- Browser PostHog delivery uses the `/ingest` reverse proxy, exception capture is enabled, and client logout resets identity before redirecting to login.
- Feature 04 uses a versioned InsForge migration for all application tables,
  constraints, indexes, grants, and RLS. Runtime roles have no delete access;
  agent logs are append-only and ownership columns cannot be updated.
- Profile completion metadata and both resume storage identifiers are part of
  the initial schema: `completion_percentage`, `missing_fields`,
  `resume_pdf_url`, and `resume_pdf_key`.
- Jobs and logs use composite parent foreign keys containing `user_id`, so a
  user-owned child cannot reference another user's run or job.

---

## Notes

- `postcss.config.mjs` already uses `@tailwindcss/postcss`, matching the installed Next.js Tailwind v4 setup guide.
- Auth code is implemented with `@insforge/sdk` 1.4 SSR helpers, PKCE callback exchange, refresh cookies, and Next.js 16 `proxy.ts` route protection.
- Auth review fixes completed: OAuth startup handles thrown SDK/browser errors, and stale access-token cookies no longer cause a `/login` and `/dashboard` redirect loop.
- Auth log cleanup completed: the browser InsForge client is lazy-created with a guarded startup refresh, public proxy refresh work is skipped when no auth cookies exist, dashboard fallback redirects preserve `next=/dashboard`, and the Next.js 16 smooth-scroll attribute is set on `<html>`.
- Auth recovery completed: `proxy.ts` is the single redirect authority for `/`, `/login`, and protected routes; page-level duplicate session checks were removed; normal SDK refresh behavior was restored for httpOnly refresh-cookie recovery; and root body hydration tolerates extension-added attributes.
- PostHog review findings resolved: wizard event names and server auth events were restored, browser ingestion now uses `/ingest`, analytics failures are isolated from auth, and the dashboard exposes a sign-out action that calls `posthog.reset()`.
- Minimal authenticated route shells now prevent `/profile` and `/find-jobs` from returning 404 before their full feature phases. Unauthenticated requests preserve their route in the login `next` parameter.
- Production is deployed at `https://63xj5vi7.insforge.site` with InsForge and PostHog environment variables configured.
- Auth completion verified: InsForge allows the localhost and production `/callback` URLs, rejects unrelated redirect origins, and has completed linked accounts for both Google and GitHub. The approved callback configuration is tracked declaratively in `insforge.toml`.
- Final Auth security review resolved the callback open redirect: login, callback UI, callback API, and Proxy now share `lib/auth-redirect.ts`, which canonicalizes destinations and permits only Dashboard, Profile, and Find Jobs route families.
- OAuth callback recovery keeps the InsForge `redirectTo` value exactly equal to the registered queryless `/callback` URL and carries the validated protected destination separately in same-tab session storage.
- Database migration `20260619203513_create-jobpilot-schema.sql` is applied to
  the linked backend. The four application tables have owner-only RLS and the
  `resumes` bucket is private with owner-and-path-scoped storage RLS.
- InsForge admin SQL surfaces prohibit changing session roles or JWT claims, so
  authenticated request simulation is deferred to Feature 06's real profile
  CRUD verification. Active schema, policies, constraints, grants, indexes,
  and bucket privacy were verified directly after migration.
