import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/find-jobs", label: "Find Jobs" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="h-20 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label="JobPilot home">
          <Image
            src="/logo.png"
            alt="JobPilot"
            width={164}
            height={56}
            className="h-auto w-[132px] md:w-[148px]"
            preload
          />
        </Link>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium leading-6 text-text-slate transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/login"
          className="rounded-md bg-text-slate px-4 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-overlay md:px-6 md:text-base"
        >
          Start for free
        </Link>
      </div>
    </header>
  );
}
