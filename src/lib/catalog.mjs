// Illustrative prices only. NOT official Auto Renew quotes.
export const SERVICES = [
  { id: "ppf", no: "01", eyebrow: "PAINT PROTECTION", name: "أفلام الحماية PPF", description: "طبقات حماية شفافة لطلاء السيارة، مع خيارات لتغطية المناطق الأكثر عرضة للاحتكاك والخدوش.", basePrice: 550, icon: "shield" },
  { id: "vinyl", no: "02", eyebrow: "VINYL & WRAP", name: "الفينيل والتجليد", description: "ألوان وتشطيبات تمنح سيارتك شخصية جديدة، بعناية دقيقة عند الزوايا والحواف.", basePrice: 480, icon: "layers" },
  { id: "ev", no: "03", eyebrow: "EV DIAGNOSTICS", name: "فحص وبرمجة EV", description: "فحص الحواسيب وأنظمة وبطاريات السيارات الكهربائية ضمن نطاق الأجهزة والخدمات المتاحة.", basePrice: 90, icon: "bolt" },
  { id: "dilink", no: "04", eyebrow: "SMART SYSTEMS", name: "أنظمة DiLink والشاشات", description: "تعريب وتهيئة شاشات وأنظمة المركبات المتوافقة بعد التحقق من الطراز والإصدار.", basePrice: 65, icon: "screen" }
];
export const PACKAGES = [
  { id: "essential", name: "أساسي", multiplier: 1 },
  { id: "plus", name: "متقدم", multiplier: 1.35 },
  { id: "signature", name: "Signature", multiplier: 1.7 }
];
export const VEHICLES = [
  { id: "sedan", name: "سيدان", multiplier: 1 },
  { id: "suv", name: "SUV / كروس أوفر", multiplier: 1.2 },
  { id: "large", name: "سيارة كبيرة", multiplier: 1.35 }
];

export function estimateCost({ serviceId, packageId, vehicleId }) {
  const service = SERVICES.find((item) => item.id === serviceId);
  const pack = PACKAGES.find((item) => item.id === packageId);
  const vehicle = VEHICLES.find((item) => item.id === vehicleId);
  if (!service || !pack || !vehicle) throw new Error("Invalid estimator configuration");
  return Math.round((service.basePrice * pack.multiplier * vehicle.multiplier) / 5) * 5;
}
export const money = (value) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
