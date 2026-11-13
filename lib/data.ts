import { translations } from "./translations";

type T = typeof translations;
type Lang = keyof T;

export function useData(lang: Lang) {
  return translations[lang];
}

export type { Lang };
