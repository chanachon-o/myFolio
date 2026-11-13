"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Translation } from "@/lib/translations";

type FormData = { name: string; email: string; subject: string; message: string };

export default function Contact({ t }: { t: Translation }) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) next.name = t.contact.form.required;
    if (!form.email.trim()) next.email = t.contact.form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t.contact.form.invalidEmail;
    if (!form.subject.trim()) next.subject = t.contact.form.required;
    if (!form.message.trim()) next.message = t.contact.form.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Simulate form submission (no backend endpoint configured per spec).
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.06),transparent)] -z-10" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Contact info */}
          <div
            className={cn(
              "col-span-1 md:col-span-4 space-y-6",
              status === "success" ? "opacity-30" : "",
            )}
          >
            {[
              {
                icon: Phone,
                label: t.contact.phone,
                value: t.contact.phoneValue,
                href: `tel:${t.contact.phoneValue}`,
              },
              {
                icon: Mail,
                label: t.contact.email,
                value: t.contact.emailValue,
                href: `mailto:${t.contact.emailValue}`,
              },
              {
                icon: MapPin,
                label: t.contact.location,
                value: t.contact.locationValue,
                href: "https://maps.google.com/?q=ร้อยเอ็ด,ประเทศไทย",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-2xl border border-border bg-panel p-5 sm:p-6 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-foreground font-medium">{item.value}</p>
                </div>
                <ArrowRight className="ml-auto w-4 h-4 text-muted group-hover:text-emerald-400 transition-colors" />
              </a>
            ))}
            <div className="flex gap-3">
              <a
                href="mailto:oranchanachon@email.com"
                className="flex-1 rounded-xl border border-border px-5 py-3 text-center font-semibold text-foreground hover:bg-panel transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" /> {t.contact.sendEmail}
              </a>
              <a
                href={`tel:${t.contact.phoneValue}`}
                className="flex-1 rounded-xl border border-border px-5 py-3 text-center font-semibold text-foreground hover:bg-panel transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" /> {t.contact.callMe}
              </a>
              <Link
                href="/resume"
                className="flex-1 rounded-xl bg-emerald-500 px-5 py-3 text-center font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
              >
                <DownloadIcon /> {t.contact.downloadResume}
              </Link>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={cn(
              "col-span-1 md:col-span-8",
              status === "success" ? "hidden" : "",
            )}
          >
            <div className="rounded-3xl border border-border bg-panel p-8 sm:p-12 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {t.contact.title}
                </h2>
                <p className="text-muted">{t.contact.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    label={t.contact.form.name}
                    id="name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                  />
                  <Field
                    label={t.contact.form.email}
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    label={t.contact.form.subject}
                    id="subject"
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                    error={errors.subject}
                  />
                  <Field
                    label={t.contact.form.message}
                    id="message"
                    as="textarea"
                    rows={4}
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    error={errors.message}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto rounded-xl bg-emerald-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {status === "sending" ? t.contact.form.sending : t.contact.form.send}
                </button>
              </form>
            </div>
          </div>

          {/* Success state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "col-span-1 md:col-span-8",
              status !== "success" ? "hidden" : "",
            )}
          >
            <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/5 p-8 sm:p-12 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {t.contact.form.success}
              </h3>
              <p className="text-emerald-200/90 mb-6">
                {t.contact.form.successDetail}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-panel transition-colors"
              >
                ส่งข้อความใหม่
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

type FieldProps = {
  label: string;
  id: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

function Field({ label, id, type = "text", as = "input", rows, value, onChange, error }: FieldProps) {
  const Component = as === "textarea" ? "textarea" : "input";
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      <Component
        id={id}
        type={type}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "block w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground placeholder-muted/50 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors",
          error
            ? "border-red-500/50 bg-red-500/5"
            : "border-border bg-panel focus:border-emerald-400",
        )}
        placeholder={label}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
