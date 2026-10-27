"use client";

import { useState } from "react";
import { Brand } from "./Brand";
import { ArrowIcon } from "./ArrowIcon";

const links = [{ href: "#services", label: "الخدمات" }, { href: "#about", label: "لماذا نحن" }, { href: "#estimate", label: "تقدير التكلفة" }, { href: "#contact", label: "تواصل معنا" }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="absolute z-40 top-0 left-0 right-0 border-b border-white/10 bg-[#090b0d]/60 backdrop-blur-2xl">
    <div className="container-ar flex h-[82px] items-center justify-between gap-4">
      <Brand />
      <nav id="site-navigation" aria-label="التنقل الرئيسي" className={`${open ? "flex" : "hidden"} absolute top-[82px] left-0 right-0 flex-col gap-1 border-b border-white/10 bg-[#111318] px-5 pb-5 pt-3 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        {links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded px-3 py-3 text-sm font-bold text-zinc-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 md:p-0 md:text-[12px] md:font-semibold">{link.label}</a>)}
        <a href="#estimate" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 bg-rose-600 px-5 py-3 text-[12px] font-bold text-white hover:bg-rose-500 md:hidden">احجز استشارتك <ArrowIcon /></a>
      </nav>
      <a href="#estimate" className="hidden items-center gap-3 bg-rose-600 px-5 py-3 text-[12px] font-bold text-white transition-colors hover:bg-rose-500 lg:inline-flex">احجز استشارتك <ArrowIcon /></a>
      <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} className="grid size-10 place-items-center border border-white/15 text-white md:hidden"><span aria-hidden="true" className="text-2xl leading-none">{open ? "×" : "☰"}</span></button>
    </div>
  </header>;
}
