"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BatteryCharging, CheckCircle2, CircleAlert, Cpu, ScanLine } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";

function Meter({ value, label, tone = "cyan" }: { value: number; label: string; tone?: "cyan" | "amber" }) {
  const reduce = useReducedMotion();
  const gradient = tone === "cyan" ? "from-blue-600 via-cyan-400 to-cyan-200" : "from-amber-700 via-amber-400 to-yellow-200";
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[10px]"><span className="text-zinc-500">{label}</span><strong className="font-display text-zinc-200" dir="ltr">{value}%</strong></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
        <motion.div
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
    </div>
  );
}

const beforeRows = [
  ["Battery SOH", "غير موثق"],
  ["SOC", "قراءة أولية"],
  ["ECU / DTC", "بحاجة مسح"],
  ["Software", "غير متحقق"]
];
const afterRows = [
  ["Battery SOH", "قراءة موثقة"],
  ["SOC", "Live Data"],
  ["ECU / DTC", "Scan Report"],
  ["Software", "Compatibility Check"]
];

export function EVFeatures() {
  return (
    <section id="ev-features" className="section-pad relative overflow-hidden border-y border-white/[.06] bg-[#0d1015]" aria-labelledby="ev-title">
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      <div className="container-ar relative">
        <Reveal className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-kicker" dir="ltr">EV INTELLIGENCE / BEFORE & AFTER</p>
            <h2 id="ev-title" className="mt-4 text-[clamp(2.2rem,4.8vw,4.5rem)] font-black leading-[1.15] tracking-[-.04em] text-white">
              من بيانات مبهمة
              <span className="block text-cyan-300">إلى صورة تقنية أوضح.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-zinc-500 lg:justify-self-end">المقارنة التالية نموذج UI توضيحي لمسار التشخيص: الهدف إظهار كيف تتحول البيانات من حالة غير موثقة إلى تقرير منظم. لا تمثل الأرقام نتيجة سيارة فعلية.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          <Reveal delay={0.08}>
            <Card className="h-full p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/8 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-amber-300/15 bg-amber-300/[.05] text-amber-300"><CircleAlert className="size-5" /></span>
                  <div><p className="font-display text-[8px] tracking-[.16em] text-amber-300" dir="ltr">BEFORE DIAGNOSTIC</p><h3 className="mt-1 text-base font-extrabold text-white">قبل الفحص المنظم</h3></div>
                </div>
                <ScanLine className="size-5 text-zinc-700" />
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-[.8fr_1.2fr]">
                <div className="grid place-items-center rounded-2xl border border-white/8 bg-black/20 p-5">
                  <div className="relative grid size-32 place-items-center rounded-full border-[10px] border-white/[.04]">
                    <BatteryCharging className="size-9 text-amber-300/80" />
                    <span className="absolute inset-2 rounded-full border border-dashed border-amber-300/15" />
                  </div>
                  <p className="mt-4 text-center text-[10px] leading-6 text-zinc-600">قراءات متفرقة<br/>بدون سياق موحد</p>
                </div>
                <div className="space-y-4">
                  <Meter value={42} label="Data completeness" tone="amber" />
                  <Meter value={34} label="System visibility" tone="amber" />
                  <div className="mt-5 divide-y divide-white/[.06] rounded-xl border border-white/8 bg-black/15 px-4">
                    {beforeRows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 py-3 text-[10px]"><span className="font-display text-zinc-600" dir="ltr">{label}</span><span className="text-zinc-400">{value}</span></div>)}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.16}>
            <Card className="relative h-full overflow-hidden border-cyan-300/15 p-5 sm:p-7">
              <div className="absolute right-0 top-0 size-56 rounded-full bg-cyan-300/[.055] blur-[80px]" aria-hidden="true" />
              <div className="relative flex items-center justify-between border-b border-white/8 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/18 bg-cyan-300/[.06] text-cyan-300"><CheckCircle2 className="size-5" /></span>
                  <div><p className="font-display text-[8px] tracking-[.16em] text-cyan-300" dir="ltr">AFTER ANALYSIS</p><h3 className="mt-1 text-base font-extrabold text-white">بعد القراءة والتحليل</h3></div>
                </div>
                <Cpu className="size-5 text-cyan-300/65" />
              </div>
              <div className="relative mt-6 grid gap-5 sm:grid-cols-[.8fr_1.2fr]">
                <div className="grid place-items-center rounded-2xl border border-cyan-300/10 bg-cyan-300/[.025] p-5">
                  <div className="relative grid size-32 place-items-center rounded-full border-[10px] border-cyan-300/[.11] shadow-[0_0_42px_rgba(34,211,238,.07)]">
                    <div className="text-center"><strong className="font-display text-3xl font-black text-white" dir="ltr">92</strong><span className="block text-[8px] text-cyan-300">SAMPLE SOH</span></div>
                    <span className="absolute inset-2 rounded-full border border-cyan-300/20" />
                  </div>
                  <p className="mt-4 text-center text-[10px] leading-6 text-zinc-500">بيانات منظمة<br/>وقابلة للمراجعة</p>
                </div>
                <div className="space-y-4">
                  <Meter value={94} label="Data completeness" />
                  <Meter value={88} label="System visibility" />
                  <div className="mt-5 divide-y divide-white/[.06] rounded-xl border border-cyan-300/10 bg-black/15 px-4">
                    {afterRows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 py-3 text-[10px]"><span className="font-display text-zinc-600" dir="ltr">{label}</span><span className="text-cyan-100/80">{value}</span></div>)}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
