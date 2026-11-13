"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
    >
      พิมพ์เป็น PDF
    </button>
  );
}
