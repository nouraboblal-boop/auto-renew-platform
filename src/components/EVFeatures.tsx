"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { BatteryCharging, CheckCircle2, CircleAlert, Cpu, Gauge, ScanLine, Waves } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

function Meter({ value, label, tone = "cyan" }: { value: number; label: string; tone?: "cyan" | "amber" }) {
  const reduce = useReducedMotion();
  const gradient = tone === "cyan" ? "from-[#0070F3] via-[#00F0FF] to-cyan-100" : "from-amber-700 via-amber-400 to-yellow-200";
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[10px]"><span className="text-zinc-500">{label}</span><strong className="font-display text-zinc-200" dir="ltr">{value}%</strong></div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
        <motion.div
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_14px_rgba(0,240,255,.2)]`}
        />
      </div>
    </div>
  );
}

const beforeRows = [
  ["Battery SOH", "غير موثق"],
  ["SOC", "قراءة أولية"],
  ["OBD / ECU", "بحاجة Scan"],
  ["DiLink", "الإصدار غير معروف"]
];
const afterRows = [
  ["Battery SOH", "98% DEMO"],
  ["SOC", "Live Data"],
  ["OBD / ECU", "Scan Report"],
  ["DiLink", "Compatibility Check"]
];

function DiagnosticChip({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <motion.div whileHover={{ scale: 1.025, y: -3 }} className="rounded-2xl border border-white/8 bg-black/20 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <span className="text-cyan-300">{icon}</span>
        <span className="font-display text-[8px] tracking-[.14em] text-zinc-600" dir="ltr">{label}</span>
      </div>
      <strong className="mt-3 block font-display text-xl font-black text-white" dir="ltr">{value}</strong>
    </motion.div>
  );
}

export function EVFeatures() {
  const reduce = useReducedMotion();

  return (
    <section id="ev-features" className="section-pad relative overflow-hidden border-y border-white/[.06] bg-[#0D0E12]" aria-labelledby="ev-title">
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      <div className="absolute left-[10%] top-[14%] size-80 rounded-full bg-[#0070F3]/[.05] blur-[110px]" aria-hidden="true" />
      <div className="absolute right-[7%] bottom-[10%] size-72 rounded-full bg-[#FF0055]/[.035] blur-[100px]" aria-hidden="true" />

      <div className="container-ar relative">
        <Reveal className="grid gap-7 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="section-kicker" dir="ltr">EV INTELLIGENCE / BMS / ECU / DILINK</p>
            <h2 id="ev-title" className="mt-4 text-[clamp(2.3rem,5vw,4.8rem)] font-black leading-[1.12] tracking-[-.04em] text-white">
              واجهة تشخيص
              <span className="block bg-gradient-to-l from-cyan-200 via-[#00F0FF] to-[#0070F3] bg-clip-text text-transparent">تشبه مركزاً عالمياً.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-8 text-zinc-500">هذه البيانات تمثيلية لتوضيح شكل تجربة العميل بعد الفحص. النتيجة الحقيقية تعتمد على السيارة والأجهزة والإصدار المتوافق.</p>
            <div className="mt-4 flex flex-wrap gap-2" dir="ltr">
              {['BYD SONG PLUS', 'DESTROYER 05', 'DILINK', 'BMS / ECU'].map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 font-display text-[8px] tracking-[.1em] text-zinc-500">{tag}</span>)}
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={panelVariants}
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-5 xl:grid-cols-[.84fr_1.16fr]"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/8 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-amber-300/15 bg-amber-300/[.05] text-amber-300"><CircleAlert className="size-5" /></span>
                  <div><p className="font-display text-[8px] tracking-[.16em] text-amber-300" dir="ltr">BEFORE DIAGNOSTIC</p><h3 className="mt-1 text-base font-extrabold text-white">قبل الفحص المنظم</h3></div>
                </div>
                <ScanLine className="size-5 text-zinc-700" />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-[.76fr_1.24fr]">
                <div className="grid place-items-center rounded-2xl border border-white/8 bg-black/20 p-5">
                  <div className="relative grid size-36 place-items-center rounded-full border-[11px] border-white/[.04]">
                    <BatteryCharging className="size-10 text-amber-300/80" />
                    <span className="absolute inset-2 rounded-full border border-dashed border-amber-300/15" />
                  </div>
                  <p className="mt-4 text-center text-[10px] leading-6 text-zinc-600">قراءات متفرقة<br/>بدون تقرير موحد</p>
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="beam-card relative h-full overflow-hidden border-cyan-300/15 p-5 sm:p-7">
              <div className="absolute right-0 top-0 size-72 rounded-full bg-cyan-300/[.06] blur-[95px]" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 size-64 rounded-full bg-[#FF0055]/[.025] blur-[90px]" aria-hidden="true" />

              <div className="relative flex items-center justify-between border-b border-white/8 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-cyan-300/18 bg-cyan-300/[.06] text-cyan-300"><CheckCircle2 className="size-5" /></span>
                  <div><p className="font-display text-[8px] tracking-[.16em] text-cyan-300" dir="ltr">AFTER ANALYSIS / DEMO</p><h3 className="mt-1 text-base font-extrabold text-white">بعد القراءة والتحليل</h3></div>
                </div>
                <Cpu className="size-5 text-cyan-300/65" />
              </div>

              <div className="relative mt-6 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
                <div>
                  <motion.div
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    className="grid min-h-[260px] place-items-center rounded-2xl border border-cyan-300/10 bg-cyan-300/[.025] p-5"
                  >
                    <div className="relative grid size-44 place-items-center rounded-full bg-[conic-gradient(#00F0FF_0deg,#0070F3_352deg,rgba(255,255,255,.05)_352deg)] p-[10px] shadow-[0_0_60px_rgba(0,240,255,.12)]">
                      <div className="grid size-full place-items-center rounded-full bg-[#0B0D12] text-center">
                        <div><strong className="font-display text-5xl font-black text-white" dir="ltr">98%</strong><span className="mt-1 block font-display text-[8px] tracking-[.14em] text-cyan-300">DEMO SOH</span></div>
                      </div>
                    </div>
                    <p className="mt-4 text-center text-[10px] leading-6 text-zinc-500">بطارية واضحة بصرياً<br/>مع بيانات منظمة</p>
                  </motion.div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-3">
                    <DiagnosticChip icon={<Cpu className="size-4" />} label="OBD / ECU" value="24 MOD" />
                    <DiagnosticChip icon={<Gauge className="size-4" />} label="LIVE DATA" value="READY" />
                    <DiagnosticChip icon={<Waves className="size-4" />} label="DILINK" value="CHECK" />
                    <DiagnosticChip icon={<BatteryCharging className="size-4" />} label="BMS" value="PASS" />
                  </div>
                  <div className="mt-4 space-y-4">
                    <Meter value={98} label="Battery health visibility" />
                    <Meter value={92} label="System visibility" />
                  </div>
                  <div className="mt-5 divide-y divide-white/[.06] rounded-xl border border-cyan-300/10 bg-black/15 px-4">
                    {afterRows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 py-3 text-[10px]"><span className="font-display text-zinc-600" dir="ltr">{label}</span><span className="text-cyan-100/80">{value}</span></div>)}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
