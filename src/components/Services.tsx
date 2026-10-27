"use client";

import { motion, useReducedMotion } from "framer-motion";
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

type ServiceItem = {
  title: string;
  description: string;
  meta: string;
  icon: ComponentType<{ className?: string }>;
};

const groups: Record<string, { eyebrow: string; title: string; description: string; items: ServiceItem[] }> = {
  ev: {
    eyebrow: "EV DIAGNOSTICS",
    title: "فحص وبرمجة السيارات الكهربائية",
    description: "قراءة منظمة لحالة البطارية والأنظمة الإلكترونية قبل أي قرار صيانة أو برمجة.",
    items: [
      { title: "Battery SOH / SOC", description: "قراءة مؤشرات صحة البطارية ونسبة الشحن والبيانات المتاحة من النظام التشخيصي.", meta: "BATTERY HEALTH", icon: BatteryCharging },
      { title: "ECU Diagnostics", description: "فحص وحدات التحكم وقراءة الأخطاء والبيانات الحية وفق الأدوات المتوافقة مع المركبة.", meta: "ECU / DTC / LIVE DATA", icon: Cpu },
      { title: "System Programming", description: "تهيئة وبرمجة الوظائف المدعومة بعد التحقق من الطراز والإصدار البرمجي.", meta: "CONFIGURATION", icon: Gauge },
      { title: "Cloud Updates", description: "التحقق من خيارات التحديث والتهيئة السحابية المتاحة للأنظمة المدعومة.", meta: "CONNECTED SYSTEMS", icon: UploadCloud }
    ]
  },
  dilink: {
    eyebrow: "BYD / DILINK SYSTEMS",
    title: "تعريب وتعديل شاشات BYD وDiLink",
    description: "تخصيص تجربة الشاشة والواجهة للسيارات المتوافقة مثل Song Plus وDestroyer 05 وغيرها بعد التحقق من الإصدار.",
    items: [
      { title: "تعريب الواجهة", description: "تهيئة اللغة العربية للأنظمة والإصدارات المدعومة مع الحفاظ على وضوح عناصر التحكم.", meta: "ARABIC UI", icon: Languages },
      { title: "تثبيت التطبيقات", description: "إضافة التطبيقات المتوافقة ضمن حدود النظام والطراز والإصدار المثبت على السيارة.", meta: "APP ECOSYSTEM", icon: Smartphone },
      { title: "خرائط دون إنترنت", description: "إعداد حلول ملاحة أو خرائط محلية مدعومة عندما تسمح المنصة بذلك.", meta: "OFFLINE NAV", icon: MapPinned },
      { title: "تخصيص النظام", description: "ضبط خيارات الواجهة والاختصارات والوظائف المتاحة وفق توافق النظام.", meta: "SMART CONFIG", icon: Boxes }
    ]
  },
  care: {
    eyebrow: "PREMIUM PROTECTION",
    title: "الحماية والعناية الفاخرة",
    description: "تشطيبات دقيقة تجمع بين حماية الطلاء وتحسين المظهر مع تحديد نطاق العمل والضمان قبل التنفيذ.",
    items: [
      { title: "PPF", description: "أفلام حماية شفافة للمناطق الأكثر عرضة للاحتكاك أو لتغطيات أوسع بحسب الباقة.", meta: "PAINT PROTECTION FILM", icon: Shield },
      { title: "Color Vinyl Wrap", description: "تجليد لوني بخيارات وتشطيبات متعددة مع عناية خاصة بالحواف والتفاصيل.", meta: "VINYL / WRAP", icon: PaintBucket },
      { title: "Nano Ceramic", description: "طبقات حماية سطحية لتعزيز سهولة العناية واللمعان وفق المنتج وخطة التطبيق.", meta: "COATING", icon: Sparkles },
      { title: "تفاصيل وتشطيبات", description: "معالجة بصرية دقيقة للمناطق النهائية قبل التسليم لضمان تناسق النتيجة.", meta: "FINISHING", icon: WrapText }
    ]
  }
};

