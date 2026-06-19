# Memory — Feature 04 Database Schema Complete

Last updated: 2026-06-19 21:00 WAT

## What was built

Completed Feature 04 with the versioned migration
`migrations/20260619203513_create-jobpilot-schema.sql`. It creates `profiles`,
`agent_runs`, `jobs`, and `agent_logs` with constraints, indexes, grants,
owner-only RLS, and cross-table ownership integrity.

Applied the migration to the linked InsForge backend and created the private
`resumes` storage bucket with owner-and-path-scoped policies on
`storage.objects`. Updated `context/architecture.md`,
`context/progress-tracker.md`, and `context/ui-registry.md` to record the final
schema and feature status.

## Decisions made

The profile schema includes `resume_pdf_url`, `resume_pdf_key`,
`completion_percentage`, and `missing_fields` for Features 05–08. Resume
tailoring remains out of scope, so no tailored-resume columns were added.

Authenticated users have least-privilege access: profiles, runs, and jobs allow
select/insert/approved-column updates; agent logs allow select/insert only; no
application table permits runtime deletes. Child relationships include
`user_id` in their foreign keys so rows cannot reference another user's run or
job.

Resume objects use the key `{user_id}/resume.pdf`. Storage access requires both
object ownership and a first path segment matching the authenticated user ID.

## Problems solved

Closed a relational ownership gap that plain `user_id` RLS would not prevent:
jobs and logs now use composite parent foreign keys containing `user_id`.

InsForge admin SQL surfaces reject session-role and JWT-claim changes, so they
cannot impersonate authenticated users for rollback-only RLS tests. Static
verification confirmed the live schemas, constraints, indexes, grants, active
policies, RLS enablement, and private bucket configuration. Do not retry SQL
session impersonation.

## Current state

Features 01 Homepage, 02 Auth, 03 PostHog Initialization, and 04 Database Schema
are complete. Feature 04 is live on the backend. ESLint, strict TypeScript,
`git diff --check`, and the Next.js production build pass.

The existing frontend production deployment predates the latest local OAuth
callback transport correction; include that local correction with the next
frontend deployment. Feature 04 itself required no frontend deployment.

## Next session starts with

Begin Feature 05 Profile Page — Full UI. Run `/architect` before implementation,
build against mock data only, read the relevant installed Next.js 16 guide
before writing code, and run `/imprint` after adding the profile UI components.
Do not add profile persistence yet; that belongs to Feature 06.

## Open questions

Live authenticated owner/cross-user RLS requests should be verified during
Feature 06 using real SDK CRUD sessions. No Feature 04 schema question remains.
