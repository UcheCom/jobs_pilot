import { PostHog } from "posthog-node";

type PostHogServerEvent =
  | "server_oauth_exchange_succeeded"
  | "server_oauth_exchange_failed"
  | "server_user_signed_out"
  | "job_found"
  | "profile_completed"
  | "company_researched";

function getPostHogServerConfig(): {
  apiKey: string;
  apiHost: string;
} | null {
  const apiKey =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ??
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!apiKey || !apiHost) {
    return null;
  }

  return { apiKey, apiHost };
}

export function createPostHogServer(): PostHog | null {
  const config = getPostHogServerConfig();

  if (!config) {
    return null;
  }

  return new PostHog(config.apiKey, {
    host: config.apiHost,
    flushAt: 1,
    flushInterval: 0,
  });
}

export async function capturePostHogServerEvent(
  distinctId: string,
  event: PostHogServerEvent,
  properties?: Record<string, unknown>,
): Promise<void> {
  const client = createPostHogServer();

  if (!client) {
    return;
  }

  try {
    client.capture({ distinctId, event, properties });
  } catch (error) {
    console.error("[posthog-server/capture]", error);
  } finally {
    try {
      await client.shutdown();
    } catch (error) {
      console.error("[posthog-server/shutdown]", error);
    }
  }
}
