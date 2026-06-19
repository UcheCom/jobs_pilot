import type { Metadata } from "next";

import { OAuthCallback } from "@/components/auth/OAuthCallback";

export const metadata: Metadata = {
  title: "Signing in | JobPilot",
};

export default function CallbackPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-8 shadow-sm">
        <OAuthCallback />
      </section>
    </main>
  );
}
