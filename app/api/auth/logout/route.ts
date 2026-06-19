import { clearAuthCookies } from "@insforge/sdk/ssr";
import { NextResponse } from "next/server";

import { createInsforgeServer } from "@/lib/insforge-server";
import { capturePostHogServerEvent } from "@/lib/posthog-server";

export async function POST() {
  try {
    const insforge = await createInsforgeServer();
    const {
      data: { user },
    } = await insforge.auth.getCurrentUser();
    const { error } = await insforge.auth.signOut();

    if (error) {
      console.error("[api/auth/logout]", error);
    }

    if (user?.id) {
      await capturePostHogServerEvent(user.id, "server_user_signed_out", {
        userId: user.id,
      });
    }

    const response = NextResponse.json({ success: true });
    clearAuthCookies(response.cookies);
    return response;
  } catch (error) {
    console.error("[api/auth/logout]", error);
    const response = NextResponse.json({ success: true });
    clearAuthCookies(response.cookies);
    return response;
  }
}
