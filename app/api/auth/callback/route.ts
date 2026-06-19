import { createServerClient, setAuthCookies } from "@insforge/sdk/ssr";
import { NextRequest, NextResponse } from "next/server";

import { getSafeProtectedRedirectPath } from "@/lib/auth-redirect";
import { capturePostHogServerEvent } from "@/lib/posthog-server";

type OAuthCallbackBody = {
  code?: unknown;
  codeVerifier?: unknown;
  nextPath?: unknown;
};

export async function POST(request: NextRequest) {
  const distinctId =
    request.headers.get("X-POSTHOG-DISTINCT-ID") ?? "anonymous";
  const sessionId = request.headers.get("X-POSTHOG-SESSION-ID") ?? undefined;

  try {
    const body: OAuthCallbackBody = await request.json();

    if (
      typeof body.code !== "string" ||
      typeof body.codeVerifier !== "string" ||
      !body.code ||
      !body.codeVerifier
    ) {
      await capturePostHogServerEvent(
        distinctId,
        "server_oauth_exchange_failed",
        {
          reason: "invalid_callback_body",
          $session_id: sessionId,
        },
      );
      return NextResponse.json(
        { success: false, error: "Invalid OAuth callback" },
        { status: 400 },
      );
    }

    const insforge = createServerClient();
    const { data, error } = await insforge.auth.exchangeOAuthCode(
      body.code,
      body.codeVerifier,
    );

    if (error || !data?.accessToken) {
      console.error("[api/auth/callback]", error);
      await capturePostHogServerEvent(
        distinctId,
        "server_oauth_exchange_failed",
        {
          reason: "oauth_exchange_failed",
          $session_id: sessionId,
        },
      );
      return NextResponse.json(
        { success: false, error: "Unable to complete sign in" },
        { status: error?.statusCode ?? 400 },
      );
    }

    await capturePostHogServerEvent(
      distinctId,
      "server_oauth_exchange_succeeded",
      { $session_id: sessionId },
    );

    const response = NextResponse.json({
      success: true,
      data: { redirectTo: getSafeProtectedRedirectPath(body.nextPath) },
    });
    setAuthCookies(response.cookies, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return response;
  } catch (error) {
    console.error("[api/auth/callback]", error);
    await capturePostHogServerEvent(
      distinctId,
      "server_oauth_exchange_failed",
      {
        reason: "unexpected_exception",
        $session_id: sessionId,
      },
    );
    return NextResponse.json(
      { success: false, error: "Unable to complete sign in" },
      { status: 500 },
    );
  }
}
