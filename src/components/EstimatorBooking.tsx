"use client";

import { useMemo, useState, type FormEvent } from "react";
import { SERVICES, PACKAGES, VEHICLES, estimateCost, money } from "@/lib/catalog.mjs";
import { buildBookingMessage, buildWhatsAppUrl, isContactPhoneValid } from "@/lib/booking.mjs";
import { SectionHeading } from "./SectionHeading";
import { ArrowIcon } from "./ArrowIcon";

interface Selection { serviceId: string; packageId: string; vehicleId: string }
interface BookingFields { name: string; contactPhone: string; carModel: string; preferredDate: string }
const INITIAL_SELECTION: Selection = { serviceId: "ppf", packageId: "essential", vehicleId: "sedan" };
const INITIAL_FIELDS: BookingFields = { name: "", contactPhone: "", carModel: "", preferredDate: "" };
const DESTINATION = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

function ChoiceGroup({ title, options, value, onChange }: { title: string; options: Array<{ id: string; name: string }>; value: string; onChange: (id: string) => void }) {
  return <fieldset className="mt-8"><legend className="text-[12px] font-bold text-zinc-200">{title}</legend><div className="mt-3 flex flex-wrap gap-2">{options.map(option => <button key={option.id} type="button" onClick={() => onChange(option.id)} aria-pressed={value === option.id} className={`min-h-11 border px-4 py-2 text-[12px] font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${value === option.id ? "border-rose-500 bg-rose-500/15 text-white" : "border-white/10 bg-[#1e2026] text-zinc-400 hover:border-white/35 hover:text-white"}`}>{option.name}{value === option.id && <span className="mr-2 text-rose-400" aria-hidden="true">✓</span>}</button>)}</div></fieldset>;
}
function PanelHeader({ step, title, number }: { step: string; title: string; number: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><p className="font-display text-[9px] font-bold tracking-[.18em] text-rose-400" dir="ltr">{step}</p><h3 className="mt-2 text-2xl font-extrabold text-white">{title}</h3></div><span className="font-display text-4xl font-black text-white/10" aria-hidden="true">{number}</span></div>;
}
function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function EstimatorBooking() {
  const [selection, setSelection] = useState<Selection>(INITIAL_SELECTION);
  const [fields, setFields] = useState<BookingFields>(INITIAL_FIELDS);
  const [consent, setConsent] = useState(false);
  const [notice, setNotice] = useState("");
  const price = useMemo(() => estimateCost(selection), [selection]);
  const chosenService = SERVICES.find(item => item.id === selection.serviceId)?.name ?? "";
  const chosenPackage = PACKAGES.find(item => item.id === selection.packageId)?.name ?? "";
  const destinationReady = Boolean(buildWhatsAppUrl(DESTINATION, "test"));

  function updateSelection(key: keyof Selection, value: string) {
    setSelection(previous => ({ ...previous, [key]: value }));
    setNotice("");
  }
  function updateField(key: keyof BookingFields, value: string) {
    setFields(previous => ({ ...previous, [key]: value }));
    setNotice("");
  }
  function sendWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { name, contactPhone, carModel, preferredDate } = fields;
    if (!name.trim() || !carModel.trim() || !isContactPhoneValid(contactPhone)) {
      setNotice("تأكد من إدخال الاسم وطراز السيارة ورقم هاتف صحيح.");
      return;
    }
    if (!consent) {
      setNotice("يرجى الموافقة على مشاركة بيانات طلبك مع المركز عبر واتساب.");
      return;
    }
    if (preferredDate && preferredDate < localToday()) {
      setNotice("اختر تاريخاً حالياً أو مستقبلياً.");
      return;
    }
    const message = buildBookingMessage({ ...fields, ...selection });
    const url = buildWhatsAppUrl(DESTINATION, message);
    if (!url) {
      setNotice("لم يتم إعداد رقم واتساب الرسمي بعد. أضفه داخل NEXT_PUBLIC_WHATSAPP_NUMBER.");
      return;
    }
    // Open directly in the user-initiated submit event. WhatsApp still requires the user to press Send.
    const tab = window.open(url, "_blank", "noopener,noreferrer");
    if (!tab) {
      window.location.assign(url);
    } else {
      setNotice("تم فتح واتساب مع الرسالة الجاهزة. اضغط إرسال داخل واتساب لإتمام الطلب.");
    }
  }
  const inputStyle = "mt-2 block min-h-12 w-full rounded-none border border-white/15 bg-[#1e2026] px-4 py-3 text-[13px] text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-rose-500 focus-visible:ring-1 focus-visible:ring-rose-500";
  return <section id="estimate" className="section-pad bg-[#0b0d10]" aria-labelledby="estimate-title">
    <div className="container-ar"><div id="estimate-title"><SectionHeading eyebrow="YOUR CAR / YOUR PLAN / 02" first="خطوتك الأولى." accent="ابدأ بالتقدير." description="اختر خدمتك وباقتك، ثم أرسل طلب استشارة إلى واتساب المركز. الأسعار المعروضة أمثلة اختبارية وليست عروضاً رسمية." /></div>
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="border border-white/15 bg-[#15171c] p-6 sm:p-8"><PanelHeader step="STEP 01 / CONFIGURE" title="صمّم باقتك" number="01" />
          <ChoiceGroup title="01 — اختر الخدمة" options={SERVICES} value={selection.serviceId} onChange={value => updateSelection("serviceId", value)} />
          <ChoiceGroup title="02 — مستوى الباقة" options={PACKAGES} value={selection.packageId} onChange={value => updateSelection("packageId", value)} />
          <ChoiceGroup title="03 — فئة السيارة" options={VEHICLES} value={selection.vehicleId} onChange={value => updateSelection("vehicleId", value)} />
          <div aria-live="polite" aria-atomic="true" className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-white/15 bg-[#24262d] p-5"><div><p className="text-[12px] text-zinc-400">التقدير المبدئي</p><p className="mt-1 font-display text-4xl font-extrabold tracking-tight text-white" dir="ltr">{money(price)} <span className="text-sm font-medium text-zinc-400">USD*</span></p></div><span className="border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-[11px] font-bold text-rose-300">تجريبي فقط</span></div>
          <p className="mt-4 text-[11px] leading-7 text-zinc-500">* القيم تجريبية وليست أسعار Auto Renew المعتمدة. تختلف التكلفة النهائية بحسب الطراز وحالة السيارة والفحص الفعلي.</p>
        </div>
        <div className="border border-white/15 bg-[#15171c] p-6 sm:p-8"><PanelHeader step="STEP 02 / WHATSAPP REQUEST" title="احجز استشارتك" number="02" />
          <div className="mt-5 flex items-start gap-3 border border-rose-500/15 bg-rose-500/[.07] px-4 py-3 text-[12px] leading-7 text-zinc-200"><span className="text-rose-400" aria-hidden="true">✓</span><span>{chosenService} · {chosenPackage}</span></div>
          <form onSubmit={sendWhatsApp} className="mt-5 space-y-4">
            <label className="block text-[12px] font-bold text-zinc-200" htmlFor="contact-name">الاسم الكامل<input className={inputStyle} id="contact-name" name="name" autoComplete="name" maxLength={80} required placeholder="كيف نناديك؟" value={fields.name} onChange={event => updateField("name", event.target.value)} /></label>
            <label className="block text-[12px] font-bold text-zinc-200" htmlFor="contact-phone">رقم التواصل<input className={inputStyle} id="contact-phone" name="tel" type="tel" autoComplete="tel" dir="ltr" maxLength={22} required placeholder="مثلاً +963 9xx xxx xxx" value={fields.contactPhone} onChange={event => updateField("contactPhone", event.target.value)} /></label>
            <label className="block text-[12px] font-bold text-zinc-200" htmlFor="car-model">طراز السيارة<input className={inputStyle} id="car-model" name="car" maxLength={100} required placeholder="مثلاً BYD Song Plus" value={fields.carModel} onChange={event => updateField("carModel", event.target.value)} /></label>
            <label className="block text-[12px] font-bold text-zinc-200" htmlFor="preferred-date">الموعد المناسب (اختياري)<input className={`${inputStyle} scheme-dark`} id="preferred-date" name="date" type="date" min={localToday()} value={fields.preferredDate} onChange={event => updateField("preferredDate", event.target.value)} /></label>
            <label className="flex cursor-pointer items-start gap-3 pt-1 text-[11px] leading-6 text-zinc-400"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required className="mt-1 size-4 shrink-0 accent-rose-500" /><span>أوافق على نقل المعلومات التي أدخلتها إلى واتساب للتواصل مع Auto Renew بشأن الاستشارة.</span></label>
            <button disabled={!destinationReady} className="flex min-h-13 w-full items-center justify-center gap-3 bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300" type="submit">متابعة إلى واتساب <ArrowIcon /></button>
          </form>
          {!destinationReady && <p role="status" className="mt-3 text-[11px] leading-6 text-amber-300">رقم واتساب الرسمي غير مهيأ بعد. عند ضبط متغير البيئة سيتم تفعيل الزر تلقائياً.</p>}
          {notice && <p role="status" className="mt-3 border border-white/10 p-3 text-[11px] leading-6 text-zinc-200">{notice}</p>}
          <p className="mt-4 text-[11px] leading-7 text-zinc-500">النموذج يفتح محادثة واتساب برسالة مجهّزة؛ لا يتم إرسالها تلقائياً أو تأكيد الموعد قبل رد المركز.</p>
        </div>
      </div>
    </div>
  </section>;
}
