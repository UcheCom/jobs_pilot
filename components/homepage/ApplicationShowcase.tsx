import Image from "next/image";

const features = [
  {
    title: "Understand your match score",
    description:
      "See how your profile lines up with each role before you apply. Get a clear breakdown of what fits and what's missing.",
  },
  {
    title: "AI-Powered Job Matching",
    description:
      "Stop guessing which jobs are worth applying to. JobPilot scores every role against your actual skills so you focus on the ones that matter.",
  },
  {
    title: "Focus on the right roles",
    description:
      "Filter out low-fit jobs and stay on the ones that actually matter. Spend less time sorting and more time applying.",
  },
];

export function ApplicationShowcase() {
  return (
    <section className="grid border-b border-border lg:grid-cols-2">
      <div className="order-2 flex items-center justify-center bg-surface-muted px-8 py-14 lg:order-1 lg:border-r lg:border-border lg:px-12">
        <Image
          src="/images/agnet-log.png"
          alt="JobPilot agent log showing job discovery and application preparation steps"
          width={2144}
          height={1656}
          className="h-auto w-full max-w-[600px]"
          sizes="(max-width: 1023px) 100vw, 600px"
        />
      </div>

      <div className="order-1 bg-surface lg:order-2">
        <div className="flex min-h-60 items-center border-b border-border px-8 py-14 md:px-16">
          <h2 className="max-w-xl text-[40px] font-semibold leading-[1.08] text-text-slate md:text-[52px]">
            Apply With More
            <br />
            Confidence, Every Time
          </h2>
        </div>

        <div>
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`border-b border-border px-8 py-9 md:px-16 ${
                index === 1 ? "border-l-2 border-l-success" : ""
              }`}
            >
              <h3 className="text-xl font-semibold leading-7 text-text-slate">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base font-normal leading-8 text-text-slate-medium md:text-lg">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
