import posthog from "posthog-js";

let initialized = false;
let disabled = false;

export type PostHogBrowserEvent =
  | "sign_in_initiated"
  | "sign_in_start_failed"
  | "sign_in_completed"
  | "sign_in_failed"
  | "hero_cta_clicked"
  | "final_cta_clicked"
  | "dashboard_viewed"
  | "job_search_started"
  | "job_found"
  | "profile_completed"
  | "company_researched";

function getPostHogConfig(): { apiKey: string; apiHost: string } | null {
  const apiKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!apiKey || !apiHost) {
    return null;
  }

  return { apiKey, apiHost };
}

export function initPostHog(): boolean {
  if (initialized) {
    return true;
  }

  if (disabled || typeof window === "undefined") {
    return false;
  }

  const config = getPostHogConfig();

  if (!config) {
    disabled = true;
    return false;
  }

  posthog.init(config.apiKey, {
    api_host: "/ingest",
    capture_pageview: false,
    capture_exceptions: true,
  });

  initialized = true;
  return true;
}

export function capturePostHogEvent(
  event: PostHogBrowserEvent,
  properties?: Record<string, unknown>,
): void {
  if (!initPostHog()) {
    return;
  }

  posthog.capture(event, properties);
}

export function capturePostHogException(
  error: unknown,
  properties?: Record<string, unknown>,
): void {
  if (!initPostHog()) {
    return;
  }

  posthog.captureException(error, properties);
}

export function resetPostHog(): void {
  if (!initPostHog()) {
    return;
  }

  posthog.reset();
}

export { posthog };
