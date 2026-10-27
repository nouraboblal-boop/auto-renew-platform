// Illustrative prices only. NOT official Auto Renew quotes.
export const SERVICES = [
  { id: "ppf", no: "01", eyebrow: "PAINT PROTECTION", name: "أفلام الحماية PPF", description: "تغطيات حماية شفافة للطلاء بحسب نطاق العمل المختار.", basePrice: 550, icon: "shield" },
  { id: "vinyl", no: "02", eyebrow: "COLOR VINYL", name: "الفينيل والتجليد", description: "تغيير المظهر الخارجي بخيارات لونية وتشطيبات متعددة.", basePrice: 480, icon: "layers" },
  { id: "ceramic", no: "03", eyebrow: "NANO CERAMIC", name: "النانو سيراميك", description: "طبقات حماية سطحية ولمعان وفق المنتج وخطة التطبيق.", basePrice: 240, icon: "sparkles" },
  { id: "ev", no: "04", eyebrow: "EV DIAGNOSTICS", name: "فحص وبرمجة EV", description: "فحص بيانات البطارية ووحدات التحكم والأنظمة المدعومة.", basePrice: 90, icon: "bolt" },
  { id: "dilink", no: "05", eyebrow: "BYD / DILINK", name: "تعريب وأنظمة DiLink", description: "تهيئة وتعريب وتخصيص الأنظمة المدعومة بعد فحص الإصدار.", basePrice: 65, icon: "screen" }
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
