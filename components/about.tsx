"use client";

import { motion } from "framer-motion";

import { Translation } from "@/lib/translations";

export default function About({ t }: { t: Translation }) {
  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.08),transparent)] -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t.about.title}
          </h2>
          <p className="text-lg text-muted max-w-[560px] mx-auto italic">
            “สนใจเทคโนโลยี ชอบเรียนรู้ และพร้อมพัฒนาตัวเองเสมอ”
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl border border-border bg-panel shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">บทนำ</h3>
              <p className="text-muted leading-relaxed">
                {t.about.intro}
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-panel shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">ความสนใจเพิ่มเติม</h3>
              <p className="text-muted leading-relaxed">
                {t.about.interest}
              </p>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <div className="relative h-[300px] w-full rounded-2xl overflow-hidden border border-border bg-panel shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#10b98122,transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-1">AI &amp; Computer Vision</h3>
                <p className="text-sm text-emerald-200/90">
                  Dataset → Model Training → Business Logic → REST API → Production
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
