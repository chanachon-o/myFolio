"use client";

import { motion } from "framer-motion";
import { Layers, Code, Terminal, GitBranch } from "lucide-react";
import { Translation } from "@/lib/translations";

const ICONS: Record<string, React.ElementType> = {
  "AI / Machine Learning": Layers,
  "Backend Development": Code,
  "DevOps & Deployment": Terminal,
  "Development Tools": GitBranch,
};

export default function Skills({ t }: { t: Translation }) {
  return (
    <section id="skills" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.skills.title}
          </h2>
          <p className="text-lg text-muted max-w-[560px] mx-auto">
            {t.skills.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.skills.categories.map((category) => {
            const Icon = ICONS[category.name] || Code;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-panel p-6 sm:p-8 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {category.items.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 }}
                      className="px-4 py-2.5 rounded-xl border border-border bg-panel text-sm font-medium text-gray-300 transition-all hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <p className="text-xs text-muted uppercase tracking-widest">
            เครื่องมือที่ใช้ในโครงการจริง · Tools used in real projects
          </p>
        </div>
      </div>
    </section>
  );
}
