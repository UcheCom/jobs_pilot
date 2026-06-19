# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Brand Navigation

- Files: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`
- Last updated: 2026-06-13
- Background: `bg-surface`
- Border: `border-border`
- Primary text: `text-text-slate`
- Brand asset: `/logo.png`
- Spacing: navbar `px-5 md:px-10`; footer `px-8 md:px-12`
- Interactive state: `transition-colors hover:text-accent`

**Pattern notes:** Use the complete logo asset rather than rebuilding the mark.
Desktop navbar links are 16px medium text; compact screens retain the logo and
primary CTA while hiding the central navigation.

### Landing Page CTA

- Files: `components/homepage/Hero.tsx`, `components/homepage/FinalCta.tsx`
- Last updated: 2026-06-13
- Primary: `rounded-md bg-text-slate text-accent-foreground hover:bg-overlay`
- Secondary: `rounded-md border border-border-muted bg-surface/70 text-text-slate`
- Height and spacing: `min-h-14 px-7 py-3`
- Text: `text-base font-medium`

**Pattern notes:** Landing CTA pairs always place the dark primary action first
and the bordered secondary action second. They stack at small widths.

### Landing Hero

- File: `components/homepage/Hero.tsx`
- Last updated: 2026-06-13
- Background: `landing-hero-texture`
- Border: `border-b border-border`
- Heading: `text-[42px] md:text-[64px] font-bold leading-[1.08] text-text-slate`
- Body: `text-lg md:text-xl font-normal leading-8 text-text-slate-medium`
- Spacing: `px-5 py-20`

**Pattern notes:** Hero copy remains centered with a five-line-width maximum and
uses the shared bitmap texture rather than a component-level gradient.

### Product Showcase

- Files: `components/homepage/JobSearchShowcase.tsx`, `components/homepage/ApplicationShowcase.tsx`
- Last updated: 2026-06-13
- Backgrounds: content `bg-surface`; media `bg-surface-muted`
- Border: `border-border`
- Heading: `text-[40px] md:text-[52px] font-semibold leading-[1.08] text-text-slate`
- Item title: `text-xl font-semibold leading-7 text-text-slate`
- Item body: `text-base md:text-lg font-normal leading-8 text-text-slate-medium`
- Accent usage: active item `border-l-2 border-l-accent` or `border-l-success`

**Pattern notes:** Desktop showcases use equal two-column grids and alternate
media placement. At smaller widths, copy and media stack without nested cards.

### Landing Testimonial

- File: `components/homepage/Testimonial.tsx`
- Last updated: 2026-06-13
- Background: `bg-surface` inherited from page
- Label: `text-sm font-medium uppercase text-accent`
- Quote: `text-[28px] md:text-[38px] font-normal leading-[1.45] text-text-slate`
- Avatar radius: `rounded-md`
- Spacing: `px-6 py-20`

**Pattern notes:** Testimonials are unframed, centered sections with a single
large quote and compact author row.

### Landing Section Divider

- File: `app/globals.css`
- Last updated: 2026-06-13
- Class: `landing-divider`
- Border: `border-top` and `border-bottom` using `--color-border`
- Height: 96px desktop, 56px mobile

**Pattern notes:** Use only between major editorial landing-page sections.

### Authentication Card

- Files: `app/(auth)/login/page.tsx`, `app/(auth)/callback/page.tsx`
- Last updated: 2026-06-14
- Background: page `bg-background`; card `bg-surface`
- Border: `border border-border`
- Border radius: `rounded-xl`
- Primary text: `text-text-primary`
- Secondary text: `text-text-secondary`
- Spacing: card `p-6 sm:p-8`; section gaps `mt-8`
- Shadow: `shadow-sm`

**Pattern notes:** Authentication screens use one centered card with the full
brand asset, concise centered copy, and no surrounding navigation.

### OAuth Buttons

- Files: `components/auth/OAuthButtons.tsx`, `components/auth/OAuthProviderIcon.tsx`, `components/auth/OAuthCallback.tsx`
- Last updated: 2026-06-14
- Primary: `rounded-md bg-text-slate text-accent-foreground hover:bg-overlay`
- Secondary: `rounded-md border border-border bg-surface text-text-primary hover:bg-surface-secondary`
- Height and spacing: `min-h-12 px-4 py-3`
- Text: `text-sm font-medium`
- Disabled state: `disabled:cursor-not-allowed disabled:opacity-60`
- Error text: `text-center text-sm text-error`

**Pattern notes:** Social sign-in actions stack vertically with provider icons.
Only one provider can enter a loading state at a time. Thrown SDK or browser
errors restore both buttons and display a human-readable inline message. OAuth
always uses the registered queryless `/callback` URL; the validated post-login
destination is carried separately in same-tab session storage.

### Authentication Async State

- File: `components/auth/OAuthCallback.tsx`
- Last updated: 2026-06-14
- Background: inherited `bg-surface` authentication card
- Border: spinner `border-2 border-border border-t-accent`
- Border radius: spinner `rounded-full`; action `rounded-md`
- Primary text: `text-xl font-semibold text-text-primary`
- Secondary text: `text-sm text-text-secondary`
- Spacing: heading `mt-5`; body `mt-2`; recovery action `mt-6`
- Recovery action: `bg-text-slate text-accent-foreground hover:bg-overlay`

**Pattern notes:** Blocking authentication work uses a centered accent spinner,
short status copy, and no competing controls. Failure replaces the spinner with
a clear heading, human-readable explanation, and one dark recovery action.

### Analytics Provider

- File: `components/analytics/PostHogProvider.tsx`
- Last updated: 2026-06-19
- Visual output: none
- Purpose: Exposes the instrumentation-initialized PostHog client through the React provider.

**Pattern notes:** Analytics infrastructure components should not render visible
UI, add layout wrappers, or introduce styling classes.

### Sign Out Action

- File: `components/auth/LogoutButton.tsx`
- Last updated: 2026-06-19
- Secondary action: `rounded-md border border-border bg-surface text-text-primary hover:bg-surface-secondary`
- Disabled state: `disabled:cursor-not-allowed disabled:opacity-60`
- Error text: `text-sm text-error`

**Pattern notes:** Sign out clears the server session first, resets the PostHog
browser identity, and then replaces navigation with `/login`. Failures retain
the current page and show a human-readable inline error.

### Protected Route Placeholder

- File: `components/auth/ProtectedRouteShell.tsx`
- Last updated: 2026-06-19
- Background: page `bg-background`; card `bg-surface`
- Border: `border border-border`
- Border radius: card `rounded-xl`; action `rounded-md`
- Primary text: `text-2xl font-semibold text-text-primary`
- Secondary text: `text-sm leading-6 text-text-secondary`
- Spacing: page `px-5 py-12`; card `p-6`; action `mt-6 px-4 py-2`
- Shadow: `shadow-sm`
- Accent usage: eyebrow `text-sm font-medium text-accent`
- Interactive state: action `transition-colors hover:bg-surface-secondary`

**Pattern notes:** Temporary authenticated route shells match the dashboard card
and authentication surface treatments. They verify route access without
introducing UI or product logic assigned to later features.

## Foundations

### Auth Route Protection

- Paths: `proxy.ts`, `lib/auth-redirect.ts`, `app/(auth)/callback/page.tsx`, `app/profile/page.tsx`, `app/find-jobs/page.tsx`
- Last updated: 2026-06-19
- Public routes: `/`, `/login`, `/callback`
- Protected routes: `/dashboard`, `/profile`, `/find-jobs` and nested paths
- Default authenticated destination: `/dashboard`
- Preserved destinations: protected `next` paths only
- OAuth callbacks: declared in `insforge.toml`

**Pattern notes:** Proxy is the primary redirect authority, while protected
pages retain a server-side user check for defense in depth. OAuth redirects are
restricted to the localhost and production callback URLs; unrelated origins
must be rejected by InsForge. All post-auth destinations pass through the shared
protected-route parser; do not add component- or route-local redirect validators.

### PostHog Client

- Paths: `lib/posthog-client.ts`, `lib/posthog-server.ts`, `instrumentation-client.ts`
- Last updated: 2026-06-19
- Browser setup: `NEXT_PUBLIC_POSTHOG_KEY` or `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST`, `capture_pageview: false`
- Server setup: `flushAt: 1`, `flushInterval: 0`, shutdown required after captures

**Pattern notes:** Client components import the shared browser client from
`lib/posthog-client.ts`. Server routes and Server Components use
`createPostHogServer()` only for approved events listed in `code-standards.md`.
Browser captures go through `/ingest` and no-op quietly when PostHog env vars
are absent. Server capture and shutdown failures are contained inside the
analytics helper.

### InsForge Data Foundation

- Path: `migrations/20260619203513_create-jobpilot-schema.sql`
- Last updated: 2026-06-19
- Visual output: none
- Tables: `profiles`, `agent_runs`, `jobs`, `agent_logs`
- Storage: private `resumes` bucket with `{user_id}/` ownership paths

**Pattern notes:** Feature 04 adds no visual component or styling pattern.
Future data-backed UI must use the established owner-scoped tables and persist
both the returned resume URL and storage key.

### Global Tailwind Theme

- Path: `app/globals.css`
- Purpose: Defines the JobPilot Tailwind v4 design tokens with `@theme`.
- Generated utility examples: `bg-background`, `bg-surface`, `text-text-primary`, `text-accent`, `border-border`, `rounded-md`.
- Base styles: `body` uses `var(--color-background)`, `var(--color-text-primary)`, and `var(--font-sans)`.
- Landing texture: `public/images/hero-texture.png`, exposed through `landing-hero-texture`.
- Root layout: `app/layout.tsx` applies Inter through `--font-sans`, opts into Next.js 16 smooth-scroll route-transition handling with `data-scroll-behavior="smooth"`, and suppresses body-level hydration warnings caused by browser-extension attributes.
