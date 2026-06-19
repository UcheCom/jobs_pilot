import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProtectedRouteShell } from "@/components/auth/ProtectedRouteShell";
import { createInsforgeServer } from "@/lib/insforge-server";

export const metadata: Metadata = {
  title: "Profile | JobPilot",
  description: "Manage your JobPilot profile and resume.",
};

export default async function ProfilePage() {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  if (!user) {
    redirect("/login?next=%2Fprofile");
  }

  return (
    <ProtectedRouteShell
      eyebrow="Profile access verified"
      title="Your profile"
      description="Your authenticated profile route is ready. The complete profile experience arrives in Phase 2."
    />
  );
}
