"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft, CarFront, Check, MessageCircle, Sparkles } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SERVICES, PACKAGES, VEHICLES, estimateCost, money } from "@/lib/catalog.mjs";
import { buildBookingMessage, buildWhatsAppUrl, isContactPhoneValid } from "@/lib/booking.mjs";

const DESTINATION = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(item.id)}
              className={`relative min-h-12 rounded-xl border px-3 py-2 text-right text-[11px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 ${
                selected
                  ? "border-cyan-300/55 bg-cyan-300/[.09] text-cyan-50 shadow-[inset_0_0_20px_rgba(34,211,238,.05)]"
                  : "border-white/8 bg-white/[.025] text-zinc-500 hover:border-white/16 hover:text-zinc-200"
              }`}
            >
              {item.name}
              {selected && <Check className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-cyan-300" />}
            </button>
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

    const message = buildBookingMessage({
      name,
      contactPhone,
      carModel,
      preferredDate,
      serviceId,
      packageId,
      vehicleId
    });
    const url = buildWhatsAppUrl(DESTINATION, message);

    if (!url) {
      setNotice("رقم واتساب الرسمي غير مهيأ بعد في NEXT_PUBLIC_WHATSAPP_NUMBER.");
      return;
    }

    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) window.location.assign(url);
    else setNotice("تم تجهيز الطلب وفتح واتساب. اضغط إرسال داخل المحادثة لتأكيد التواصل.");
  }

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-[12px] text-white outline-none placeholder:text-zinc-700 transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-300/10";

  return (
    <section id="estimate" className="section-pad relative overflow-hidden bg-[#090b0f]" aria-labelledby="estimate-title">
      <div className="absolute right-[-12%] top-[20%] size-[420px] rounded-full bg-cyan-500/[.045] blur-[120px]" aria-hidden="true" />
      <div className="container-ar relative">
        <Reveal className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker" dir="ltr">INTERACTIVE ESTIMATOR</p>
            <h2 id="estimate-title" className="mt-4 text-[clamp(2.2rem,5vw,4.6rem)] font-black leading-[1.15] tracking-[-.04em] text-white">
              اختر. شاهد التقدير.
              <span className="block text-zinc-500">ثم أرسل الطلب مباشرة.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-8 text-zinc-500">الحاسبة تعطي تقديراً أولياً فقط. السعر النهائي مرتبط بالطراز والحالة والفحص الفعلي داخل المركز.</p>
        </Reveal>

        <div className="grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <Card className="beam-card relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/8 pb-5">
              <div>
                <p className="font-display text-[9px] font-bold tracking-[.16em] text-cyan-300" dir="ltr">01 / CONFIGURE</p>
                <h3 className="mt-2 text-xl font-extrabold text-white">إعداد الخدمة</h3>
              </div>
              <CarFront className="size-6 text-zinc-600" />
            </div>

            <div className="mt-6 space-y-7">
              <ChoiceGrid title="نوع الخدمة" items={SERVICES} value={serviceId} onChange={setServiceId} columns="grid-cols-1 sm:grid-cols-2" />
              <ChoiceGrid title="فئة السيارة" items={VEHICLES} value={vehicleId} onChange={setVehicleId} columns="grid-cols-1 sm:grid-cols-3" />
              <ChoiceGrid title="مستوى الباقة" items={PACKAGES} value={packageId} onChange={setPackageId} columns="grid-cols-1 sm:grid-cols-3" />
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-cyan-300/15 bg-[linear-gradient(135deg,rgba(34,211,238,.08),rgba(59,130,246,.025))] p-5">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-bold text-zinc-500">التقدير المبدئي</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.strong
                      key={price}
                      initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.22 }}
                      className="mt-2 block font-display text-4xl font-black tracking-tight text-white sm:text-5xl"
                      dir="ltr"
                    >
                      {money(price)} <span className="text-sm font-bold text-cyan-300">USD*</span>
                    </motion.strong>
                  </AnimatePresence>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[.06] px-3 py-1.5 text-[9px] font-bold text-cyan-200">تقدير فوري</span>
              </div>
              <div className="mt-5 grid gap-2 text-[10px] text-zinc-500 sm:grid-cols-3">
                <span>{service.name}</span><span>{vehicle.name}</span><span>{pack.name}</span>
              </div>
            </div>
            <p className="mt-3 text-[10px] leading-6 text-zinc-600">* الأرقام توضيحية وليست عرض سعر رسمي من Auto Renew.</p>
          </Card>

          <Card className="beam-card relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/55 to-transparent" />
            <div className="flex items-center justify-between border-b border-white/8 pb-5">
              <div>
                <p className="font-display text-[9px] font-bold tracking-[.16em] text-cyan-300" dir="ltr">02 / REQUEST</p>
                <h3 className="mt-2 text-xl font-extrabold text-white">تأكيد طلب الاستشارة</h3>
              </div>
              <MessageCircle className="size-6 text-zinc-600" />
            </div>

            <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-4">
              <p className="flex items-center gap-2 text-[11px] font-bold text-zinc-300"><Sparkles className="size-4 text-cyan-300" /> {service.name} · {vehicle.name} · {pack.name}</p>
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4">
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
                <input id="estimate-date" className={inputClass} value={preferredDate} min={today()} type="date" onChange={(event) => setPreferredDate(event.target.value)} />
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[.07] bg-white/[.02] p-3 text-[10px] leading-6 text-zinc-500">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-cyan-300" />
                <span>أوافق على مشاركة البيانات التي أدخلتها مع Auto Renew عبر واتساب لغرض طلب الاستشارة.</span>
              </label>

              <Button type="submit" size="lg" className="mt-2 w-full" disabled={!destinationReady}>
                <MessageCircle className="size-4" /> تأكيد الطلب عبر واتساب <ArrowUpLeft className="size-4" />
              </Button>
            </form>

            {!destinationReady && <p role="status" className="mt-3 text-[10px] leading-6 text-amber-300">فعّل رقم المركز في متغير البيئة NEXT_PUBLIC_WHATSAPP_NUMBER لتفعيل زر واتساب.</p>}
            {notice && <p role="status" className="mt-3 rounded-xl border border-white/8 bg-white/[.025] p-3 text-[10px] leading-6 text-zinc-300">{notice}</p>}
          </Card>
        </div>
      </div>
    </section>
  );
}
