import { ArrowIcon } from "./ArrowIcon";
export function HeroSection() {
  return <section id="top" aria-labelledby="hero-heading" className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-[#0a0c0f] pt-32 pb-14 md:min-h-[790px]">
    <div className="hero-media absolute inset-0 -z-30" role="img" aria-label="سيارة فاخرة ضمن إضاءة استوديو داكنة" />
    <div className="absolute inset-0 -z-20 bg-[linear-gradient(270deg,rgba(8,10,13,.95)_0%,rgba(8,10,13,.78)_39%,rgba(8,10,13,.22)_100%),linear-gradient(0deg,rgba(8,10,13,.95),transparent_45%)]" />
    <div className="absolute inset-0 -z-10 opacity-15 hero-gridlines" />
    <div className="absolute right-[5%] top-[18%] -z-10 size-[320px] rounded-full bg-rose-700/20 blur-[110px]" />
    <div className="container-ar relative w-full">
      <div className="max-w-[780px]">
        <div className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-3.5 py-2.5 text-[9px] font-display font-bold tracking-[0.2em] text-zinc-300 backdrop-blur-xl" dir="ltr"><span className="size-1.5 rounded-full bg-rose-500" />AUTO RENEW <span className="h-3 w-px bg-white/20" /> THE ART OF AUTOMOTIVE CARE</div>
        <h1 id="hero-heading" className="mt-8 text-[clamp(3.7rem,8.5vw,8rem)] leading-[1.1] tracking-[-.055em] font-black text-white">سيارتك،<br /><span className="text-rose-500">بمستوى آخر.</span></h1>
        <p className="mt-7 max-w-md text-sm leading-[2.2] text-zinc-300 sm:text-base">حماية دقيقة. برمجة ذكية. تفاصيل استثنائية.<br />تجربة متكاملة للعناية وتطوير السيارات الحديثة.</p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href="#services" className="inline-flex min-h-13 items-center gap-6 bg-rose-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-rose-500">اكتشف خدماتنا <ArrowIcon /></a>
          <a href="#estimate" className="inline-flex items-center gap-3 text-sm font-bold text-white underline-offset-8 hover:underline">احسب تكلفة خدمتك <ArrowIcon className="size-4 text-rose-400" /></a>
        </div>
        <div className="mt-14 flex w-fit items-center gap-5 border-t border-white/15 pt-7 sm:gap-10">
          {[{ value: "04", label: "مجالات تخصصية" }, { value: "01", label: "وجهة لسيارتك" }, { value: "360°", label: "عناية متكاملة" }].map((metric, i) => <div key={i} className="flex flex-col gap-2"><strong className="font-display text-2xl font-extrabold tracking-tight text-white" dir="ltr">{metric.value}</strong><span className="text-[10px] text-zinc-400">{metric.label}</span></div>)}
        </div>
      </div>
      <div className="mt-14 flex max-w-[390px] items-center gap-4 border border-white/15 bg-white/[.07] p-4 backdrop-blur-xl md:absolute md:bottom-0 md:left-0 md:mt-0">
        <span className="grid size-12 shrink-0 place-items-center border border-rose-500/60 bg-rose-500/10 text-xl text-rose-400" aria-hidden="true">ϟ</span>
        <div className="flex flex-col gap-1"><b className="font-display text-[11px] tracking-[.1em] text-white" dir="ltr">TECH MEETS DETAIL</b><span className="font-display text-[10px] text-zinc-400" dir="ltr">Where precision makes the difference.</span></div>
      </div>
    </div>
  </section>;
}
