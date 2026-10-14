"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MusicHeritagePage() {
  const t = useTranslations("MusicHeritage");

  return (
    <main className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#e88d22] selection:text-white font-sans pt-28 md:pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-sm">{t("intro")}</p>
        </header>

        {/* Footer Navigation */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#121212] hover:bg-[#e88d22] hover:text-white hover:border-[#e88d22] transition-all"
          >
            <span>←</span> {t("back")}
          </Link>
        </footer>
      </div>
    </main>
  );
}