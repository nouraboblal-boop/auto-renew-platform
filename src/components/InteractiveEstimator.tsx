"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpLeft, CalendarDays, CarFront, Check, MessageCircle, Sparkles, Zap } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SERVICES, PACKAGES, VEHICLES, estimateCost, money } from "@/lib/catalog.mjs";
import { buildBookingMessage, buildWhatsAppUrl, isContactPhoneValid } from "@/lib/booking.mjs";

const DESTINATION = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const columnVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }
};

function ChoiceGrid({
  title,
  items,
  value,
  onChange,
  columns = "grid-cols-2"
}: {
  title: string;
  items: Array<{ id: string; name: string }>;
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-extrabold text-zinc-300">{title}</legend>
      <div className={`grid gap-2 ${columns}`}>
        {items.map((item) => {
          const selected = value === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              aria-pressed={selected}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onChange(item.id)}
              className={`relative min-h-12 rounded-xl border px-3 py-2 text-right text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                selected
                  ? "border-cyan-300/55 bg-cyan-300/[.09] text-cyan-50 shadow-[inset_0_0_20px_rgba(0,240,255,.05),0_0_22px_rgba(0,240,255,.06)]"
                  : "border-white/8 bg-white/[.025] text-zinc-500 hover:border-white/16 hover:text-zinc-200"
              }`}
            >
              {item.name}
              {selected && <Check className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-cyan-300" />}
            </motion.button>
          );
        })}
      </div>
    </fieldset>
  );
}

