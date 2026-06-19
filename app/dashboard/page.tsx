import { redirect } from "next/navigation";

import { PostHogIdentify } from "@/components/analytics/PostHogIdentify";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { createInsforgeServer } from "@/lib/insforge-server";

export default async function DashboardPage() {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  if (!user) {
    redirect("/login?next=%2Fdashboard");
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 md:px-8">
      <PostHogIdentify
        userId={user.id}
        email={user.email}
        captureDashboardView
      />
      <section className="mx-auto max-w-[1440px] rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm font-medium text-accent">Signed in</p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">
          Welcome to your dashboard
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          Your JobPilot workspace is ready. Dashboard features arrive in Phase
          5.
        </p>
        <LogoutButton />
      </section>
    </main>
  );
}
