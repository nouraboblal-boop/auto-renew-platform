import { EVFeatures } from "@/components/EVFeatures";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InteractiveEstimator } from "@/components/InteractiveEstimator";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <>
      <a href="#content" className="skip-link">تجاوز التنقل إلى المحتوى</a>
      <Navbar />
      <main id="content">
        <Hero />
        <div className="border-y border-white/[.06] bg-[#090b0f]" aria-hidden="true">
          <div className="container-ar flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-4 font-display text-[8px] font-bold tracking-[.2em] text-zinc-700 sm:justify-between" dir="ltr">
            <span>EV DIAGNOSTICS</span><span className="text-cyan-400/50">◆</span><span>BYD / DILINK</span><span className="text-cyan-400/50">◆</span><span>PPF / WRAP / CERAMIC</span><span className="text-cyan-400/50">◆</span><span>PRECISION WORKFLOW</span>
          </div>
        </div>
        <Services />
        <EVFeatures />
        <InteractiveEstimator />
      </main>
      <Footer />
    </>
  );
}
