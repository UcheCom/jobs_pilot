# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** Tailwind v4 global token setup
**Next:** 01 Homepage

---

## Progress

### Phase 1 — Foundation

- [ ] 01 Homepage
- [ ] 02 Auth
- [ ] 03 PostHog Initialization
- [ ] 04 Database Schema

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

---

## Notes

- `postcss.config.mjs` already uses `@tailwindcss/postcss`, matching the installed Next.js Tailwind v4 setup guide.
