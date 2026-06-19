"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getSafeProtectedRedirectPath } from "@/lib/auth-redirect";
import {
  OAUTH_NEXT_PATH_KEY,
  OAUTH_VERIFIER_KEY,
} from "@/lib/oauth-storage";
import {
  capturePostHogEvent,
  capturePostHogException,
  initPostHog,
  posthog,
} from "@/lib/posthog-client";

type CallbackState = "loading" | "error";

export function OAuthCallback() {
  const [state, setState] = useState<CallbackState>("loading");

  useEffect(() => {
    async function completeSignIn(): Promise<void> {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("insforge_code");
      const codeVerifier = window.sessionStorage.getItem(OAUTH_VERIFIER_KEY);
      const nextPath = getSafeProtectedRedirectPath(
        window.sessionStorage.getItem(OAUTH_NEXT_PATH_KEY),
      );

      if (!code || !codeVerifier) {
        capturePostHogEvent("sign_in_failed", {
          stage: "oauth_callback",
          reason: "missing_code_or_verifier",
        });
        setState("error");
        return;
      }

      try {
        const postHogReady = initPostHog();
        const distinctId = postHogReady ? posthog.get_distinct_id() : undefined;
        const sessionId = postHogReady ? posthog.get_session_id() : undefined;

        const response = await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(distinctId ? { "X-POSTHOG-DISTINCT-ID": distinctId } : {}),
            ...(sessionId ? { "X-POSTHOG-SESSION-ID": sessionId } : {}),
          },
          body: JSON.stringify({ code, codeVerifier, nextPath }),
        });

        const result: unknown = await response.json();

        if (!response.ok) {
          capturePostHogEvent("sign_in_failed", {
            stage: "oauth_callback",
            reason: "callback_api_error",
          });
          setState("error");
          return;
        }

        window.sessionStorage.removeItem(OAUTH_VERIFIER_KEY);
        window.sessionStorage.removeItem(OAUTH_NEXT_PATH_KEY);
        capturePostHogEvent("sign_in_completed");
        window.location.replace(getRedirectPath(result));
      } catch (error) {
        console.error("[auth/callback]", error);
        capturePostHogEvent("sign_in_failed", {
          stage: "oauth_callback",
          reason: "unexpected_exception",
        });
        capturePostHogException(error, { stage: "oauth_callback" });
        setState("error");
      }
    }

    void completeSignIn();
  }, []);

  if (state === "error") {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-text-primary">
          Sign in could not be completed
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-secondary">
          The sign-in link may have expired. Please return to login and try
          again.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-md bg-text-slate px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-overlay"
        >
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center" role="status">
      <span className="mx-auto block size-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      <h1 className="mt-5 text-xl font-semibold text-text-primary">
        Finishing your sign in
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        You will be redirected in a moment.
      </p>
    </div>
  );
}

function getRedirectPath(result: unknown): string {
  if (
    typeof result === "object" &&
    result !== null &&
    "data" in result &&
    typeof result.data === "object" &&
    result.data !== null &&
    "redirectTo" in result.data &&
    typeof result.data.redirectTo === "string"
  ) {
    return getSafeProtectedRedirectPath(result.data.redirectTo);
  }

  return "/dashboard";
}
