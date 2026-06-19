import {
  type CookieOptions,
  type CookieStore,
  updateSession,
} from "@insforge/sdk/ssr";
import { NextRequest, NextResponse } from "next/server";

import {
  getSafeProtectedRedirectPath,
  isProtectedPath,
} from "@/lib/auth-redirect";

function copyCookies(source: NextResponse, target: NextResponse): NextResponse {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });

  return target;
}

function createRequestCookieStore(request: NextRequest): CookieStore {
  return {
    get(name: string) {
      return request.cookies.get(name);
    },
    set(
      nameOrCookie: string | ({ name: string; value: string } & CookieOptions),
      value?: string,
    ) {
      if (typeof nameOrCookie === "string") {
        request.cookies.set(nameOrCookie, value ?? "");
        return;
      }

      request.cookies.set({
        name: nameOrCookie.name,
        value: nameOrCookie.value,
      });
    },
    delete(nameOrCookie: string | ({ name: string } & CookieOptions)) {
      request.cookies.delete(
        typeof nameOrCookie === "string" ? nameOrCookie : nameOrCookie.name,
      );
    },
  };
}

function createResponseCookieStore(response: NextResponse): CookieStore {
  return {
    get(name: string) {
      return response.cookies.get(name);
    },
    set(
      nameOrCookie: string | ({ name: string; value: string } & CookieOptions),
      value?: string,
      options?: CookieOptions,
    ) {
      if (typeof nameOrCookie === "string") {
        response.cookies.set(nameOrCookie, value ?? "", options);
        return;
      }

      response.cookies.set(nameOrCookie);
    },
    delete(nameOrCookie: string | ({ name: string } & CookieOptions)) {
      response.cookies.delete(
        typeof nameOrCookie === "string" ? nameOrCookie : nameOrCookie.name,
      );
    },
  };
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = isProtectedPath(pathname);

  const response = NextResponse.next({ request });
  const { accessToken, error } = await updateSession({
    requestCookies: createRequestCookieStore(request),
    responseCookies: createResponseCookieStore(response),
  });

  if (error) {
    console.error("[proxy/auth]", error);
  }

  if (accessToken && pathname === "/") {
    return copyCookies(
      response,
      NextResponse.redirect(new URL("/dashboard", request.url)),
    );
  }

  if (accessToken && pathname === "/login") {
    const redirectPath = getSafeProtectedRedirectPath(
      request.nextUrl.searchParams.get("next"),
    );
    return copyCookies(
      response,
      NextResponse.redirect(new URL(redirectPath, request.url)),
    );
  }

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
    return copyCookies(response, NextResponse.redirect(loginUrl));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/callback",
    "/dashboard/:path*",
    "/profile/:path*",
    "/find-jobs/:path*",
  ],
};
