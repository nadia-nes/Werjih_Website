"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function MemorialPage() {
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
      setErrorMessage(error.message || "Failed to submit tribute. Please try again.");
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
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D97706] px-4 py-1.5 rounded-full border border-[#D97706]/30 bg-[#D97706]/5 inline-block mb-4 shadow-[0_0_25px_rgba(217,119,6,0.18)]">
            In Memoriam
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight mb-4">
            The Werji Sons and Daughters <br />
            <span className="italic text-[#D97706]">of the Derg Era</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-sm font-mono tracking-wider max-w-2xl mx-auto">
            A chronicle of prosperity, sudden devastation, unyielding grief, and the sacred fight to reclaim our identity.
          </p>
        </motion.div>
      </div>

      {/* Main Narrative Content Container */}
      <div className="max-w-4xl mx-auto space-y-12 text-gray-300 font-light text-sm md:text-base leading-relaxed">
        
        {/* Introduction */}
        <section className="bg-gradient-to-b from-[#161514] to-[#0f0e0d] border border-[#D97706]/30 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/40 to-transparent"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-[#D97706]">
            Introduction: Beyond Numbers, Into Memory
          </h2>
          <p className="mb-4">
            This section is written in solemn memory of the children of the Werji community who lost their lives during the dark years of the Derg regime. It is not a clinical table of numbers or dry statistics. It is the living story of families, bright dreams, relentless hard work, and unshakeable hopes for tomorrow.
          </p>
          <p className="italic text-gray-400 border-l-2 border-[#D97706] pl-4 my-4">
            &ldquo;We remember their names, we tell their stories, and we pass their memory on like a flame through the dark to the generations to come.&rdquo;
          </p>
        </section>

        {/* The Life We Had & Wealth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#141210] border border-[#D97706]/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-3 text-[#D97706]">
                The Pillars of Commerce and Community
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                For generations, the Werjihs were deeply woven into the economic fabric of the region. Historically renowned as master traders, merchants, and pastoralist networks, major households among the community held prominent positions in the lucrative coffee trade, export markets, urban real estate development, and land stewardship.
              </p>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                From this honest sweat came the lifeblood of our society: they fed families, built schools, supported mosques, and sustained neighbors in need. Their wealth was never just gold or grain; it was the fruit of patience, culture, language, dress, and a proud way of life.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#D97706]/60 mt-6 uppercase tracking-widest">Heritage & Prosperity</span>
          </div>

          <div className="bg-[#141210] border border-[#D97706]/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-white mb-3 text-[#D97706]">
                The Midnight of Upheaval (1966 E.C.)
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                When the imperial system fell in 1966 E.C., the country pivoted into a fierce ideological storm. For the Werji community, the blow was catastrophic. Sweeping state proclamations nationalized the coffee export trade, seized properties, and confiscated family homes by decree.
              </p>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                In a single day, by the stroke of a pen, the accumulated sweat and labor of generations vanished. Families who once stood in security and civic prominence were cast overnight into suspicion, poverty, and profound anxiety.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#D97706]/60 mt-6 uppercase tracking-widest">The Sudden Loss</span>
          </div>
        </div>

        {/* The Years of the Red Terror */}
        <section className="bg-gradient-to-b from-[#161514] to-[#0f0e0d] border border-[#D97706]/30 rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D97706]/40 to-transparent"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 text-[#D97706]">
            The Red Terror and the Silence of Grief (1969 E.C.)
          </h2>
          <p className="mb-4 text-xs md:text-sm leading-relaxed">
            As students and youth rose in passionate protest in 1969 E.C., the Derg&apos;s state machinery retaliated with calculated, brutal terror. The brightest minds of the Werjih generation scholars, dreamers, and future leaders were snatched away.
          </p>
          <p className="mb-4 text-xs md:text-sm leading-relaxed">
            The cruelty was compounded by silence. Parents were forbidden from mourning openly. Many never discovered where their children were buried or how they drew their final breath. 
          </p>
          <p className="text-xs md:text-sm text-gray-400 italic">
            For years, mothers sat by heavy wooden doors at dusk, straining their eyes for the silhouette of a child who would never walk home again.
          </p>
        </section>

        {/* Two Wounds & The Shattering of Identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#141210] border border-[#D97706]/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-serif font-bold text-white mb-3 text-[#D97706]">
              Two Wounds: Wealth and Youth
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              The community bled from two fatal wounds simultaneously: the total erasure of its economic spine, and the slaughter of its youth. The true damage could never be calculated in currency. It was measured in broken lineages, lost leadership, and a vacuum of tomorrow. This shared national trauma passed quietly, heavily, from generation to generation in hushed whispers.
            </p>
          </div>

          <div className="bg-[#141210] border border-[#D97706]/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-serif font-bold text-white mb-3 text-[#D97706]">
              The Fracturing and Loss of Identity
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Perhaps the most insidious wound was the assault on our collective identity. Displaced, fractured, and hunted, surviving family members were forced into hiding or assimilation, terrified to speak their mother tongue, practice native customs, or wear traditional clothing openly. 
            </p>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed mt-3">
              Our history, oral traditions, and shared memory nearly faded into the shadows. This memorial stands as our fierce vow against that erasure: a sacred promise that our identity will never be extinguished.
            </p>
          </div>
        </div>

        {/* Words of Remembrance */}
        <section className="bg-[#141210] border border-[#D97706]/40 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D97706]/10 via-transparent to-transparent pointer-events-none"></div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6 text-[#D97706]">
            Words of Remembrance
          </h2>
          <div className="space-y-3 font-serif italic text-base md:text-lg text-gray-200 mb-8">
            <p>&ldquo;We remember your names.&rdquo;</p>
            <p>&ldquo;We carry your dreams.&rdquo;</p>
            <p>&ldquo;Your lives, cut short, continue through our work, our knowledge, and our kindness.&rdquo;</p>
          </div>
          <div className="text-xs md:text-sm text-gray-400 font-mono space-y-1">
            <p>May Allah have mercy on your souls and grant you Jannah.</p>
            <p>May He grant your families patience and peace.</p>
          </div>
        </section>

      </div>

      {/* Tribute Submission Banner */}
      <div className="max-w-4xl mx-auto mt-16 bg-[#141210] border border-[#D97706]/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D97706]/10 via-transparent to-transparent pointer-events-none"></div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 relative z-10">
          Want to Honor an Ancestor?
        </h2>
        <p className="text-gray-300 text-xs md:text-sm font-light max-w-xl mx-auto mb-8 relative z-10">
          Submit historical notes, photographs, or memorial entries to be included in our community registry.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block px-8 py-3.5 bg-[#D97706] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-transparent hover:text-[#D97706] hover:border-[#D97706] border border-transparent transition-all shadow-lg relative z-10 cursor-pointer"
        >
          Submit a Tribute &rarr;
        </button>
      </div>

      {/* Return to Home Page Boxed Button */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#141210] border border-[#D97706]/40 text-[#D97706] font-mono text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-[#D97706] hover:text-black transition-all shadow-md"
        >
          &larr; Return to Home Page
        </Link>
      </div>

      {/* Interactive Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141210] border border-[#D97706]/40 rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-sm cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-xl font-serif font-bold text-white mb-2">Submit an Ancestor&apos;s Tribute</h3>
              <p className="text-xs text-gray-400 mb-6 font-light">
                Share a memory, historical note, or name to preserve their legacy in our community archives.
              </p>

              {submitted ? (
                <div className="bg-[#D97706]/10 border border-[#D97706]/40 rounded-xl p-6 text-center text-[#D97706] font-mono text-xs">
                  Thank you. Your tribute has been securely saved to the Supabase registry for review.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-3 text-red-400 font-mono text-[11px]">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">Ancestor&apos;s Full Name</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Turio Wario"
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">Role or Historical Context</label>
                    <input
                      required
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Elder / Merchant / Student Lost in 1969 E.C."
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-300 mb-1">Historical Notes or Memory</label>
                    <textarea
                      required
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe their life, contributions, or story..."
                      className="w-full bg-[#0f0e0e] border border-[#D97706]/30 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-[#D97706] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#D97706] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-transparent hover:text-[#D97706] hover:border-[#D97706] border border-transparent transition-all shadow-lg cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {loading ? "Submitting to Registry..." : "Submit to Registry \u2192"}
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