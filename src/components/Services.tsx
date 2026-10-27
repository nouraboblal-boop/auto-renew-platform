"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BatteryCharging,
  Boxes,
  Cpu,
  Gauge,
  Languages,
  MapPinned,
  PaintBucket,
  Shield,
  Smartphone,
  Sparkles,
  UploadCloud,
  WrapText
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROTECTION_IMAGE = "https://images.unsplash.com/photo-1766801075406-fd842ea5c398?auto=format&fit=crop&fm=jpg&q=80&w=1800";

type ServiceItem = {
  title: string;
  description: string;
  meta: string;
  metric: string;
  metricLabel: string;
  icon: ComponentType<{ className?: string }>;
  shimmer?: boolean;
};

type ServiceGroup = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  items: ServiceItem[];
};

const groups: Record<string, ServiceGroup> = {
  ev: {
    eyebrow: "EV DIAGNOSTICS / HIGH VOLTAGE DATA",
    title: "فحص وبرمجة السيارات الكهربائية",
    description: "قراءة منظمة للبطارية ووحدات التحكم والبيانات الحية، مع واجهة تقنية تعطي العميل صورة واضحة عن مسار التشخيص.",
    badge: "OBD / ECU / BMS",
    items: [
      { title: "Battery SOH / SOC", description: "قراءة صحة البطارية ونسبة الشحن والجهود المتاحة من النظام التشخيصي المتوافق.", meta: "BATTERY HEALTH", metric: "98%", metricLabel: "DEMO SOH", icon: BatteryCharging },
      { title: "OBD / ECU Scan", description: "قراءة الأعطال والبيانات الحية عبر وحدات التحكم المدعومة، مع تنظيم النتائج قبل أي تدخل.", meta: "DTC / LIVE DATA", metric: "24", metricLabel: "DEMO MODULES", icon: Cpu },
      { title: "System Programming", description: "تهيئة وبرمجة الوظائف المتوافقة بعد التأكد من طراز السيارة والإصدار البرمجي.", meta: "CONFIGURATION", metric: "ECU", metricLabel: "PROGRAMMING", icon: Gauge },
      { title: "Cloud / OTA Check", description: "التحقق من خيارات التحديث والتهيئة المتصلة عند توفرها على النظام المدعوم.", meta: "CONNECTED SYSTEMS", metric: "OTA", metricLabel: "COMPATIBILITY", icon: UploadCloud }
    ]
  },
  dilink: {
    eyebrow: "BYD / DILINK / SMART CABIN",
    title: "تعريب وتعديل شاشات BYD وDiLink",
    description: "تجربة شاشة أقرب للمستخدم العربي مع الحفاظ على التوافق. تشمل Song Plus وDestroyer 05 وغيرها بعد فحص الإصدار الفعلي.",
    badge: "SONG PLUS / DESTROYER 05",
    items: [
      { title: "تعريب DiLink", description: "تهيئة اللغة العربية للواجهة والأنظمة المدعومة مع مراجعة الوظائف الأساسية بعد التنفيذ.", meta: "ARABIC UI", metric: "AR", metricLabel: "DILINK UI", icon: Languages },
      { title: "تثبيت التطبيقات", description: "إضافة التطبيقات المتوافقة ضمن حدود النظام والإصدار المثبت على السيارة.", meta: "APP ECOSYSTEM", metric: "APP", metricLabel: "SUPPORTED", icon: Smartphone },
      { title: "خرائط دون إنترنت", description: "تجهيز حلول ملاحة محلية مدعومة عند سماح المنصة والطراز بذلك.", meta: "OFFLINE NAV", metric: "NAV", metricLabel: "LOCAL MAPS", icon: MapPinned },
      { title: "تخصيص النظام", description: "ضبط الواجهة والاختصارات والوظائف المتاحة وفق توافق النسخة البرمجية.", meta: "SMART CONFIG", metric: "UI", metricLabel: "CUSTOM", icon: Boxes }
    ]
  },
  care: {
    eyebrow: "PPF / VINYL / CERAMIC",
    title: "الحماية والعناية الفاخرة",
    description: "مواد وتشطيبات تمنح السيارة حضوراً أقوى وتحافظ على السطح، مع تصميم بصري أكثر فخامة من مجرد قائمة خدمات.",
    badge: "PAINT PROTECTION STUDIO",
    items: [
      { title: "PPF Protection", description: "تغطيات حماية شفافة للمناطق المعرضة للاحتكاك أو للسيارة كاملة بحسب الباقة.", meta: "PAINT PROTECTION FILM", metric: "PPF", metricLabel: "CLEAR ARMOR", icon: Shield, shimmer: true },
      { title: "Color Vinyl Wrap", description: "تجليد لوني وتشطيبات مميزة مع عناية دقيقة بالحواف والمنحنيات.", meta: "VINYL / WRAP", metric: "360°", metricLabel: "COLOR CHANGE", icon: PaintBucket, shimmer: true },
      { title: "Nano Ceramic", description: "طبقات حماية سطحية ولمعان محسّن وفق المنتج وخطة التطبيق المعتمدة.", meta: "COATING", metric: "GLOSS", metricLabel: "SURFACE CARE", icon: Sparkles, shimmer: true },
      { title: "Detail Finish", description: "تنظيف وتشطيب نهائي يرفع مستوى التسليم ويظهر التفاصيل الصغيرة بوضوح.", meta: "FINISHING", metric: "PRO", metricLabel: "HAND FINISH", icon: WrapText, shimmer: true }
    ]
  }
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

function ServiceSignal({ active }: { active: string }) {
  const reduce = useReducedMotion();
  const values = active === "ev" ? [98, 86, 92, 78] : active === "dilink" ? [94, 76, 88, 96] : [82, 91, 96, 87];

  return (
    <motion.aside
      key={active}
      initial={reduce ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-white/10 bg-[#090A0F] shadow-[0_30px_100px_rgba(0,0,0,.44)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(0,240,255,.12),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(255,0,85,.08),transparent_28%)]" />
      {active === "care" && (
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${PROTECTION_IMAGE})` }} aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090A0F]/25 via-[#090A0F]/72 to-[#090A0F]" />
      <div className="cyber-grid absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-[9px] font-bold tracking-[.18em] text-cyan-300" dir="ltr">LIVE VISUAL / DEMO DATA</p>
            <h3 className="mt-2 text-xl font-extrabold text-white">واجهة تقنية غنية</h3>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.07] px-3 py-1.5 text-[9px] font-bold text-emerald-300" dir="ltr">
            <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" /> ONLINE
          </span>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3">
          {[
            ["SOH", active === "ev" ? "98%" : "--"],
            ["ECU", active === "ev" ? "READY" : active === "dilink" ? "DILINK" : "CARE"],
            ["OBD", active === "ev" ? "24 MOD" : "SCAN"],
            ["STATUS", "PASS"]
          ].map(([label, value]) => (
            <motion.div key={label} whileHover={reduce ? undefined : { scale: 1.02, y: -3 }} className="rounded-2xl border border-white/8 bg-white/[.035] p-4 backdrop-blur-xl">
              <span className="font-display text-[8px] tracking-[.16em] text-zinc-600" dir="ltr">{label}</span>
              <strong className="mt-2 block font-display text-lg font-black text-white" dir="ltr">{value}</strong>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex h-48 items-end gap-3 rounded-2xl border border-white/8 bg-black/25 p-4 backdrop-blur-xl">
          {values.map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end overflow-hidden rounded-lg bg-white/[0.035]">
                <motion.div
                  initial={reduce ? false : { height: 0 }}
                  whileInView={{ height: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#0070F3]/55 via-[#00F0FF]/65 to-cyan-100 shadow-[0_0_28px_rgba(0,240,255,.18)]"
                />
              </div>
              <span className="font-display text-[8px] text-zinc-700" dir="ltr">CH-{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-white/8 pt-5 text-[9px] text-zinc-600" dir="ltr">
            <span>AUTO RENEW SYSTEM VIEW</span><span className="text-rose-400/80">DEMO</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export function Services() {
  const [active, setActive] = useState("ev");
  const reduce = useReducedMotion();

  return (
    <section id="services" className="section-pad relative overflow-hidden bg-[#090A0F]" aria-labelledby="services-title">
      <div className="absolute left-[-12%] top-[18%] size-[500px] rounded-full bg-[#0070F3]/[.055] blur-[140px]" aria-hidden="true" />
      <div className="absolute right-[-10%] bottom-[8%] size-[420px] rounded-full bg-[#FF0055]/[.035] blur-[130px]" aria-hidden="true" />
      <div className="container-ar relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker" dir="ltr">AUTO RENEW / ENGINEERED SERVICES</p>
            <h2 id="services-title" className="mt-4 max-w-4xl text-[clamp(2.4rem,5.2vw,5rem)] font-black leading-[1.1] tracking-[-.04em] text-white">
              ليست بطاقات خدمات عادية.
              <span className="block text-zinc-500">إنها تجربة تقنية تفاعلية.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-8 text-zinc-500">كل فئة تعرض بيانات وقياسات تمثيلية بوضوح، مع فصل بصري بين البرمجة بالسيان والعناية الرياضية باللمسة الحمراء.</p>
        </Reveal>

        <Tabs value={active} onValueChange={setActive} className="mt-10">
          <TabsList aria-label="فئات الخدمات" className="grid w-full grid-cols-1 gap-1.5 sm:grid-cols-3 md:w-full lg:w-fit">
            <TabsTrigger value="ev">EV Diagnostics</TabsTrigger>
            <TabsTrigger value="dilink">BYD / DiLink</TabsTrigger>
            <TabsTrigger value="care">PPF / Wrap / Care</TabsTrigger>
          </TabsList>

          {Object.entries(groups).map(([key, group]) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-[28px] border border-white/10 bg-zinc-900/60 p-5 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-xl sm:p-7">
                  <div className="mb-7 flex flex-col gap-5 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-display text-[9px] font-bold tracking-[.18em] text-cyan-300" dir="ltr">{group.eyebrow}</p>
                      <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">{group.title}</h3>
                      <p className="mt-3 max-w-2xl text-xs leading-7 text-zinc-500 sm:text-sm">{group.description}</p>
                    </div>
                    <span className="w-fit rounded-full border border-white/10 bg-white/[.035] px-3 py-1.5 font-display text-[8px] tracking-[.12em] text-zinc-500" dir="ltr">{group.badge}</span>
                  </div>

                  <motion.div
                    variants={gridVariants}
                    initial={reduce ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid gap-3 md:grid-cols-2"
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <motion.div key={item.title} variants={cardVariants}>
                          <TiltCard>
                            <motion.article
                              whileHover={reduce ? undefined : { scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 220, damping: 23 }}
                              className={`glow-hover group relative h-full min-h-[250px] rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-xl transition-colors hover:border-cyan-300/30 ${item.shimmer ? "shimmer-card" : ""}`}
                            >
                              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_88%_12%,rgba(0,240,255,.075),transparent_38%)] opacity-70 transition-opacity group-hover:opacity-100" />
                              <div className="relative z-10">
                                <div className="flex items-start justify-between gap-4">
                                  <span className="grid size-11 place-items-center rounded-xl border border-cyan-300/18 bg-cyan-300/[.06] text-cyan-300 shadow-[inset_0_0_18px_rgba(0,240,255,.05)]">
                                    <Icon className="size-5" />
                                  </span>
                                  <div className="text-left" dir="ltr">
                                    <strong className="font-display text-2xl font-black tracking-tight text-white">{item.metric}</strong>
                                    <span className="mt-1 block font-display text-[7px] tracking-[.15em] text-zinc-600">{item.metricLabel}</span>
                                  </div>
                                </div>
                                <p className="mt-7 font-display text-[8px] font-bold tracking-[.16em] text-cyan-300/70" dir="ltr">{item.meta}</p>
                                <h4 className="mt-2 text-base font-extrabold text-white">{item.title}</h4>
                                <p className="mt-3 text-[12px] leading-7 text-zinc-500">{item.description}</p>
                              </div>
                            </motion.article>
                          </TiltCard>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                <ServiceSignal active={active} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
