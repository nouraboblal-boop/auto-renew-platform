import { SERVICES } from "@/lib/catalog.mjs";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./ArrowIcon";

function IconForService({ kind }: { kind: string }) {
  const common = { width: 27, height: 27, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  if (kind === "shield") return <svg {...common}><path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (kind === "layers") return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>;
  if (kind === "bolt") return <svg {...common}><path d="m13 2-9 12h7l-1 8 10-13h-7z" /></svg>;
  return <svg {...common}><rect x="3" y="4" width="18" height="14" rx="1" /><path d="M8 22h8M12 18v4M8 9h8m-8 4h5" /></svg>;
}
export function ServicesSection() {
  return <section id="services" className="section-pad bg-[#0a0b0e]" aria-labelledby="services-title">
    <div className="container-ar">
      <div id="services-title"><SectionHeading eyebrow="OUR EXPERTISE / 01" first="خدمات متخصصة." accent="نتائج تُلاحظ." description="حلول متقدمة للحماية والبرمجة وتطوير المظهر، مدروسة لتلائم تفاصيل سيارتك." /></div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {SERVICES.map((service) => <article key={service.id} className="service-tile group flex min-h-[338px] flex-col border border-white/10 bg-[#13151a] p-6 transition duration-300 hover:-translate-y-1 hover:border-rose-500/35 hover:bg-[#191a20]">
          <div className="flex items-start justify-between" dir="ltr"><span className="font-display text-[11px] tracking-wider text-zinc-500">/{service.no}</span><span className="grid size-12 place-items-center border border-white/10 bg-white/5 text-rose-400 transition group-hover:border-rose-500/40"><IconForService kind={service.icon} /></span></div>
          <div className="mt-10"><span className="font-display text-[9px] font-bold tracking-[.2em] text-rose-400" dir="ltr">{service.eyebrow}</span><h3 className="mt-3 text-[19px] font-extrabold text-white">{service.name}</h3><p className="mt-3 text-[12px] leading-7 text-zinc-400">{service.description}</p></div>
          <a href={`#estimate`} className="mt-auto flex items-center justify-between border-t border-white/15 pt-5 text-[12px] font-bold text-zinc-200 transition hover:text-rose-300"><span>اطلب تقديراً</span><ArrowIcon className="size-4 text-rose-400" /></a>
        </article>)}
      </div>
    </div>
  </section>;
}
