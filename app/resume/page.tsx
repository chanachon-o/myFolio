import Link from "next/link";
import { PrintButton } from "@/components/print-button";

export const metadata = {
  title: "เรซูเม่ | ชนะชนม์ โอราญ (อาร์ท)",
  description:
    "เรซูเม่ของ ชนะชนม์ โอราญ (อาร์ท) AI & Computer Vision Developer — ประสบการณ์ทำงาน ทักษะ การศึกษา และรางวัล",
};

export default function ResumePage() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <div className="rounded-full bg-emerald-500/10 p-4 mb-6 inline-block">
          <span className="text-emerald-400 font-bold text-xl">AI</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
          เรซูเม่ของ ชนะชนม์ โอราญ (อาร์ท)
        </h1>
        <p className="text-muted mb-6">
          AI & Computer Vision Developer · ร้อยเอ็ด ประเทศไทย ·{" "}
          <a href="mailto:oranchanachon@email.com" className="text-accent underline">
            oranchanachon@email.com
          </a>
        </p>
        <div className="bg-panel border border-border rounded-2xl p-8 sm:p-12 text-left shadow-xl mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6">📄</span> เรซูเม่ดาวน์โหลด
          </h2>
          <p className="text-muted mb-6">
            เอกสารเรซูเม่ในรูปแบบ PDF จะถูกจัดเตรียมเพื่อดาวน์โหลดในเร็ว ๆ นี้
            ระหว่างนี้ คุณสามารถดูประวัติโดยละเอียดได้ในหน้าแรกหมวดหมู่{" "}
            <strong>เกี่ยวกับฉัน</strong>,{" "}
            <strong>ประสบการณ์</strong> และ{" "}
            <strong>ผลงาน</strong>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-panel transition-colors"
            >
              กลับหน้าแรก
            </Link>
            <PrintButton />
          </div>
        </div>
        <p className="text-xs text-muted">
          เคล็ดลับ: กดปุ่ม “พิมพ์เป็น PDF” แล้วเลือก “บันทึกเป็น PDF”
        </p>
      </div>
    </section>
  );
}