function ServiceSignal({ active }: { active: string }) {
  const reduce = useReducedMotion();
  const values = active === "ev" ? [82, 64, 91, 73] : active === "dilink" ? [74, 88, 62, 95] : [68, 79, 91, 84];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0d12] p-6 shadow-[0_30px_90px_rgba(0,0,0,.38)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(34,211,238,.11),transparent_34%)]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-[9px] font-bold tracking-[.18em] text-cyan-300" dir="ltr">LIVE SYSTEM VIEW</p>
            <h3 className="mt-2 text-lg font-extrabold text-white">واجهة بيانات توضيحية</h3>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.07] px-3 py-1.5 text-[9px] font-bold text-emerald-300" dir="ltr">
            <span className="size-1.5 rounded-full bg-emerald-300" /> ONLINE
          </span>
        </div>

        <div className="mt-8 flex h-44 items-end gap-3 rounded-2xl border border-white/8 bg-black/20 p-4">
          {values.map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end overflow-hidden rounded-lg bg-white/[0.035]">
                <motion.div
                  initial={reduce ? false : { height: 0 }}
                  whileInView={{ height: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600/50 via-cyan-400/60 to-cyan-200 shadow-[0_0_26px_rgba(34,211,238,.18)]"
                />
              </div>
              <span className="font-display text-[9px] text-zinc-600" dir="ltr">CH-{index + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] leading-6 text-zinc-600">المخطط بصري توضيحي ولا يمثل نتيجة فحص سيارة فعلية.</p>
      </div>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState("ev");
  const group = groups[active];

  return (
    <section id="services" className="section-pad relative overflow-hidden bg-[#0B0C10]" aria-labelledby="services-title">
      <div className="absolute left-[-10%] top-[18%] size-[420px] rounded-full bg-blue-600/[.06] blur-[120px]" aria-hidden="true" />
      <div className="container-ar relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker" dir="ltr">AUTO RENEW / EXPERTISE</p>
            <h2 id="services-title" className="mt-4 max-w-3xl text-[clamp(2.2rem,5vw,4.7rem)] font-black leading-[1.15] tracking-[-.035em] text-white">
              خدمات مصممة للسيارة
              <span className="block text-zinc-500">الحديثة، لا للحلول العامة.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-8 text-zinc-500">نبدأ بالتوافق والفحص، ثم نحدد الإجراء المناسب. كل خدمة في الواجهة مرتبطة بمسار واضح نحو التقدير والحجز.</p>
        </Reveal>

        <Tabs value={active} onValueChange={setActive} className="mt-10">
          <TabsList aria-label="فئات الخدمات">
            <TabsTrigger value="ev">EV Diagnostics</TabsTrigger>
            <TabsTrigger value="dilink">BYD / DiLink</TabsTrigger>
            <TabsTrigger value="care">Protection</TabsTrigger>
          </TabsList>

          {Object.entries(groups).map(([key, itemGroup]) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
                  <div className="mb-7 border-b border-white/8 pb-6">
                    <p className="font-display text-[9px] font-bold tracking-[.18em] text-cyan-300" dir="ltr">{itemGroup.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">{itemGroup.title}</h3>
                    <p className="mt-3 max-w-2xl text-xs leading-7 text-zinc-500 sm:text-sm">{itemGroup.description}</p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {itemGroup.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <TiltCard key={item.title}>
                          <article className="group relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-white/9 bg-[#0d1015] p-5 transition-colors hover:border-cyan-300/30">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(34,211,238,.085),transparent_38%)] opacity-70 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                              <span className="grid size-11 place-items-center rounded-xl border border-cyan-300/16 bg-cyan-300/[.055] text-cyan-300 shadow-[inset_0_0_18px_rgba(34,211,238,.05)]">
                                <Icon className="size-5" />
                              </span>
                              <p className="mt-7 font-display text-[8px] font-bold tracking-[.16em] text-zinc-600" dir="ltr">{item.meta}</p>
                              <h4 className="mt-2 text-base font-extrabold text-white">{item.title}</h4>
                              <p className="mt-3 text-[12px] leading-7 text-zinc-500">{item.description}</p>
                            </div>
                          </article>
                        </TiltCard>
                      );
                    })}
                  </div>
                </div>
                <ServiceSignal active={active} />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="sr-only" aria-live="polite">القسم الحالي: {group.title}</div>
      </div>
    </section>
  );
}
