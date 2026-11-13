"use client";

import { motion } from "framer-motion";
import { Translation } from "@/lib/translations";
import {
  Monitor,
  FileText,
  BarChart3,
  Layout,
  ShieldCheck,
  Link,
  Droplet,
  Camera,
  GitBranch,
  Toolbox,
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  "Computer Vision Development": Monitor,
  "Dataset Preparation & Annotation": FileText,
  "Model Training & Evaluation": BarChart3,
  "Business Logic Development": Layout,
  "Safety-first System Design": ShieldCheck,
  "REST API Development": Link,
  "Docker Deployment": Droplet,
  "IP Camera & Network Troubleshooting": Camera,
  "Git Version Control": GitBranch,
  "Production System Testing": Toolbox,
};

export default function Capabilities({ t }: { t: Translation }) {
  return (
    <section id="capabilities" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.capabilities.title}
          </h2>
          <p className="text-lg text-muted max-w-[560px] mx-auto">
            {t.capabilities.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {t.capabilities.items.map((capability: string, idx: number) => {
            const Icon = ICONS[capability] || Toolbox;
            return (
              <motion.div
                key={capability}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-2xl border border-border bg-panel p-6 flex flex-col items-center gap-3 shadow-lg group hover:border-emerald-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-white text-center leading-tight">
                  {capability}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
