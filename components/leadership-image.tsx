// components/LeadershipImage.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";

type Leader = {
  id: string;
  name: string;
  image_url: string;
  epoch: string;
  role: string;
};

const BUCKET = "hierarchical_leadership_photos";
const ACCENT = "#d07f05";

// Generated once on module load to bypass browser image caching safely
const CACHE_BUSTER = Date.now();

const epochDetails: Record<number, { years: string; subtitle: string; description: string }> = {
  0: {
    years: "Late 19th - Early 20th Century",
    subtitle: "Guardian: Turio Wario",
    description:
      "During the intense geopolitical realignments of Emperor Menelik II's era, Turio Wario stood as a primary defense pillar for the Werjih society, safeguarding kinship systems and ancestral land ties.",
  },
  1: {
    years: "Mid 20th Century (56-Year Tenure)",
    subtitle: "Guardian: Hajj Musa Sheikh Abdulrahman",
    description:
      "Served as administrator and chief judge under Sharia law, leading his community safely to Arsi during the Italian invasion, and preserving Werjih stability through decades of political shift.",
  },
  2: {
    years: "Federal Transition Era",
    subtitle: "Guardian: Haji Jamal Abdo",
    description:
      "With the establishment of the federal system, Haji Jamal Abdo stepped forward to advocate for formal representation and stake legitimate claims for societal identity and political recognition.",
  },
  3: {
    years: "Present Era",
    subtitle: "Visionary: Arif Abdulkadir",
    description:
      "Transitioning to historical documentation and digital revival, youth leaders and scholars spearheaded groundbreaking initiatives authoring the first definitive Werjih book and uniting the global diaspora.",
  },
};

// Works whether the table stores a file name ("Turio Wario.png")
// or a full public link (https://...supabase.co/storage/...).
function getImageUrl(path?: string) {
  if (!path) return "";

  const trimmed = path.trim();

  const raw = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : supabase.storage.from(BUCKET).getPublicUrl(trimmed).data.publicUrl;

  if (!raw) return "";
  return `${raw}${raw.includes("?") ? "&" : "?"}t=${CACHE_BUSTER}`;
}

