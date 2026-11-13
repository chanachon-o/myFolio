import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-emerald-500/10 p-4 mb-6 inline-block">
        <AlertCircle className="w-16 h-16 text-emerald-400 mx-auto" />
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-3 tracking-tight">
        หน้าไม่พบ
      </h1>
      <p className="text-lg text-muted mb-8 max-w-md">
        หน้าที่คุณกำลังหาไม่มีอยู่หรือถูกย้ายไปแล้ว กลับสู่หน้าแรกเพื่อดูผลงานทั้งหมด
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก
      </Link>
    </section>
  );
}
