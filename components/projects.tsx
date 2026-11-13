"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Maximize,
  X,
  Image as ImageIcon,
  PlayCircle,
  GitBranch,
  Terminal,
  Code,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Translation } from "@/lib/translations";

type Project = {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly type: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  highlight?: string;
  highlightValue?: string;
  highlightValue2?: string;
  workflow?: readonly string[];
  tech?: readonly string[];
  images?: number;
  labeled?: number;
  accuracyBefore?: string;
  accuracyAfter?: string;
  branches?: number;
};

export default function Projects({
  items,
  t,
  lang,
}: {
  items: readonly Project[];
  t: Translation;
  lang: "th" | "en";
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const openModal = (id: string) => setOpenId(id);
  const closeModal = () => setOpenId(null);

  return (
    <>
      <section id="projects" className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {t.projects.title}
            </h2>
            <p className="text-lg text-gray-400 max-w-[600px] mx-auto">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOpen={openId === project.id}
                viewDetails={t.common.viewDetails}
                onClick={() => openModal(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openId && (
          <ProjectModal
            project={items.find((p) => p.id === openId)!}
            lang={lang}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  isOpen,
  viewDetails,
  onClick,
}: {
  project: Project;
  isOpen: boolean;
  viewDetails: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`card-${project.id}`}
      initial={false}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative rounded-3xl border border-border bg-panel p-6 overflow-hidden cursor-pointer transition-all",
        isOpen && "ring-2 ring-emerald-500",
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-6 left-6 z-10 w-8 h-8 rounded-full bg-background flex items-center justify-center text-emerald-500 font-bold text-xs shadow-lg">
        {project.number}
      </div>

      <div className="h-48 rounded-2xl overflow-hidden border border-border mb-5 bg-panel relative">
        <ProjectThumbnail project={project} />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize className="w-10 h-10 text-white drop-shadow-lg" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-emerald-400 font-medium mb-3">{project.type}</p>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech?.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 rounded-lg border border-border bg-panel text-xs font-medium text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          {viewDetails}
        </span>
        <Eye className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
      </div>
    </motion.div>
  );
}

function ProjectThumbnail({ project }: { project: Project }) {
  // Deterministic placeholder visuals derived from project id — no fabricated photos.
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500/60 font-mono text-sm relative overflow-hidden bg-[radial-gradient(circle_at_center,#10b9811a,transparent)]">
      <ImageIcon className="w-16 h-16 mb-3 opacity-50" />
      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-muted">{project.title}</span>
        <span className="text-xs text-muted">{project.type}</span>
      </div>
    </div>
  );
}

const MODAL_LABELS = {
  th: {
    capabilities: "ความสามารถของระบบ",
    tech: "เทคโนโลยีที่ใช้",
    workflow: "Workflow การทำงาน",
    images: "จำนวนรูปภาพใน Dataset",
    branches: "สาขาที่ติดตั้งระบบ",
    labeled: "รูปที่ Label แล้ว",
    accuracy: "ความถูกต้องของโมเดล",
    viewDetails: "ดูรายละเอียด",
  },
  en: {
    capabilities: "System Capabilities",
    tech: "Tech Stack",
    workflow: "Workflow",
    images: "Dataset Images",
    branches: "Branches Installed",
    labeled: "Labeled Images",
    accuracy: "Model Accuracy",
    viewDetails: "View Details",
  },
} as const;

function ProjectModal({
  project,
  lang,
  onClose,
}: {
  project: Project;
  lang: "th" | "en";
  onClose: () => void;
}) {
  const l = MODAL_LABELS[lang];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 sm:p-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl border border-border bg-panel shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-panel flex items-center justify-center text-white hover:bg-border transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-64 sm:h-80 bg-gray-900/40">
          <ProjectThumbnail project={project} />
        </div>

        <div className="p-8 sm:p-12 overflow-y-auto">
          <div className="flex items-start gap-3 mb-2">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-sm">
              {project.number}
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <p className="text-emerald-400 font-medium">{project.type}</p>
            </div>
          </div>

          <p className="text-muted leading-relaxed mb-8">{project.description}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" /> {l.capabilities}
              </h3>
              <ul className="space-y-3 text-muted text-sm">
                {project.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-emerald-500 rounded-full mt-[0.35rem]" />
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> {l.tech}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-xs font-semibold text-emerald-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {project.highlight && (
            <div className="relative rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-8 mb-10">
              <div className="absolute -top-3 left-8 flex items-center gap-1">
                <span className="text-emerald-400 font-bold text-xs">Highlight</span>
              </div>
              <div className="text-5xl sm:text-6xl font-black text-emerald-400 mb-1">
                {project.highlightValue}
              </div>
              <p className="text-emerald-200/90 font-medium">{project.highlight}</p>
              {project.highlightValue2 && (
                <p className="mt-2 text-3xl font-black text-emerald-400">
                  {project.highlightValue2}
                </p>
              )}
            </div>
          )}

          {project.workflow && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-emerald-400" /> {l.workflow}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {project.workflow?.map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="px-3 py-1.5 rounded-lg border border-border bg-panel text-gray-300 font-medium">
                      {step}
                    </span>
                    {idx < (project.workflow?.length ?? 0) - 1 && (
                      <Arrow className="w-4 h-4 text-muted" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {(project.images || project.branches) && (
            <div className="grid grid-cols-2 gap-4 mb-10">
              {project.images && (
                <StatCard
                  label={l.images}
                  value={`${project.images}+`}
                  icon={<ImageIcon className="w-5 h-5 text-emerald-400" />}
                />
              )}
              {project.branches && (
                <StatCard
                  label={l.branches}
                  value={project.branches}
                  icon={<Terminal className="w-5 h-5 text-emerald-400" />}
                />
              )}
            </div>
          )}

          {project.labeled && project.accuracyBefore && project.accuracyAfter && (
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                label={l.labeled}
                value={project.labeled}
                icon={<Code className="w-5 h-5 text-emerald-400" />}
              />
              <StatCard
                label={l.accuracy}
                value={`${project.accuracyBefore} → ${project.accuracyAfter}`}
                icon={<GitBranch className="w-5 h-5 text-emerald-400" />}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-emerald-400">{icon}</span>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-3xl font-black text-white">{value}</div>
    </div>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2L16 8H10V18H8V8H4L10 2Z"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}


