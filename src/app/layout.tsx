import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Renew | حماية، برمجة وعناية متقدمة بالسيارات",
  description: "Auto Renew — مركز متخصص بحماية PPF، الفينيل والتجليد، فحص وبرمجة السيارات الكهربائية، وتعريب أنظمة DiLink.",
  robots: { index: true, follow: true },
  openGraph: { title: "Auto Renew — Automotive Studio", description: "سيارتك، بمستوى آخر. حماية وبرمجة وعناية متقدمة بالسيارات.", locale: "ar_SY", type: "website" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0b0e" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className="antialiased">{children}</body></html>;
}
