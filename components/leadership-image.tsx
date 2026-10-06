"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, useReducedMotion } from "framer-motion";
import { Shield } from "lucide-react";

type Leader = {
  id: string;
  name: string;
  image_url: string;
  epoch: string;
  role: string;
};

// Generated once on module load to bypass browser image caching safely without violating React purity
const CACHE_BUSTER = Date.now();

const epochDetails: Record<number, { years: string; subtitle: string; description: string }> = {
  0: {
    years: "Late 19th - Early 20th Century",
    subtitle: "Guardian: Turio Wario",
    description: "During the intense geopolitical realignments of Emperor Menelik II's era, Turiyo Wariyo stood as a primary defense pillar for the Werjih society, safeguarding kinship systems and ancestral land ties."
  },
  1: {
    years: "Mid 20th Century (56-Year Tenure)",
    subtitle: "Guardian: Hajj Musa Sheikh Abdulrahman",
    description: "Served as administrator and chief judge under Sharia law, leading his community safely to Arsi during the Italian invasion, and preserving Werjih stability through decades of political shift."
  },
  2: {
    years: "Federal Transition Era",
    subtitle: "Guardian: Haji Jamal Abdo",
    description: "With the establishment of the federal system, Haji Jamal Abdo stepped forward to advocate for formal representation and stake legitimate claims for societal identity and political recognition."
  },
  3: {
    years: "Present Era",
    subtitle: "Visionary: Arif Abdulkadir",
    description: "Transitioning to historical documentation and digital revival, youth leaders and scholars spearheaded groundbreaking initiatives authoring the first definitive Werjih book and uniting the global diaspora."
  }
};

