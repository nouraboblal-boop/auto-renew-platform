import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { EstimatorBooking } from "@/components/EstimatorBooking";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
export default function HomePage() {
  return <><a href="#content" className="skip-link">تجاوز القائمة إلى المحتوى</a><SiteHeader /><main id="content"><HeroSection /><div aria-hidden="true" className="border-y border-white/10 bg-[#121418]"><div className="container-ar flex flex-wrap items-center justify-around gap-x-5 gap-y-3 py-5 font-display text-[9px] tracking-[.27em] text-zinc-500" dir="ltr"><span>PRECISION</span><span className="text-rose-500">◆</span><span>PROTECTION</span><span className="text-rose-500">◆</span><span>PERFORMANCE</span><span className="text-rose-500">◆</span><span>PROGRAMMING</span></div></div><ServicesSection /><AboutSection /><EstimatorBooking /><ContactSection /></main><SiteFooter /></>;
}
