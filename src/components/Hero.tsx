"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants
} from "framer-motion";
import { ArrowDownLeft, BatteryCharging, Cpu, Gauge, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Button } from "@/components/ui/button";

const HERO_IMAGE = "https://images.unsplash.com/photo-1765521917320-c011148e65e8?auto=format&fit=crop&fm=jpg&q=82&w=2400";

const indicators = [
  { value: 3, suffix: "", label: "مسارات تخصصية" },
  { value: 5, suffix: "+", label: "نقاط فحص رقمية" },
  { value: 360, suffix: "°", label: "عناية متكاملة" }
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
};

function TelemetryCard({ icon, eyebrow, value, className = "" }: { icon: ReactNode; eyebrow: string; value: string; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={`rounded-2xl border border-white/10 bg-[#090A0F]/72 p-4 shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-2xl ${className}`}
    >
      <div className="flex items-center justify-between gap-5">
        <span className="grid size-9 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/[.07] text-cyan-300">{icon}</span>
        <span className="font-display text-[8px] tracking-[.18em] text-zinc-500" dir="ltr">{eyebrow}</span>
      </div>
      <strong className="mt-4 block font-display text-2xl font-black tracking-tight text-white" dir="ltr">{value}</strong>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 75, damping: 20, mass: 0.7 });
  const glowY = useSpring(pointerY, { stiffness: 75, damping: 20, mass: 0.7 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.3]);

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left - rect.width / 2);
    pointerY.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[850px] overflow-hidden bg-[#090A0F] pt-32 sm:pt-36 lg:min-h-[930px]"
    >
      <div className="cyber-grid absolute inset-0 -z-30 opacity-45" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_24%,rgba(0,240,255,.12),transparent_27%),radial-gradient(circle_at_18%_18%,rgba(255,0,85,.075),transparent_24%),linear-gradient(180deg,rgba(9,10,15,.06),#090A0F_92%)]" />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[18%] -z-10 size-[440px] rounded-full bg-cyan-300/[.08] blur-[120px]"
      />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: glowX, y: glowY }}
        className="absolute left-1/2 top-[42%] -z-10 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[.06] blur-[110px]"
      />

      <div className="container-ar grid items-center gap-10 pb-16 lg:grid-cols-[.93fr_1.07fr] lg:gap-10 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="relative z-20 pt-4"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-3.5 py-2 text-[9px] font-extrabold tracking-[.13em] text-cyan-100 backdrop-blur-xl" dir="ltr">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-300 opacity-55"/><span className="relative inline-flex size-2 rounded-full bg-cyan-300"/></span>
            EV DIAGNOSTICS • SMART SYSTEMS • PREMIUM CARE
          </motion.div>

          <motion.div variants={itemVariants} className="relative mt-7">
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [0.15, 0.42, 0.15], scale: [0.94, 1.04, 0.94] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[4%] top-[12%] -z-10 h-36 w-72 rounded-full bg-cyan-300/15 blur-[70px]"
            />
            <h1 id="hero-title" className="max-w-[760px] text-[clamp(3.55rem,7.2vw,7.25rem)] font-black leading-[1.02] tracking-[-.055em] text-white">
              هندسة رقمية.
              <span className="block text-white">عناية <span className="bg-gradient-to-l from-[#00F0FF] via-cyan-300 to-[#0070F3] bg-clip-text text-transparent">بمستوى عالمي.</span></span>
            </h1>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-7 max-w-xl text-sm leading-8 text-zinc-400 sm:text-[15px] sm:leading-9">
            Auto Renew يجمع بين تشخيص وبرمجة السيارات الحديثة، أنظمة BYD وDiLink، وحماية PPF والتجليد والعناية المتقدمة ضمن تجربة دقيقة، بصرية، ومبنية على البيانات.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="danger">
              <a href="#estimate"><ScanLine className="size-4" /> احجز فحصاً فورياً <ArrowDownLeft className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#services"><Sparkles className="size-4 text-cyan-300" /> استكشف الخدمات</a>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,.28)]">
            {indicators.map((item) => (
              <div key={item.label} className="bg-[#0D0E12]/92 px-4 py-5 backdrop-blur-xl sm:px-5">
                <strong className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl" dir="ltr">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </strong>
                <p className="mt-2 text-[9px] leading-5 text-zinc-500 sm:text-[10px]">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: imageY, scale: imageScale, opacity: imageOpacity }}
          className="relative min-h-[520px] lg:min-h-[700px]"
        >
          <div className="absolute inset-[4%_0_2%_2%] rounded-[34px] border border-white/10 bg-[#0D0E12]/65 shadow-[0_50px_130px_rgba(0,0,0,.55)] backdrop-blur-xl" />
          <div className="absolute inset-[7%_2%_5%_0] overflow-hidden rounded-[32px] border border-cyan-300/15">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
              initial={reduce ? false : { scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,15,.82)_0%,rgba(9,10,15,.32)_42%,rgba(9,10,15,.12)_100%),linear-gradient(0deg,rgba(9,10,15,.88),transparent_48%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_24%,rgba(0,240,255,.20),transparent_22%),radial-gradient(circle_at_15%_75%,rgba(255,0,85,.16),transparent_25%)] mix-blend-screen" />
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { y: ["-12%", "112%"] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-cyan-200/[.10] to-transparent blur-sm"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="font-display text-[8px] font-bold tracking-[.17em] text-cyan-200" dir="ltr">DARK LUXURY / DIGITAL PRECISION</p>
                <p className="mt-2 max-w-sm text-xs leading-6 text-zinc-300">صورة سينمائية حقيقية مع طبقات بيانات وتوهج محسوب بدل رسوم مسطحة.</p>
              </div>
              <span className="hidden rounded-full border border-rose-400/25 bg-rose-500/[.12] px-3 py-1.5 font-display text-[8px] tracking-[.14em] text-rose-200 sm:inline-flex" dir="ltr">AUTO RENEW</span>
            </div>
          </div>

          <TelemetryCard icon={<BatteryCharging className="size-4" />} eyebrow="BATTERY SOH" value="98% DEMO" className="absolute left-[-1%] top-[13%] w-[164px]" />
          <TelemetryCard icon={<Cpu className="size-4" />} eyebrow="OBD / ECU" value="READY" className="absolute right-[-1%] top-[27%] w-[155px]" />
          <TelemetryCard icon={<Gauge className="size-4" />} eyebrow="SYSTEM LATENCY" value="12 ms" className="absolute bottom-[8%] left-[8%] w-[160px]" />

          <div className="absolute bottom-[2%] right-[7%] hidden items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[9px] text-zinc-400 backdrop-blur-xl sm:flex" dir="ltr">
            <ShieldCheck className="size-4 text-cyan-300" /> PRECISION FIRST. NO GUESSWORK.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
