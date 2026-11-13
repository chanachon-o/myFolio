"use client";

import { motion } from "framer-motion";
import { Translation } from "@/lib/translations";

export default function Experience({ t }: { t: Translation }) {
  return (
    <section id="experience" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.experience.title}
          </h2>
          <p className="text-lg text-muted">
            ประสบการณ์ฝึกงานด้าน AI และ Computer Vision ในระบบ AS/RS จริง
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-panel p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400 font-bold text-lg">SI</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{t.experience.company}</h3>
              <p className="text-emerald-400 text-sm font-medium">{t.experience.department}</p>
              <p className="text-gray-400 text-sm mt-1">
                <span className="font-medium text-muted">ตำแหน่ง:</span>{" "}
                {t.experience.position}
              </p>
              <p className="text-gray-400 text-sm">
                <span className="font-medium text-muted">ระยะเวลา:</span>{" "}
                {t.experience.duration}
              </p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
            รายละเอียดงานที่รับผิดชอบ
          </h3>
          <ul className="space-y-4">
            {t.experience.details.map((detail: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-muted text-sm leading-relaxed">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-[0.35rem]" />
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              Computer Vision
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              REST API
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              IP Camera &amp; Network
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              Production Testing
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
