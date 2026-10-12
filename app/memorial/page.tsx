"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

export default function MemorialPage() {
  const t = useTranslations("Memorial");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("tributes")
        .insert([{ full_name: fullName, role, notes, status: "pending" }]);

      if (error) throw error;

      setSubmitted(true);
      setFullName("");
      setRole("");
      setNotes("");

      setTimeout(() => {
        setSubmitted(false);
        setIsModalOpen(false);
      }, 3500);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || t("modal.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0e0e] text-white selection:bg-[#D97706] selection:text-black py-10 px-6 relative">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D97706] px-4 py-1.5 rounded-full border border-[#D97706]/40 bg-[#D97706]/10 inline-block mb-4 shadow-[0_0_25px_rgba(217,119,6,0.18)]">
            {t("badge")}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
            {t("titleA")} <br />
            <span className="italic text-[#D97706]">{t("titleB")}</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-mono tracking-wider max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Main Narrative Content Container */}
      <div className="max-w-4xl mx-auto space-y-12 text-gray-300 font-light text-sm md:text-base leading-relaxed">
        {/* Introduction */}
        <section className="bg-gradient-to-b from-[#161514] to-[#12100e] border border-[#D97706]/30 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/50 to-transparent"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 text-[#D97706]">
            {t("intro.title")}
          </h2>
          <p className="mb-4">{t("intro.p1")}</p>
          <p className="italic text-gray-400 border-l-2 border-[#D97706] pl-4 my-4">
            {t("intro.quote")}
          </p>
        </section>

        {/* The Life We Had & Wealth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#141210] border border-[#D97706]/30 hover:border-[#D97706]/60 transition-all rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-lg font-serif font-bold mb-3 text-[#D97706]">
                {t("commerce.title")}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                {t("commerce.p1")}
              </p>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {t("commerce.p2")}
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#D97706]/80 mt-6 uppercase tracking-widest">
              {t("commerce.tag")}
            </span>
          </div>

          <div className="bg-[#141210] border border-[#D97706]/30 hover:border-[#D97706]/60 transition-all rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-lg font-serif font-bold mb-3 text-[#D97706]">
                {t("upheaval.title")}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                {t("upheaval.p1")}
              </p>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                {t("upheaval.p2")}
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#D97706]/80 mt-6 uppercase tracking-widest">
              {t("upheaval.tag")}
            </span>
          </div>
        </div>

        {/* The Years of the Red Terror */}
        <section className="bg-gradient-to-b from-[#161514] to-[#12100e] border border-[#D97706]/30 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/50 to-transparent"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 text-[#D97706]">
            {t("terror.title")}
          </h2>
          <p className="mb-4 text-xs md:text-sm leading-relaxed">{t("terror.p1")}</p>
          <p className="mb-4 text-xs md:text-sm leading-relaxed">{t("terror.p2")}</p>
          <p className="text-xs md:text-sm text-gray-400 italic">{t("terror.p3")}</p>
        </section>

        {/* Two Wounds & The Shattering of Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#141210] border border-[#D97706]/30 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-lg font-serif font-bold mb-3 text-[#D97706]">
              {t("wounds.title")}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{t("wounds.p1")}</p>
          </div>

          <div className="bg-[#141210] border border-[#D97706]/30 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-lg font-serif font-bold mb-3 text-[#D97706]">
              {t("identity.title")}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{t("identity.p1")}</p>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed mt-3">
              {t("identity.p2")}
            </p>
          </div>
        </div>

        {/* Words of Remembrance */}
        <section className="bg-[#141210] border border-[#D97706]/40 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D97706]/15 via-transparent to-transparent pointer-events-none"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 text-[#D97706]">
            {t("remembrance.title")}
          </h2>
          <div className="space-y-3 font-serif italic text-base md:text-lg text-gray-200 mb-8">
            <p>{t("remembrance.q1")}</p>
            <p>{t("remembrance.q2")}</p>
            <p>{t("remembrance.q3")}</p>
          </div>
          <div className="text-xs md:text-sm text-gray-400 font-mono space-y-1">
            <p>{t("remembrance.d1")}</p>
            <p>{t("remembrance.d2")}</p>
          </div>
        </section>
      </div>

      {/* Tribute Submission Banner */}
      <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-b from-[#161514] to-[#12100e] border border-[#D97706]/40 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D97706]/10 via-transparent to-transparent pointer-events-none"></div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 relative z-10">
          {t("banner.title")}
        </h2>
        <p className="text-gray-300 text-xs md:text-sm font-light max-w-xl mx-auto mb-8 relative z-10">
          {t("banner.text")}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block px-8 py-3.5 bg-[#D97706] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-transparent hover:text-[#D97706] hover:border-[#D97706] border border-transparent transition-all shadow-[0_0_25px_rgba(217,119,6,0.3)] relative z-10 cursor-pointer"
        >
          {t("banner.button")}
        </button>
      </div>

      {/* FOOTER NAV RETURN */}
      <footer className="mt-28 text-center pt-10 border-t border-[#222]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-xs font-mono tracking-widest uppercase border border-[#D97706]/40 bg-[#141210] hover:bg-[#D97706] hover:text-black hover:border-[#D97706] transition-all duration-300 cursor-pointer no-underline shadow-lg"
        >
          <span>←</span> {t("back")}
        </Link>
      </footer>

      {/* Interactive Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141210] border border-[#D97706]/50 rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label={t("modal.close")}
                className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-xl font-serif font-bold text-white mb-2">{t("modal.title")}</h3>
              <p className="text-xs text-gray-400 mb-6 font-light">{t("modal.intro")}</p>

              {submitted ? (
                <div className="bg-[#D97706]/15 border border-[#D97706]/50 rounded-xl p-6 text-center text-[#D97706] font-mono text-xs">
                  {t("modal.success")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-3 text-red-400 font-mono text-[11px]">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">
                      {t("modal.nameLabel")}
                    </label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("modal.namePlaceholder")}
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">
                      {t("modal.roleLabel")}
                    </label>
                    <input
                      required
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={t("modal.rolePlaceholder")}
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">
                      {t("modal.notesLabel")}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t("modal.notesPlaceholder")}
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/40 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#D97706] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#D97706] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-transparent hover:text-[#D97706] hover:border-[#D97706] border border-transparent transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {loading ? t("modal.submitting") : t("modal.submit")}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}