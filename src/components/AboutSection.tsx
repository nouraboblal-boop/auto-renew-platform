export function AboutSection() {
  const values = [{ no: "01", name: "عناية بالتفاصيل", detail: "كل خطوة محسوبة من البداية." }, { no: "02", name: "تقنيات حديثة", detail: "حلول مناسبة للأنظمة المعاصرة." }, { no: "03", name: "تجربة واضحة", detail: "نراجع طلبك قبل أي تنفيذ." }];
  return <section id="about" className="relative overflow-hidden bg-[linear-gradient(120deg,#1a1b21,#111318_56%,#101115)] py-24 md:py-32">
    <div className="container-ar relative grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
      <div className="relative"><p className="eyebrow"><span className="h-px w-7 bg-rose-500" />THE AUTO RENEW STANDARD</p><div aria-hidden="true" className="mt-12 select-none font-display text-[clamp(8rem,17vw,16rem)] font-black leading-none tracking-[-.11em] text-white/[.055]" dir="ltr">AR<span className="text-rose-500/75">.</span></div></div>
      <div><h2 className="text-[clamp(2rem,4.7vw,4.3rem)] leading-[1.38] font-black text-white">ليست مجرد صيانة.<br /><span className="text-rose-500">إنها فلسفة اهتمام.</span></h2><p className="mt-7 max-w-xl text-[13px] leading-9 text-zinc-400">من حماية هيكل السيارة إلى أدق تفاصيل الأنظمة الرقمية، نضع الجودة والوضوح والدقة في قلب كل خدمة نقدمها.</p><div className="mt-12 grid gap-7 border-t border-white/10 pt-9 sm:grid-cols-3">{values.map(value => <div key={value.no} className="flex flex-col gap-2"><span className="font-display text-sm font-bold text-rose-400">{value.no}</span><strong className="text-sm font-extrabold text-white">{value.name}</strong><small className="text-[11px] leading-6 text-zinc-500">{value.detail}</small></div>)}</div></div>
    </div>
  </section>;
}
