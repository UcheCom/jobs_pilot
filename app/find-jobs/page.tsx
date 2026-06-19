import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProtectedRouteShell } from "@/components/auth/ProtectedRouteShell";
import { createInsforgeServer } from "@/lib/insforge-server";

export const metadata: Metadata = {
  title: "Find Jobs | JobPilot",
  description: "Find roles matched to your JobPilot profile.",
};

export default async function FindJobsPage() {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  if (!user) {
    redirect("/login?next=%2Ffind-jobs");
  }

  return (
    <ProtectedRouteShell
      eyebrow="Job search access verified"
      title="Find jobs"
      description="Your authenticated job-search route is ready. The complete search experience arrives in Phase 3."
    />
  );
}