export default function LeadershipImage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function fetchLeaders() {
      const { data, error } = await supabase
        .from("hierarchical_leadership_photos")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching leadership photos:", error);
      } else if (data) {
        setLeaders(data);
      }
      setLoading(false);
    }

    fetchLeaders();
  }, []);

  const handleSelectLeader = (index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-28">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#d07f05]/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-[#d07f05] border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  const activeLeader = leaders[activeIndex] || leaders[0];
  const activeEpochInfo = epochDetails[activeIndex] || {
    years: "Historical Era",
    subtitle: activeLeader?.role || "Community Guardian",
    description: "Honoring the legacy of our ancestors and their unwavering commitment to the Werjih lineage."
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Ornamental Motif */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `radial-gradient(#d07f05 1px, transparent 1px)`,
          backgroundSize: `32px 32px`
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d07f05] px-4 py-1.5 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5 inline-block mb-4 shadow-[0_0_20px_rgba(208,127,5,0.15)]">
            UNBROKEN GENERATIONAL SHIELD
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight mb-4">
            Foundational Leadership & <span className="italic text-[#d07f05]">Hierarchy</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
            A continuous chain of defense and advocacy across historical epochs. Select an era below to explore the custodian of the legacy.
          </p>
        </motion.div>

        {/* Timeline Row / Cards Grid */}
        <div className="relative mb-8">
          <div className="hidden lg:block absolute top-[50px] left-16 right-16 h-[2px] bg-[#26201a] z-0">
            {!shouldReduceMotion && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#d07f05]/40 via-[#d07f05] to-[#d07f05]/40 shadow-[0_0_12px_#d07f05] animate-pulse"></div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 relative z-10">
            {leaders.map((leader, index) => {
              const rawUrl = leader.image_url
                ? supabase.storage
                    .from("hierarchical_leadership_photos")
                    .getPublicUrl(leader.image_url).data.publicUrl
                : "";
              
              const imageUrl = rawUrl ? `${rawUrl}?t=${CACHE_BUSTER}` : "";
              const isSelected = activeIndex === index;
              const currentEpochInfo = epochDetails[index] || {
                years: "Historical Era",
                subtitle: leader?.role || "Community Guardian",
                description: "Honoring the legacy of our ancestors."
              };

              return (
                <div key={leader.id || index} className="flex flex-col">
                  {/* Leader Selection Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleSelectLeader(index)}
                    className={`group relative flex lg:flex-col items-center text-left lg:text-center cursor-pointer p-4 rounded-2xl transition-all duration-500 ${
                      isSelected 
                        ? "bg-[#181512] border border-[#d07f05]/60 shadow-[0_10px_35px_rgba(208,127,5,0.18)]" 
                        : "bg-[#12100e]/60 border border-white/5 hover:border-[#d07f05]/30 hover:bg-[#15120f]"
                    }`}
                  >
                    <div className="relative shrink-0">
                      {isSelected && (
                        <div className="absolute -inset-2 rounded-full bg-[#d07f05]/20 blur-md animate-pulse pointer-events-none"></div>
                      )}

                      <div className={`relative w-20 h-20 lg:w-28 lg:h-28 rounded-full p-1 transition-all duration-500 ${
                        isSelected ? "border-2 border-[#d07f05] scale-105 shadow-xl" : "border border-[#d07f05]/30 group-hover:border-[#d07f05]/70"
                      } bg-[#0c0a09]`}>
                        
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-[#070605]">
                          {imageUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={imageUrl}
                              alt={leader.name || "Guardian"}
                              className="w-full h-full object-cover object-top filter grayscale-[25%] sepia-[15%] group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[9px] font-mono text-gray-500">
                              ARCHIVE
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"></div>
                        </div>
                      </div>

                      <div className="absolute -bottom-1 -right-1 bg-[#0f0e0e] border border-[#d07f05] text-[#d07f05] text-[9px] font-mono w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="ml-5 lg:ml-0 lg:mt-4 flex flex-col justify-center">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#d07f05] uppercase mb-0.5">
                        {leader.epoch || `Epoch ${index + 1}`}
                      </span>
                      <h3 className="text-base font-serif font-medium text-white group-hover:text-[#d07f05] transition-colors">
                        {leader.name}
                      </h3>
                      <span className="text-[11px] text-gray-400 font-light mt-0.5 lg:hidden">
                        {isSelected ? "Active Record ▼" : "Tap to view record ▸"}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="hidden lg:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#181512] border-r border-b border-[#d07f05]/60 rotate-45"></div>
                    )}
                  </motion.div>

                  {/* MOBILE INLINE ACCORDION: Shows immediately below the tapped card on mobile screens only */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block lg:hidden mt-3 mb-4 bg-gradient-to-br from-[#161412] via-[#110f0d] to-[#0a0807] border border-[#d07f05]/40 rounded-2xl p-5 shadow-xl relative overflow-hidden"
                    >
                      <div className="space-y-4 relative z-10">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-black bg-[#d07f05] px-2.5 py-0.5 rounded-full font-bold">
                            {leader.epoch || `Epoch ${index + 1}`}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 flex items-center space-x-1">
                            <span>⏳</span>
                            <span>{currentEpochInfo.years}</span>
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-serif font-normal text-white mb-1">
                            {leader.name}
                          </h3>
                          <p className="text-[#d07f05] text-xs font-serif italic">
                            {currentEpochInfo.subtitle}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#d07f05]/20">
                          <p className="text-gray-300 text-xs font-light leading-relaxed">
                            {currentEpochInfo.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP EXPANDED STORY CARD: Only shows on large screens (lg and up) */}
        <div className="hidden lg:block">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-br from-[#161412] via-[#110f0d] to-[#0a0807] border border-[#d07f05]/40 rounded-3xl p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d07f05]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-black bg-[#d07f05] px-3.5 py-1 rounded-full font-bold shadow-[0_0_15px_rgba(208,127,5,0.3)]">
                    {activeLeader.epoch || `Epoch ${activeIndex + 1}`}
                  </span>
                  <span className="text-xs font-mono text-gray-400 tracking-wider flex items-center space-x-1">
                    <span>⏳</span>
                    <span>{activeEpochInfo.years}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-4xl font-serif font-normal text-white mb-2">
                    {activeLeader.name}
                  </h3>
                  <p className="text-[#d07f05] text-base font-serif italic tracking-wide">
                    {activeEpochInfo.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d07f05]/20">
                  <p className="text-gray-300 text-base font-light leading-relaxed">
                    {activeEpochInfo.description}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#0e0c0a]/80 border border-[#d07f05]/20 rounded-2xl p-6 text-center shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d07f05] mb-2">
                  Custodianship Status
                </span>
                <div className="w-12 h-12 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 flex items-center justify-center text-[#d07f05] mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Preserved across generations within the foundational memory and written archives of The Werjih Society.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}