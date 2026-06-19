const DEFAULT_AUTH_REDIRECT = "/dashboard";
const REDIRECT_VALIDATION_ORIGIN = "https://jobpilot.invalid";
const PROTECTED_ROUTE_PREFIXES = ["/dashboard", "/profile", "/find-jobs"];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function getSafeProtectedRedirectPath(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return DEFAULT_AUTH_REDIRECT;
  }

  try {
    const target = new URL(value, REDIRECT_VALIDATION_ORIGIN);

    if (
      target.origin !== REDIRECT_VALIDATION_ORIGIN ||
      !isProtectedPath(target.pathname)
    ) {
      return DEFAULT_AUTH_REDIRECT;
    }

    return `${target.pathname}${target.search}`;
  } catch {
    return DEFAULT_AUTH_REDIRECT;
  }
}
