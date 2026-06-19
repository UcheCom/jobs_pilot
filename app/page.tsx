import { ApplicationShowcase } from "@/components/homepage/ApplicationShowcase";
import { DashboardPreview } from "@/components/homepage/DashboardPreview";
import { FinalCta } from "@/components/homepage/FinalCta";
import { Hero } from "@/components/homepage/Hero";
import { JobSearchShowcase } from "@/components/homepage/JobSearchShowcase";
import { Testimonial } from "@/components/homepage/Testimonial";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="mx-auto max-w-[1440px] border-x border-border bg-surface">
        <Hero />
        <DashboardPreview />
        <div className="landing-divider" aria-hidden="true" />
        <JobSearchShowcase />
        <div className="landing-divider" aria-hidden="true" />
        <ApplicationShowcase />
        <div className="landing-divider" aria-hidden="true" />
        <Testimonial />
        <div className="landing-divider" aria-hidden="true" />
        <FinalCta />
        <div className="landing-divider" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
