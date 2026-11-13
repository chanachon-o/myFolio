"use client";

import { motion } from "framer-motion";
import { Translation } from "@/lib/translations";

export default function Education({ t }: { t: Translation }) {
  return (
    <section id="education" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.education.title}
          </h2>
          <p className="text-lg text-muted">
            เส้นทางการศึกษาในสายเทคโนโลยีสารสนเทศตั้งแต่ระดับ ปวช. ถึง ปวส.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[24px] top-0 bottom-0 w-0.5 bg-emerald-500/30" />

          {t.education.items.map((item, idx) => {
            const isLast = idx === t.education.items.length - 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative mb-14 pl-14"
              >
                <div className="absolute left-[19px] top-2 w-6 h-6 rounded-full border-2 border-emerald-500 bg-background flex items-center justify-center text-emerald-500 font-bold text-xs shadow-lg ring-4 ring-background">
                  {idx + 1}
                </div>

                <div className="rounded-2xl border border-border bg-panel p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                      <p className="text-emerald-400 text-sm font-medium">{item.field}</p>
                    </div>
                    {"gpa" in item && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        {"gpa" in item ? item.gpa : ""}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    <span className="font-medium text-muted">สถาบัน:</span>{" "}
                    {item.school}
                  </p>
                  {"status" in item && item.status && (
                    <p className="text-gray-400 text-sm">
                      <span className="font-medium text-muted">สถานะ:</span>{" "}
                      {item.status}
                    </p>
                  )}
                </div>

                {!isLast && (
                  <div className="absolute left-[17px] top-12 bottom-[-60px] w-0.5 bg-emerald-500/20" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
