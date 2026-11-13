import type { Metadata, Viewport } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { ThemeProvider, LangProvider } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | ชนะชนม์ โอราญ (อาร์ท)",
    default: "AI & Computer Vision Developer Portfolio",
  },
  description:
    "Portfolio ของ ชนะชนม์ โอราญ (อาร์ท) AI & Computer Vision Developer — ประสบการณ์จริงตั้งแต่ Dataset, Model Training, REST API จนถึง Production Deployment. YOLO11-seg, PyTorch, FastAPI, Docker.",
  keywords: [
    "AI Engineer",
    "Computer Vision",
    "YOLO11",
    "PyTorch",
    "FastAPI",
    "Chanachon Oran",
    "ชนะชนม์ โอราญ",
    "อาร์ท",
    "ร้อยเอ็ด",
  ],
  authors: [{ name: "ชนะชนม์ โอราญ (อาร์ท)" }],
  openGraph: {
    title: "ชนะชนม์ โอราญ (อาร์ท) | AI & Computer Vision Developer",
    description:
      "Building Intelligent Vision Systems from Dataset to Production. Portfolio นักพัฒนาสาย AI & Computer Vision ประสบการณ์จริงจากโครงการตรวจสอบพาเลทและนับสินค้าอัตโนมัติ",
    type: "website",
    locale: "th_TH",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#003B2B" },
    { color: "#003B2B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${sarabun.variable} h-full antialiased dark`}
    >
      <head />
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
