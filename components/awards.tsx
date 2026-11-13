"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Translation } from "@/lib/translations";

const ICONS: Record<string, React.ElementType> = {
  default: Award,
};

export default function Awards({ t }: { t: Translation }) {
  return (
    <section id="awards" className="relative py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.08),transparent)] -z-10" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.awards.title}
          </h2>
          <p className="text-lg text-muted max-w-[560px] mx-auto">
            {t.awards.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.awards.items.map((award) => {
            const Icon = ICONS.default;
            return (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-border bg-panel p-8 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mt-8 mb-3">
                  {award.name}
                </h3>
                <p className="text-emerald-400 text-sm font-medium mb-3">{award.event}</p>
                <p className="text-muted text-sm leading-relaxed">{award.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
