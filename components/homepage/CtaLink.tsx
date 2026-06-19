"use client";

import Link from "next/link";

import { capturePostHogEvent } from "@/lib/posthog-client";

type CtaLinkProps = {
  href: string;
  placement: "hero" | "final";
  label: "get_started" | "find_first_match";
  className?: string;
  children: React.ReactNode;
};

export function CtaLink({
  href,
  placement,
  label,
  className,
  children,
}: CtaLinkProps) {
  function handleClick(): void {
    const event =
      placement === "hero" ? "hero_cta_clicked" : "final_cta_clicked";
    capturePostHogEvent(event, { label });
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
