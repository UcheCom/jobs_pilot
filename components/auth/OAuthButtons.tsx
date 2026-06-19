"use client";

import { useState } from "react";

import { OAuthProviderIcon } from "@/components/auth/OAuthProviderIcon";
import { getSafeProtectedRedirectPath } from "@/lib/auth-redirect";
import { getInsforgeBrowserClient } from "@/lib/insforge-client";
import {
  OAUTH_NEXT_PATH_KEY,
  OAUTH_VERIFIER_KEY,
} from "@/lib/oauth-storage";
import {
  capturePostHogEvent,
  capturePostHogException,
} from "@/lib/posthog-client";

type OAuthProvider = "google" | "github";

type OAuthButtonsProps = {
  nextPath?: string;
};

export function OAuthButtons({ nextPath }: OAuthButtonsProps) {
  const [activeProvider, setActiveProvider] = useState<OAuthProvider | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn(provider: OAuthProvider): Promise<void> {
    setActiveProvider(provider);
    setErrorMessage(null);
    capturePostHogEvent("sign_in_initiated", { provider });

    try {
      const callbackUrl = new URL("/callback", window.location.origin);
      const safeNextPath = getSafeProtectedRedirectPath(nextPath);

      const insforge = getInsforgeBrowserClient();
      const { data, error } = await insforge.auth.signInWithOAuth(provider, {
        redirectTo: callbackUrl.toString(),
        additionalParams:
          provider === "google" ? { prompt: "select_account" } : undefined,
        skipBrowserRedirect: true,
      });

      if (error || !data.url || !data.codeVerifier) {
        console.error("[auth/oauth]", error);
        capturePostHogEvent("sign_in_start_failed", {
          provider,
          reason: "missing_url_or_verifier",
        });
        setErrorMessage("We could not start sign in. Please try again.");
        setActiveProvider(null);
        return;
      }

      window.sessionStorage.setItem(OAUTH_VERIFIER_KEY, data.codeVerifier);
      window.sessionStorage.setItem(OAUTH_NEXT_PATH_KEY, safeNextPath);
      window.location.assign(data.url);
    } catch (error) {
      console.error("[auth/oauth]", error);
      capturePostHogEvent("sign_in_start_failed", {
        provider,
        reason: "unexpected_exception",
      });
      capturePostHogException(error, {
        provider,
        stage: "oauth_start",
      });
      setErrorMessage("We could not start sign in. Please try again.");
      setActiveProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => handleSignIn("google")}
        disabled={activeProvider !== null}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <OAuthProviderIcon provider="google" />
        {activeProvider === "google" ? "Connecting..." : "Continue with Google"}
      </button>

      <button
        type="button"
        onClick={() => handleSignIn("github")}
        disabled={activeProvider !== null}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-md bg-text-slate px-4 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-overlay disabled:cursor-not-allowed disabled:opacity-60"
      >
        <OAuthProviderIcon provider="github" />
        {activeProvider === "github" ? "Connecting..." : "Continue with GitHub"}
      </button>

      {errorMessage ? (
        <p role="alert" className="text-center text-sm text-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
