import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Renew | EV Diagnostics, DiLink & Premium Automotive Care",
  description: "Auto Renew — تشخيص وبرمجة السيارات الكهربائية، تعريب وتخصيص أنظمة BYD وDiLink، وحلول PPF والفينيل والنانو سيراميك.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Auto Renew — EV Diagnostics & Premium Automotive Care",
    description: "التقنية تلتقي بأدق التفاصيل. تشخيص EV، أنظمة BYD وDiLink، وحماية وعناية متقدمة.",
    locale: "ar_SY",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0C10",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className="antialiased">{children}</body></html>;
}
