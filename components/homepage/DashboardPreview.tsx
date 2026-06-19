import Image from "next/image";

export function DashboardPreview() {
  return (
    <section
      className="overflow-hidden border-b border-border bg-surface-tertiary px-5 pb-0 pt-14 md:px-16 md:pt-16"
      aria-label="JobPilot dashboard preview"
    >
      <div className="mx-auto max-w-[1240px] translate-y-1 overflow-hidden rounded-xl">
        <Image
          src="/images/dashboard-demo.png"
          alt="JobPilot dashboard showing job search statistics and company research activity"
          width={4788}
          height={2416}
          className="h-auto w-full"
          sizes="(max-width: 767px) 100vw, 1240px"
        />
      </div>
    </section>
  );
}
