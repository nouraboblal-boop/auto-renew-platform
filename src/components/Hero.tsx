"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownLeft, BatteryCharging, Cpu, ScanLine, ShieldCheck } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

function VehicleWireframe() {
  return (
    <svg viewBox="0 0 760 280" className="h-auto w-full" role="img" aria-label="رسم تقني تجريدي لسيارة حديثة">
      <defs>
        <linearGradient id="carLine" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="0.25" stopColor="#22d3ee" stopOpacity="0.78" />
          <stop offset="0.75" stopColor="#60a5fa" stopOpacity="0.86" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M65 194C113 160 151 146 214 140L290 73C310 55 332 46 367 46H477C510 46 535 58 557 83L609 140C650 145 679 157 703 181L724 207H69Z" fill="none" stroke="url(#carLine)" strokeWidth="2.2" filter="url(#glow)" />
      <path d="M233 139L310 72H477C500 72 516 82 532 100L564 139M361 72L333 139M482 72L510 139" fill="none" stroke="#9ae6f2" strokeOpacity="0.34" strokeWidth="1.2" />
      <path d="M111 197H185M598 197H681" stroke="#22d3ee" strokeOpacity="0.58" strokeWidth="2" />
      <circle cx="236" cy="204" r="49" fill="#0b0c10" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="236" cy="204" r="29" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
      <circle cx="584" cy="204" r="49" fill="#0b0c10" stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="584" cy="204" r="29" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
      <path d="M335 166H474" stroke="#ffffff" strokeOpacity="0.13" strokeDasharray="7 8" />
      <circle cx="416" cy="166" r="4" fill="#22d3ee" />
    </svg>
  );
}

const indicators = [
  { value: 3, suffix: "", label: "مسارات تخصصية" },
  { value: 5, suffix: "+", label: "نقاط فحص رقمية" },
  { value: 360, suffix: "°", label: "منظور عناية متكامل" }
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.7 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.7 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.18]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[780px] overflow-hidden bg-[#0B0C10] pt-36 sm:pt-40 lg:min-h-[880px]"
    >
      <div className="cyber-grid absolute inset-0 -z-30 opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_28%,rgba(34,211,238,.12),transparent_26%),radial-gradient(circle_at_20%_10%,rgba(59,130,246,.10),transparent_30%),linear-gradient(180deg,transparent_0%,#0B0C10_88%)]" />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: glowX, y: glowY }}
        className="absolute left-1/2 top-[42%] -z-10 size-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/[0.075] blur-[110px]"
      />

      <div className="container-ar grid items-center gap-10 pb-20 lg:grid-cols-[1.04fr_.96fr] lg:gap-5 lg:pb-24">
        <div className="relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.055] px-3.5 py-2 text-[10px] font-extrabold tracking-[.12em] text-cyan-100 backdrop-blur-xl" dir="ltr">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-50"/><span className="relative inline-flex size-2 rounded-full bg-cyan-300"/></span>
              EV DIAGNOSTICS • SMART SYSTEMS • PREMIUM CARE
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="mt-7 max-w-[790px] text-[clamp(3.3rem,7.6vw,7.1rem)] font-black leading-[1.06] tracking-[-.055em] text-white">
              التقنية تلتقي
              <span className="block bg-gradient-to-l from-cyan-200 via-cyan-300 to-blue-500 bg-clip-text text-transparent">بأدق التفاصيل.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl text-sm leading-8 text-zinc-400 sm:text-[15px] sm:leading-9">
              مركز Auto Renew لتشخيص وبرمجة السيارات الحديثة، أنظمة BYD وDiLink، وحلول الحماية والعناية المتقدمة — ضمن تجربة رقمية واضحة من أول فحص حتى تسليم السيارة.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#services">استكشف الخدمات <ArrowDownLeft className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#estimate"><ScanLine className="size-4 text-cyan-300" /> احجز فحصاً فورياً</a>
            </Button>
          </Reveal>

          <Reveal delay={0.28} className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {indicators.map((item) => (
              <div key={item.label} className="bg-[#0d1015]/95 px-4 py-5 sm:px-5">
                <strong className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl" dir="ltr">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </strong>
                <p className="mt-2 text-[9px] leading-5 text-zinc-500 sm:text-[10px]">{item.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <motion.div style={reduce ? undefined : { y: visualY, opacity: visualOpacity }} className="relative min-h-[430px] lg:min-h-[620px]">
          <div className="absolute inset-x-0 top-[15%] mx-auto h-[58%] max-w-[620px] rounded-[44%] border border-cyan-300/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.08),transparent_66%)] blur-[1px]" />
          <div className="absolute inset-x-0 top-[23%] mx-auto max-w-[680px]">
            <VehicleWireframe />
          </div>

          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-[19%] rounded-2xl border border-white/10 bg-[#0a0d12]/78 p-4 shadow-2xl backdrop-blur-xl sm:left-[3%]"
          >
            <Cpu className="size-5 text-cyan-300" />
            <p className="mt-3 font-display text-[9px] tracking-[.15em] text-zinc-500" dir="ltr">ECU / SYSTEM SCAN</p>
            <strong className="mt-1 block text-xs text-white">قراءة وتحليل الأنظمة</strong>
          </motion.div>

          <motion.div
            animate={reduce ? undefined : { y: [0, 9, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute bottom-[19%] right-0 rounded-2xl border border-cyan-300/15 bg-[#0a0d12]/82 p-4 shadow-[0_0_40px_rgba(34,211,238,.08)] backdrop-blur-xl sm:right-[4%]"
          >
            <BatteryCharging className="size-5 text-cyan-300" />
            <p className="mt-3 font-display text-[9px] tracking-[.15em] text-zinc-500" dir="ltr">SOH / SOC / BATTERY</p>
            <strong className="mt-1 block text-xs text-white">بيانات البطارية بوضوح</strong>
          </motion.div>

          <div className="absolute bottom-[5%] left-[16%] hidden items-center gap-2 text-[10px] text-zinc-500 sm:flex" dir="ltr">
            <ShieldCheck className="size-4 text-cyan-300" /> PRECISION FIRST. NO GUESSWORK.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
