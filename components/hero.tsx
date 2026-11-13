"use client";

import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon, Mail, Play, Download, Phone } from "lucide-react";
import { translations, type Translation } from "@/lib/translations";
import { useLang } from "./providers";
import HeroBackground from "./hero-background";

type Social = { label: string; href: string; icon: React.ElementType };

const SOCIALS: Social[] = [
  { label: "Website", href: "/", icon: LinkIcon },
  { label: "Email", href: "mailto:oranchanachon@email.com", icon: Mail },
];

export default function Hero() {
  const { lang } = useLang();
  const t: Translation = translations[lang];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 py-24 sm:py-32">
        <div className="flex-1 max-w-[620px] order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-400">
            AI &amp; Computer Vision Developer
          </div>
          <h1
            id="hero-heading"
            className="mt-4 text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            ชนะชนม์ โอราญ{" "}
            <span className="block text-emerald-400">(อาร์ท)</span>
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-medium text-emerald-100/90">
            {t.hero.status}
          </p>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted max-w-[480px] mx-auto lg:mx-0">
            {t.hero.tagline}
          </p>
          <p className="mt-4 text-sm sm:text-base text-muted max-w-[460px] mx-auto lg:mx-0 italic">
            “{t.hero.intro}”
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start lg:mx-0">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {t.hero.viewProjects}
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3 text-sm font-semibold text-foreground hover:bg-panel transition-all"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t.hero.downloadResume}
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3 text-sm font-semibold text-foreground hover:bg-panel transition-all"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {t.hero.contactMe}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start lg:mx-0">
            <span className="text-xs text-muted">Connect</span>
            <div className="flex gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-panel border border-border text-foreground hover:bg-emerald-500 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col items-center gap-6 w-full lg:w-[420px]">
          <div className="relative w-full max-w-[360px] aspect-square rounded-full overflow-hidden border-2 border-emerald-500/40 bg-panel shadow-2xl shadow-emerald-900/20">
            <HeroBackground />
            <Image
              src="/wawa.jpg"
              alt="โปรไฟล์ของ ชนะชนม์ โอราญ (อาร์ท) AI & Computer Vision Developer"
              width={600}
              height={600}
              priority
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">
                Profile Photo
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted text-center w-full max-w-xs">
            AI &amp; Computer Vision Developer · Roi Et, Thailand
          </p>
        </div>
      </div>
    </section>
  );
}