function initials(name?: string) {
  return (name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Position of each card in the stack, relative to the active one
function stackPose(rel: number) {
  if (rel === 0) return { x: "0%", scale: 1, opacity: 1 };
  if (rel === 1) return { x: "16%", scale: 0.92, opacity: 0.85 };
  if (rel === 2) return { x: "32%", scale: 0.84, opacity: 0.6 };
  return { x: "32%", scale: 0.8, opacity: 0 };
}

export default function LeadershipImage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

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

  if (leaders.length === 0) return null;

  const total = leaders.length;
  const activeLeader = leaders[activeIndex] || leaders[0];
  const activeEpochInfo = epochDetails[activeIndex] || {
    years: "Historical Era",
    subtitle: activeLeader?.role || "Community Guardian",
    description:
      "Honoring the legacy of our ancestors and their unwavering commitment to the Werjih lineage.",
  };

  const markFailed = (key: string) => setFailed((f) => ({ ...f, [key]: true }));
  const goTo = (index: number) => setActiveIndex(index);
  const step = (dir: number) => setActiveIndex((i) => (i + dir + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-gradient(${ACCENT} 1px, transparent 1px)`,
          backgroundSize: `32px 32px`,
        }}
      />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#d07f05]/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-16"
        >
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-[#d07f05] px-4 py-1.5 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5 inline-block mb-4">
            UNBROKEN GENERATIONAL SHIELD
          </span>
          <h2 className="text-2xl md:text-5xl font-serif font-normal text-white tracking-tight mb-3 md:mb-4">
            Foundational Leadership &amp;{" "}
            <span className="italic text-[#d07f05]">Hierarchy</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
            A continuous chain of defense and advocacy across historical epochs. Swipe or tap the
            stack to explore each custodian of the legacy.
          </p>
        </motion.div>

        {/* STAGE: photo stack + story, side by side on every screen size */}
        <div className="flex flex-row items-center gap-4 sm:gap-8 lg:gap-14">
          {/* PHOTO STACK */}
          <div className="w-[46%] max-w-[230px] sm:max-w-[300px] lg:max-w-[340px] shrink-0">
            <div className="relative w-[80%] aspect-[4/5]">
              {leaders.map((leader, index) => {
                const key = leader.id || String(index);
                const rel = (index - activeIndex + total) % total;
                const isActive = rel === 0;
                const pose = stackPose(rel);
                const imageUrl = failed[key] ? "" : getImageUrl(leader.image_url);

                return (
                  <motion.div
                    key={key}
                    initial={false}
                    animate={pose}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      zIndex: total - rel,
                      transformOrigin: "left center",
                      pointerEvents: rel > 2 ? "none" : "auto",
                    }}
                    onClick={() => !isActive && goTo(index)}
                    className={`absolute inset-0 ${isActive ? "" : "cursor-pointer"}`}
                  >
                    {/* Inner layer handles the swipe so it doesn't fight the stack animation */}
                    <motion.div
                      drag={isActive && !shouldReduceMotion ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      dragSnapToOrigin
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -50) step(1);
                        else if (info.offset.x > 50) step(-1);
                      }}
                      className={`relative w-full h-full overflow-hidden rounded-t-[999px] rounded-b-2xl md:rounded-b-3xl bg-[#0c0a09] touch-pan-y ${
                        isActive
                          ? "border-2 border-[#d07f05] shadow-[0_20px_50px_rgba(208,127,5,0.25)] cursor-grab active:cursor-grabbing"
                          : "border border-[#d07f05]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                      }`}
                    >
                      {imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={imageUrl}
                          alt={leader.name || "Guardian"}
                          draggable={false}
                          onError={() => markFailed(key)}
                          className={`w-full h-full object-cover object-top select-none transition-all duration-700 ${
                            isActive ? "sepia-[10%]" : "grayscale brightness-50"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1612] to-[#0a0807]">
                          <span className="text-3xl md:text-5xl font-serif text-[#d07f05]/60">
                            {initials(leader.name)}
                          </span>
                        </div>
                      )}

                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-4 text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500">
              Swipe or tap for next ›
            </p>
          </div>

          {/* STORY */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Ghost numeral */}
                <span
                  aria-hidden
                  className="absolute -top-6 -left-1 md:-top-12 text-[70px] md:text-[150px] leading-none font-serif text-[#d07f05]/[0.07] select-none pointer-events-none"
                >
                  {pad(activeIndex + 1)}
                </span>

                <div className="relative space-y-3 md:space-y-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-[8px] md:text-[10px] font-mono tracking-[0.25em] uppercase text-black bg-[#d07f05] px-2.5 md:px-3.5 py-0.5 md:py-1 rounded-full font-bold">
                      {activeLeader.epoch || `Epoch ${activeIndex + 1}`}
                    </span>
                    <span className="text-[9px] md:text-xs font-mono text-gray-400 tracking-wide">
                      {activeEpochInfo.years}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-3xl md:text-5xl font-serif font-normal text-white mb-1 md:mb-3 leading-tight">
                      {activeLeader.name}
                    </h3>
                    <p className="text-[#d07f05] text-[11px] sm:text-sm md:text-lg font-serif italic tracking-wide">
                      {activeEpochInfo.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 md:pt-5 border-t border-[#d07f05]/20">
                    <p className="text-gray-300 text-[11px] sm:text-sm md:text-base font-light leading-relaxed">
                      {activeEpochInfo.description}
                    </p>
                  </div>

                  {/* Hidden on small phones to keep photo + writing side by side */}
                  <div className="hidden md:flex items-center gap-4 rounded-2xl border border-[#d07f05]/20 bg-[#0e0c0a]/70 p-4">
                    <div className="shrink-0 w-11 h-11 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 flex items-center justify-center text-[#d07f05]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-[0.25em] text-[#d07f05] mb-1">
                        Custodianship Status
                      </span>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        Preserved across generations within the foundational memory and written
                        archives of The Werjih Society.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CONTROLS: arrows + dots + counter */}
            <div className="flex items-center gap-3 md:gap-4 mt-5 md:mt-8">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous leader"
                className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-[#d07f05]/40 text-[#d07f05] flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {leaders.map((leader, index) => (
                  <button
                    key={leader.id || index}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`View ${leader.name}`}
                    aria-current={activeIndex === index}
                    className="py-3 px-0.5"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        activeIndex === index
                          ? "w-6 bg-[#d07f05]"
                          : "w-1.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next leader"
                className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-[#d07f05]/40 text-[#d07f05] flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <span className="ml-1 text-[10px] md:text-[11px] font-mono text-gray-500 tracking-widest">
                {pad(activeIndex + 1)} / {pad(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}