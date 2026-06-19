"use client";

import { useEffect } from "react";

import {
  capturePostHogEvent,
  initPostHog,
  posthog,
} from "@/lib/posthog-client";

type PostHogIdentifyProps = {
  userId: string;
  email?: string;
  captureDashboardView?: boolean;
};

export function PostHogIdentify({
  userId,
  email,
  captureDashboardView = false,
}: PostHogIdentifyProps) {
  useEffect(() => {
    if (!initPostHog()) {
      return;
    }

    posthog.identify(userId, { email });
    if (captureDashboardView) {
      capturePostHogEvent("dashboard_viewed", { userId });
    }
  }, [captureDashboardView, userId, email]);

  return null;
}