function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function InteractiveEstimator() {
  const reduce = useReducedMotion();
  const [serviceId, setServiceId] = useState("ev");
  const [packageId, setPackageId] = useState("essential");
  const [vehicleId, setVehicleId] = useState("sedan");
  const [name, setName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [notice, setNotice] = useState("");

  const price = useMemo(() => estimateCost({ serviceId, packageId, vehicleId }), [serviceId, packageId, vehicleId]);
  const service = SERVICES.find((item) => item.id === serviceId) ?? SERVICES[0];
  const pack = PACKAGES.find((item) => item.id === packageId) ?? PACKAGES[0];
  const vehicle = VEHICLES.find((item) => item.id === vehicleId) ?? VEHICLES[0];
  const destinationReady = Boolean(buildWhatsAppUrl(DESTINATION, "test"));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!name.trim() || !carModel.trim() || !isContactPhoneValid(contactPhone)) {
      setNotice("أدخل الاسم وطراز السيارة ورقم تواصل صحيح قبل المتابعة.");
      return;
    }
    if (!consent) {
      setNotice("يرجى الموافقة على مشاركة بيانات الطلب مع Auto Renew عبر واتساب.");
      return;
    }
    if (preferredDate && preferredDate < today()) {
      setNotice("اختر تاريخاً حالياً أو مستقبلياً.");
      return;
    }

    const message = buildBookingMessage({ name, contactPhone, carModel, preferredDate, serviceId, packageId, vehicleId });
    const url = buildWhatsAppUrl(DESTINATION, message);

    if (!url) {
      setNotice("رقم واتساب الرسمي غير مهيأ بعد في NEXT_PUBLIC_WHATSAPP_NUMBER.");
      return;
    }

    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) window.location.assign(url);
    else setNotice("تم تجهيز الطلب وفتح واتساب. اضغط إرسال داخل المحادثة لتأكيد التواصل.");
  }

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-[12px] text-white outline-none placeholder:text-zinc-700 transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/10";

  return (
    <section id="estimate" className="section-pad relative overflow-hidden bg-[#090A0F]" aria-labelledby="estimate-title">
      <div className="absolute right-[-12%] top-[18%] size-[470px] rounded-full bg-[#00F0FF]/[.045] blur-[130px]" aria-hidden="true" />
      <div className="absolute left-[-8%] bottom-[6%] size-[380px] rounded-full bg-[#FF0055]/[.04] blur-[120px]" aria-hidden="true" />

      <div className="container-ar relative">
        <Reveal className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker" dir="ltr">INTERACTIVE ESTIMATOR / BOOKING</p>
            <h2 id="estimate-title" className="mt-4 text-[clamp(2.4rem,5.2vw,4.9rem)] font-black leading-[1.12] tracking-[-.04em] text-white">
              حاسبة واضحة.
              <span className="block text-zinc-500">وحجز لا يضيع وقت العميل.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-8 text-zinc-500">اختر الخدمة من Tabs واضحة، عدّل فئة السيارة والباقة، ثم شاهد السعر يتحرك لحظياً قبل إرسال الطلب إلى واتساب.</p>
        </Reveal>

        <div className="grid gap-5 xl:grid-cols-[1.06fr_.94fr]">
          <Card className="beam-card relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/8 pb-5">
              <div>
                <p className="font-display text-[9px] font-bold tracking-[.16em] text-cyan-300" dir="ltr">01 / CONFIGURE</p>
                <h3 className="mt-2 text-xl font-extrabold text-white">بناء الباقة</h3>
              </div>
              <CarFront className="size-6 text-zinc-600" />
            </div>

            <motion.div variants={columnVariants} initial={reduce ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="mt-6 space-y-7">
              <motion.div variants={rowVariants}>
                <p className="mb-3 text-[11px] font-extrabold text-zinc-300">نوع الخدمة</p>
                <Tabs value={serviceId} onValueChange={setServiceId}>
                  <TabsList className="grid w-full grid-cols-2 gap-1.5 bg-black/30 sm:grid-cols-3 xl:grid-cols-5">
                    {SERVICES.map((item) => <TabsTrigger key={item.id} value={item.id} className="px-2.5 text-[10px]">{item.name}</TabsTrigger>)}
                  </TabsList>
                </Tabs>
              </motion.div>

              <motion.div variants={rowVariants}><ChoiceGrid title="فئة السيارة" items={VEHICLES} value={vehicleId} onChange={setVehicleId} columns="grid-cols-1 sm:grid-cols-3" /></motion.div>
              <motion.div variants={rowVariants}><ChoiceGrid title="مستوى الباقة" items={PACKAGES} value={packageId} onChange={setPackageId} columns="grid-cols-1 sm:grid-cols-3" /></motion.div>
            </motion.div>

            <motion.div
              whileHover={reduce ? undefined : { scale: 1.012 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-cyan-300/16 bg-[linear-gradient(135deg,rgba(0,240,255,.09),rgba(0,112,243,.035))] p-5"
            >
              <motion.div
                aria-hidden="true"
                animate={reduce ? undefined : { opacity: [0.2, 0.52, 0.2], scale: [0.94, 1.04, 0.94] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[15%] top-[18%] size-28 rounded-full bg-cyan-300/10 blur-[50px]"
              />
              <div className="relative flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">التقدير المبدئي</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.strong
                      key={price}
                      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)", scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 block font-display text-5xl font-black tracking-tight text-white sm:text-6xl"
                      dir="ltr"
                    >
                      {money(price)} <span className="text-sm font-bold text-cyan-300">USD*</span>
                    </motion.strong>
                  </AnimatePresence>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-3 py-1.5 text-[9px] font-bold text-cyan-200"><Zap className="ml-1 inline size-3" />تقدير فوري</span>
              </div>
              <div className="relative mt-5 grid gap-2 text-[10px] text-zinc-500 sm:grid-cols-3">
                <span>{service.name}</span><span>{vehicle.name}</span><span>{pack.name}</span>
              </div>
            </motion.div>
            <p className="mt-3 text-[10px] leading-6 text-zinc-600">* الأرقام توضيحية وليست عرض سعر رسمي من Auto Renew.</p>
          </Card>

          <Card className="relative overflow-hidden border-rose-500/15 p-5 sm:p-7">
            <motion.div
              aria-hidden="true"
              animate={reduce ? undefined : { opacity: [0.18, 0.42, 0.18], scale: [0.92, 1.05, 0.92] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[10%] top-[6%] size-40 rounded-full bg-[#FF0055]/10 blur-[65px]"
            />
            <div className="relative flex items-center justify-between border-b border-white/8 pb-5">
              <div>
                <p className="font-display text-[9px] font-bold tracking-[.16em] text-rose-400" dir="ltr">02 / WHATSAPP REQUEST</p>
                <h3 className="mt-2 text-xl font-extrabold text-white">تأكيد طلب الاستشارة</h3>
              </div>
              <MessageCircle className="size-6 text-rose-400/70" />
            </div>

            <div className="relative mt-5 rounded-2xl border border-rose-400/12 bg-rose-500/[.035] p-4">
              <p className="flex items-center gap-2 text-[11px] font-bold text-zinc-300"><Sparkles className="size-4 text-rose-400" /> {service.name} · {vehicle.name} · {pack.name}</p>
            </div>

            <form onSubmit={submit} className="relative mt-5 space-y-4">
              <label htmlFor="estimate-name" className="block text-[11px] font-bold text-zinc-300">الاسم الكامل
                <input id="estimate-name" className={inputClass} value={name} maxLength={80} autoComplete="name" required onChange={(event) => setName(event.target.value)} placeholder="كيف نناديك؟" />
              </label>
              <label htmlFor="estimate-phone" className="block text-[11px] font-bold text-zinc-300">رقم التواصل
                <input id="estimate-phone" className={inputClass} value={contactPhone} maxLength={22} autoComplete="tel" type="tel" dir="ltr" required onChange={(event) => setContactPhone(event.target.value)} placeholder="+963 ..." />
              </label>
              <label htmlFor="estimate-car" className="block text-[11px] font-bold text-zinc-300">طراز السيارة
                <input id="estimate-car" className={inputClass} value={carModel} maxLength={100} required onChange={(event) => setCarModel(event.target.value)} placeholder="مثلاً BYD Song Plus" />
              </label>
              <label htmlFor="estimate-date" className="block text-[11px] font-bold text-zinc-300">موعد مفضل (اختياري)
                <span className="relative block"><CalendarDays className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-zinc-600" /><input id="estimate-date" className={`${inputClass} pl-11`} value={preferredDate} min={today()} type="date" onChange={(event) => setPreferredDate(event.target.value)} /></span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[.07] bg-white/[.02] p-3 text-[10px] leading-6 text-zinc-500">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-rose-500" />
                <span>أوافق على مشاركة البيانات التي أدخلتها مع Auto Renew عبر واتساب لغرض طلب الاستشارة.</span>
              </label>

              <Button type="submit" size="lg" variant="danger" className="mt-2 w-full" disabled={!destinationReady}>
                <MessageCircle className="size-4" /> تأكيد الطلب عبر واتساب <ArrowUpLeft className="size-4" />
              </Button>
            </form>

            {!destinationReady && <p role="status" className="relative mt-3 text-[10px] leading-6 text-amber-300">فعّل رقم المركز في متغير البيئة NEXT_PUBLIC_WHATSAPP_NUMBER لتفعيل زر واتساب.</p>}
            {notice && <p role="status" className="relative mt-3 rounded-xl border border-white/8 bg-white/[.025] p-3 text-[10px] leading-6 text-zinc-300">{notice}</p>}
          </Card>
        </div>
      </div>
    </section>
  );
}
