import Image from "next/image";

const features = [
  {
    title: "Find jobs that actually fit",
    description:
      "Search by title and location or paste a job link. Get matched roles you can quickly scan.",
  },
  {
    title: "Know the Company Before You Apply",
    description:
      "Stop guessing what a company is about. JobPilot browses their site and gives you everything you need to apply with confidence.",
  },
  {
    title: "Keep track of every application",
    description:
      "Keep a clear view of every job you've found and your activity and progress, all in one simple place.",
  },
];

export function JobSearchShowcase() {
  return (
    <section className="grid border-b border-border lg:grid-cols-2">
      <div className="bg-surface">
        <div className="flex min-h-60 items-center border-b border-border px-8 py-14 md:px-16">
          <h2 className="max-w-xl text-[40px] font-semibold leading-[1.08] text-text-slate md:text-[52px]">
            Manage Your Job
            <br />
            Search With Ease
          </h2>
        </div>

        <div>
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`border-b border-border px-8 py-9 md:px-16 ${
                index === 0 ? "border-l-2 border-l-accent" : ""
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

      <div className="flex items-center border-t border-border bg-surface-muted px-5 py-12 lg:border-l lg:border-t-0 lg:px-8">
        <Image
          src="/images/jobs-lists.png"
          alt="JobPilot job list with company names, match scores, estimated salaries, and sources"
          width={2364}
          height={1778}
          className="h-auto w-full"
          sizes="(max-width: 1023px) 100vw, 720px"
        />
      </div>
    </section>
  );
}
