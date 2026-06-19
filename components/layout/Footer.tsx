import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 border-x border-border px-8 py-14 md:flex-row md:px-12 md:py-20">
        <Link href="/" aria-label="JobPilot home">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={164}
            height={56}
            className="h-auto w-[144px]"
          />
        </Link>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          aria-label="Footer navigation"
        >
          <Link
            href="/dashboard"
            className="text-sm font-medium text-text-slate transition-colors hover:text-accent md:text-base"
          >
            Dashboard
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-text-slate transition-colors hover:text-accent md:text-base"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-text-slate transition-colors hover:text-accent md:text-base"
          >
            Terms &amp; Condition
          </Link>
        </nav>
      </div>
    </footer>
  );
}
