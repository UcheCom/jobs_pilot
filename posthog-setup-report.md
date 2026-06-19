# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into JobPilot's Next.js App Router application. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` and improve delivery reliability. A server-side client (`lib/posthog-server.ts`) handles API route tracking using `posthog-node`. The OAuth authentication flow is fully instrumented — from landing page CTA clicks, through OAuth provider selection, to the callback completion and dashboard arrival. Users are identified with `posthog.identify()` on the client when the dashboard loads, and the PostHog distinct ID is forwarded as an HTTP header so server-side events correlate with the same session. Error tracking (`captureException`) is wired into every catch block in the sign-in flow.

| Event | Description | File |
|---|---|---|
| `sign_in_initiated` | User clicks Google or GitHub OAuth sign-in button | `components/auth/OAuthButtons.tsx` |
| `sign_in_start_failed` | OAuth redirect initiation failed (URL or code verifier missing) | `components/auth/OAuthButtons.tsx` |
| `sign_in_completed` | OAuth callback exchange succeeded; user redirected to dashboard | `components/auth/OAuthCallback.tsx` |
| `sign_in_failed` | OAuth callback exchange failed (expired link or server error) | `components/auth/OAuthCallback.tsx` |
| `hero_cta_clicked` | User clicks a CTA button in the landing page hero section | `components/homepage/Hero.tsx` |
| `final_cta_clicked` | User clicks a CTA button in the landing page final section | `components/homepage/FinalCta.tsx` |
| `dashboard_viewed` | Authenticated user views the dashboard (product activation) | `app/dashboard/page.tsx` |
| `server_oauth_exchange_succeeded` | Server: OAuth code exchange completed and auth cookies set | `app/api/auth/callback/route.ts` |
| `server_oauth_exchange_failed` | Server: OAuth code exchange failed | `app/api/auth/callback/route.ts` |
| `server_user_signed_out` | Server: User session terminated via the logout endpoint | `app/api/auth/logout/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/202127/dashboard/755339)
- [Sign-in conversion funnel (wizard)](https://eu.posthog.com/project/202127/insights/SBN3BIla)
- [Daily sign-ins (wizard)](https://eu.posthog.com/project/202127/insights/lnXjboky)
- [Sign-in failures over time (wizard)](https://eu.posthog.com/project/202127/insights/INlnktiw)
- [Landing page CTA clicks (wizard)](https://eu.posthog.com/project/202127/insights/bTauVDvf)
- [Product activation — dashboard views (wizard)](https://eu.posthog.com/project/202127/insights/O3ljynUX)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `PostHogIdentify` only mounts on the dashboard. Add it (or an equivalent call) to any other authenticated layout so returning sessions on existing tabs also get identified without requiring a fresh sign-in.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
