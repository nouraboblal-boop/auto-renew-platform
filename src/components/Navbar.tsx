"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#services", label: "الخدمات" },
  { href: "#ev-features", label: "تقنيات EV" },
  { href: "#estimate", label: "حاسبة السعر" },
  { href: "#contact", label: "التواصل" }
];

function quickWhatsAppHref() {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const number = raw.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(number)) return "#estimate";
  const message = "مرحباً Auto Renew، أريد حجز فحص سريع لسيارتي.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function Logo() {
  return (
    <a href="#top" aria-label="Auto Renew — الرئيسية" className="group flex items-center gap-3" dir="ltr">
      <span className="relative grid h-10 w-12 place-items-center overflow-hidden rounded-xl border border-cyan-300/35 bg-cyan-300/[0.055] font-display text-sm font-black tracking-[-.08em] text-white shadow-[inset_0_0_22px_rgba(0,240,255,.08)]">
        AR
        <span className="absolute inset-x-2 bottom-1 h-px bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent" />
      </span>
      <span className="flex flex-col leading-none">
        <strong className="font-display text-[13px] tracking-[.18em] text-white">AUTO RENEW</strong>
        <small className="mt-1.5 text-[8px] tracking-[.24em] text-zinc-500">EV • CARE • SYSTEMS</small>
      </span>
      <span className="ml-0.5 size-1.5 rounded-full bg-[#FF0055] shadow-[0_0_14px_rgba(255,0,85,.9)]" aria-hidden="true" />
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const whatsappHref = quickWhatsAppHref();
  const external = whatsappHref.startsWith("https://");

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div className="mx-auto flex h-[68px] max-w-[1420px] items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/70 px-4 shadow-[0_18px_70px_rgba(0,0,0,.42)] backdrop-blur-xl sm:px-5">
        <Logo />

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-lg px-4 py-2 text-[12px] font-bold text-zinc-400 transition hover:bg-white/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm" variant="danger">
            <a href={whatsappHref} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              <MessageCircle className="size-4" /> حجز سريع <ArrowUpLeft className="size-3.5" />
            </a>
          </Button>
        </div>

        <button type="button" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 lg:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="التنقل على الهاتف"
            initial={reduce ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-[1420px] flex-col gap-1 rounded-2xl border border-zinc-800/80 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-bold text-zinc-300 hover:bg-white/[0.05] hover:text-white">{link.label}</a>)}
            <Button asChild className="mt-2 w-full" variant="danger">
              <a href={whatsappHref} onClick={() => setOpen(false)} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                <MessageCircle className="size-4" /> حجز سريع
              </a>
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
