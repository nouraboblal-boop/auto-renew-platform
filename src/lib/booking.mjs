import { SERVICES, PACKAGES, VEHICLES, estimateCost, money } from "./catalog.mjs";

export function normalizeWhatsAppNumber(raw) {
  const number = String(raw ?? "").replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  return number;
}

const itemName = (items, id) => items.find((item) => item.id === id)?.name ?? "غير محدد";

export function buildBookingMessage({ name, contactPhone, carModel, preferredDate, serviceId, packageId, vehicleId }) {
  const price = estimateCost({ serviceId, packageId, vehicleId });
  return [
    "مرحباً Auto Renew، أرغب بتأكيد طلب استشارة لسيارتي.",
    "",
    `الاسم: ${name.trim()}`,
    `هاتف العميل: ${contactPhone.trim()}`,
    `السيارة: ${carModel.trim()}`,
    `الخدمة: ${itemName(SERVICES, serviceId)}`,
    `الباقة: ${itemName(PACKAGES, packageId)}`,
    `فئة السيارة: ${itemName(VEHICLES, vehicleId)}`,
    `التاريخ المفضل: ${preferredDate || "يتم التنسيق"}`,
    `التقدير التجريبي: ${money(price)} USD`,
    "",
    "أفهم أن السعر تقديري، وأن الموعد لا يتأكد إلا بعد رد المركز والفحص الفعلي."
  ].join("\n");
}

export function buildWhatsAppUrl(number, message) {
  const validated = normalizeWhatsAppNumber(number);
  if (!validated) return null;
  return `https://wa.me/${validated}?text=${encodeURIComponent(message)}`;
}

export function isContactPhoneValid(value) {
  return /^[+\d\s()\-]{7,22}$/.test(value.trim()) && (value.match(/\d/g) ?? []).length >= 7;
}
