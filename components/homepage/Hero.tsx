import { CtaLink } from "@/components/homepage/CtaLink";

export function Hero() {
  return (
    <section className="landing-hero-texture flex min-h-[520px] flex-col items-center justify-center border-b border-border px-5 py-20 text-center md:min-h-[540px] md:px-8">
      <h1 className="max-w-5xl text-[42px] font-bold leading-[1.08] text-text-slate md:text-[64px]">
        Job hunting is hard.
        <br />
        Your tools shouldn&apos;t be.
      </h1>

      <p className="mt-7 max-w-3xl text-lg font-normal leading-8 text-text-slate-medium md:text-xl">
        Stop applying blind. JobPilot finds the jobs, researches the companies,
        and gives you everything you need to stand out.
      </p>

      <div className="mt-9 flex w-full max-w-xl flex-col items-stretch justify-center gap-4 sm:flex-row">
        <CtaLink
          href="/login"
          placement="hero"
          label="get_started"
          className="inline-flex min-h-14 items-center justify-center rounded-md bg-text-slate px-7 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-overlay"
        >
          Get Started
          <span
            aria-hidden="true"
            className="ml-3 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-text-muted"
          />
        </CtaLink>
        <CtaLink
          href="/login"
          placement="hero"
          label="find_first_match"
          className="inline-flex min-h-14 items-center justify-center rounded-md border border-border-muted bg-surface/70 px-7 py-3 text-base font-medium text-text-slate transition-colors hover:bg-surface"
        >
          Find Your First Match
        </CtaLink>
      </div>
    </section>
  );
}
