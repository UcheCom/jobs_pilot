import Image from "next/image";

export function Testimonial() {
  return (
    <section className="flex min-h-[480px] flex-col items-center justify-center px-6 py-20 text-center md:px-14">
      <p className="text-sm font-medium uppercase text-accent">
        Success Stories
      </p>
      <blockquote className="mt-8 max-w-5xl text-[28px] font-normal leading-[1.45] text-text-slate md:text-[38px]">
        &ldquo;I used to spend my evenings copy-pasting resumes. Now I open my
        dashboard to see interviews waiting. It feels like cheating. Had 3
        offers on the table simultaneously.&rdquo;
      </blockquote>

      <div className="mt-8 flex items-center gap-3 text-left">
        <Image
          src="/images/user-icon.png"
          alt=""
          width={192}
          height={192}
          className="h-12 w-12 rounded-md"
        />
        <div>
          <p className="text-base font-semibold text-text-darkest">Tom Wilson</p>
          <p className="mt-1 text-sm font-normal text-text-secondary">
            Junior Developer
          </p>
        </div>
      </div>
    </section>
  );
}
