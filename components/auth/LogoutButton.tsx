"use client";

import { useState } from "react";

import { capturePostHogException, resetPostHog } from "@/lib/posthog-client";

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleLogout(): Promise<void> {
    setIsLoggingOut(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      resetPostHog();
      window.location.replace("/login");
    } catch (error) {
      console.error("[auth/logout]", error);
      capturePostHogException(error, { stage: "logout" });
      setErrorMessage("We could not sign you out. Please try again.");
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? "Signing out..." : "Sign out"}
      </button>
      {errorMessage ? (
        <p role="alert" className="mt-3 text-sm text-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
