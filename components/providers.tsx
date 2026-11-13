"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type Lang = "th" | "en";

const THEME_STORAGE_KEY = "portfolio-theme";
const LANG_STORAGE_KEY = "portfolio-lang";

// ---------------------------------------------------------------------------
// Theme context
// ---------------------------------------------------------------------------

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolved: "dark" | "light";
} | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light" || stored === "system") {
      return stored;
    }
    return "system";
  });
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    const resolve = () => {
      const current =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;
      root.classList.toggle("dark", current === "dark");
      setResolved(current);
    };
    resolve();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", resolve);
    return () => mq.removeEventListener("change", resolve);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// ---------------------------------------------------------------------------
// Language context
// ---------------------------------------------------------------------------

const LangContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
} | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "th";
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "th" || stored === "en") return stored;
    return "th";
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    window.document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    window.document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
