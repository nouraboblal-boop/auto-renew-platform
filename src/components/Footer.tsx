import { AtSign, Clock3, MapPin, MessageCircle } from "lucide-react";

function whatsAppHref() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const number = raw.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(number)) return "#estimate";
  return `https://wa.me/${number}`;
}

export function Footer() {
  const location = process.env.NEXT_PUBLIC_CENTER_LOCATION_LABEL || "دمشق، سوريا";
  const mapUrl = process.env.NEXT_PUBLIC_CENTER_MAP_URL || "";
  const hours = process.env.NEXT_PUBLIC_WORKING_HOURS || "ساعات العمل: يرجى التأكيد عبر واتساب";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/auto.renew.sy/";
  const whatsapp = whatsAppHref();
  const whatsappExternal = whatsapp.startsWith("https://");

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-white/[.07] bg-[#07090c]">
      <div className="absolute -bottom-40 right-[20%] size-96 rounded-full bg-cyan-500/[.035] blur-[120px]" aria-hidden="true" />
      <div className="container-ar relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3" dir="ltr">
              <span className="grid h-11 w-14 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/[.05] font-display text-sm font-black text-white">AR</span>
              <div><strong className="font-display text-sm tracking-[.18em] text-white">AUTO RENEW</strong><p className="mt-1 text-[8px] tracking-[.23em] text-zinc-600">EV • CARE • SYSTEMS</p></div>
              <span className="size-1.5 rounded-full bg-[#ef3340]" />
            </div>
            <p className="mt-6 max-w-md text-sm leading-8 text-zinc-500">تشخيص وبرمجة السيارات الحديثة، تخصيص أنظمة BYD وDiLink، وحماية وعناية متقدمة ضمن تجربة مبنية على الوضوح والدقة.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={whatsapp} target={whatsappExternal ? "_blank" : undefined} rel={whatsappExternal ? "noreferrer" : undefined} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[.045] px-4 py-2.5 text-[11px] font-bold text-cyan-100 hover:border-cyan-300/35"><MessageCircle className="size-4" /> WhatsApp</a>
              <a href={instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.025] px-4 py-2.5 text-[11px] font-bold text-zinc-300 hover:border-white/20 hover:text-white"><AtSign className="size-4" /> Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">المركز</h3>
            <div className="mt-5 space-y-4 text-[12px] leading-7 text-zinc-500">
              <div className="flex items-start gap-3"><MapPin className="mt-1 size-4 shrink-0 text-cyan-300" /><div><span>{location}</span>{mapUrl ? <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-1 block text-cyan-200 hover:text-cyan-100">فتح الموقع على الخريطة</a> : <span className="mt-1 block text-zinc-700">يُضاف رابط الموقع الدقيق عند اعتماده.</span>}</div></div>
              <div className="flex items-start gap-3"><Clock3 className="mt-1 size-4 shrink-0 text-cyan-300" /><span>{hours}</span></div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">روابط سريعة</h3>
            <nav className="mt-5 flex flex-col gap-3 text-[12px] text-zinc-500" aria-label="روابط الفوتر">
              <a href="#services" className="hover:text-cyan-200">الخدمات</a>
              <a href="#ev-features" className="hover:text-cyan-200">تقنيات EV</a>
              <a href="#estimate" className="hover:text-cyan-200">حاسبة السعر</a>
              <a href="#top" className="hover:text-cyan-200">العودة للأعلى</a>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[.07] pt-6 text-[9px] text-zinc-700 sm:flex-row sm:items-center sm:justify-between" dir="ltr">
          <span>© {new Date().getFullYear()} AUTO RENEW. ALL RIGHTS RESERVED.</span>
          <span>PRECISION • ELECTRIC • CARE</span>
        </div>
      </div>
    </footer>
  );
}
