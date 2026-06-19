import Link from "next/link";

type ProtectedRouteShellProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ProtectedRouteShell({
  eyebrow,
  title,
  description,
}: ProtectedRouteShellProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-12 md:px-8">
      <section className="mx-auto max-w-[1440px] rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm font-medium text-accent">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {description}
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
