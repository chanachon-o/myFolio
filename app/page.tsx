"use client";

import { useCallback, useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import { useLang, ThemeProvider, LangProvider } from "@/components/providers";
import { Nav } from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Capabilities from "@/components/capabilities";
import Awards from "@/components/awards";
import Contact from "@/components/contact";
import BackToTop from "@/components/back-to-top";

const SECTION_IDS: readonly string[] = [
  "hero",
  "about",
  "education",
  "experience",
  "projects",
  "skills",
  "capabilities",
  "awards",
  "contact",
];

export default function Home() {
  const { lang } = useLang();
  const t = translations[lang];
  const [activeId, setActiveId] = useState<string>("hero");

  const handleSectionChange = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleSectionChange, {
      root: null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0.05,
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [handleSectionChange]);

  return (
    <ThemeProvider>
      <LangProvider>
        <div className="flex flex-col min-h-full">
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-emerald-500 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none"
          >
            ข้ามไปยังเนื้อหาหลัก / Skip to content
          </a>

          <Nav activeId={activeId} />

          <main className="flex-1">
            <Hero />
            <About t={t} />
            <Education t={t} />
            <Experience t={t} />
            <Projects items={t.projects.items} t={t} lang={lang} />
            <Skills t={t} />
            <Capabilities t={t} />
            <Awards t={t} />
            <Contact t={t} />
          </main>

          <BackToTop />
        </div>
      </LangProvider>
    </ThemeProvider>
  );
}
