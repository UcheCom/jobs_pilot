import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { getSafeProtectedRedirectPath } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  title: "Sign in | JobPilot",
  description: "Sign in to find and research better-fit jobs with JobPilot.",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = getSafeProtectedRedirectPath(
    Array.isArray(next) ? next[0] : next,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <section className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <Link
          href="/"
          aria-label="JobPilot home"
          className="mx-auto block w-fit"
        >
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={164}
            height={56}
            className="h-auto w-[148px]"
            priority
          />
        </Link>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-semibold leading-8 text-text-primary">
            Welcome to JobPilot
          </h1>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Sign in to discover roles that fit your experience and walk into
            every application prepared.
          </p>
        </div>

        <div className="mt-8">
          <OAuthButtons nextPath={nextPath} />
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-text-muted">
          By continuing, you agree to use JobPilot responsibly.
        </p>
      </section>
    </main>
  );
}
