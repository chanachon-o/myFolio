"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLang } from "./providers";

export default function BackToTop() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      onClick={scrollTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 hover:bg-emerald-400 cursor-pointer transition-all"
      aria-label={lang === "th" ? "กลับขึ้นด้านบน" : "Back to Top"}
    >
      <ArrowUp className="w-5 h-5" />
    </motion.div>
  );
}
