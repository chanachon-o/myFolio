"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Layout,
  User,
  School,
  Briefcase,
  Folder,
  Cpu,
  Trophy,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./providers";
import { useLang } from "./providers";

const sectionItems: Array<{
  id: string;
  icon: LucideIcon;
  th: string;
  en: string;
}> = [
  { id: "hero", icon: Layout, th: "หน้าแรก", en: "Home" },
  { id: "about", icon: User, th: "เกี่ยวกับฉัน", en: "About" },
  { id: "education", icon: School, th: "การศึกษา", en: "Education" },
  { id: "experience", icon: Briefcase, th: "ประสบการณ์", en: "Experience" },
  { id: "projects", icon: Folder, th: "ผลงาน", en: "Projects" },
  { id: "skills", icon: Cpu, th: "ทักษะ", en: "Skills" },
  { id: "awards", icon: Trophy, th: "รางวัล", en: "Awards" },
  { id: "contact", icon: Mail, th: "ติดต่อ", en: "Contact" },
];

export function Nav({ activeId }: { activeId?: string }) {
  const { theme, setTheme, resolved } = useTheme();
  const { lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // handled by parent via data-active; we only observe for mobile highlight sync
          }
        });
      },
      { threshold: 0.25 },
    );
    sectionItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full border-b border-border dark:border-emerald-900/50 bg-background/80 backdrop-blur-md transition-colors"
      aria-label="หลักการนำทาง / Main navigation"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#hero"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
              AI
            </div>
            <span className="font-semibold tracking-tight text-foreground">
              ชนะชนม์ โอราญ <span className="text-xs text-emerald-500/70 dark:text-emerald-400">· อาร์ท</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {sectionItems.map((item) => {
              const active = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "text-foreground/70 hover:bg-accent hover:text-emerald-600 dark:hover:text-emerald-400",
                  )}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span>{lang === "th" ? item.th : item.en}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "th" ? "en" : "th")}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-accent hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              aria-label="เปลี่ยนภาษา / Change language"
              title={lang === "th" ? "English" : "ไทย"}
            >
              {lang === "th" ? "EN" : "TH"}
            </button>
            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-accent hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              aria-label="เปลี่ยนโหมดสี / Toggle theme"
              title={theme}
            >
              {resolved === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="sr-only">{theme}</span>
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-accent transition-colors"
              aria-label="เปิดเมนู / Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md dark:bg-black/90">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-6 py-10 sm:px-8">
            {sectionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-left rounded-xl text-lg font-medium transition-colors",
                  activeId === item.id
                    ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                    : "text-foreground/70 hover:bg-accent hover:text-emerald-600 dark:hover:text-emerald-400",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{lang === "th" ? item.th : item.en}</span>
              </button>
            ))}
            <div className="mt-6 pt-6 border-t border-border dark:border-emerald-900/50 flex gap-3">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-foreground hover:bg-accent"
              >
                {resolved === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>ธีม: {theme}</span>
              </button>
              <button
                onClick={() => setLang(lang === "th" ? "en" : "th")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-foreground hover:bg-accent"
              >
                ภาษา: {lang === "th" ? "EN" : "TH"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
