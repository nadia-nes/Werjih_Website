"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface HeroItem {
  id: string;
  name?: string;
  title?: string;
  image_url?: string;
  description?: string;
}

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<HeroItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const { data, error } = await supabase.from("heroes").select("*");

        if (error) {
          console.error("Supabase error:", error);
          return;
        }

        if (data) {
          console.log("Fetched heroes data:", data); // Check your browser console to see what comes back!
          
          const formattedHeroes = data.map((item, index) => {
            let imgPath = item.image_url;

            // If it's a relative path, resolve it from storage. If it's already an http link, keep it as is.
            if (imgPath && !imgPath.startsWith("http")) {
              const { data: publicUrlData } = supabase.storage
                .from("heroes")
                .getPublicUrl(imgPath);
              
              imgPath = publicUrlData.publicUrl;
            }

            return {
              ...item,
              title: item.title || item.name || `Hero Fragment 0${index + 1}`,
              image_url: imgPath || "",
            };
          });
          setHeroes(formattedHeroes);
        }
      } catch (err) {
        console.error("Error loading heroes images:", err);
      }
    }
    fetchHeroes();
  }, []);

  const fanCards = heroes.slice(0, 5);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#070605] text-[#e8dfd3] font-serif selection:bg-[#d07f05] selection:text-black py-20 px-6 sm:px-12 relative overflow-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-10 left-1/4 w-[35rem] h-[35rem] bg-[#d07f05]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[35rem] h-[35rem] bg-[#d07f05]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="space-y-6 border-b border-[#2d2722] pb-10 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] uppercase text-[#d07f05] bg-[#d07f05]/10 px-3 py-1 rounded-full border border-[#d07f05]/25">
            <span>• Honoring Visionaries</span>
            <span>/</span>
            <span>Pillars of Legacy</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-normal text-[#f7f3ed] tracking-tight font-serif">
            Community &amp; Heroes
          </h1>
          <p className="text-[#ab9f94] text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl">
            Honoring the visionaries who built bridges for our people and country.
          </p>
        </div>

        {/* Fanned Card Deck Gallery Section */}
        <section className="space-y-12 py-6">
          <div className="text-center space-y-4">
            <div className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-[#d07f05] border-b border-[#d07f05]/30 pb-1">
              Archival Record &amp; Lineage
            </div>
            
            <div className="py-4 px-6 bg-gradient-to-r from-transparent via-[#d07f05] to-transparent max-w-3xl mx-auto">
              <h3 className="text-3xl sm:text-5xl font-serif text-black tracking-tight font-normal">
                Sacred Moments in Hand
              </h3>
            </div>
          </div>

          {fanCards.length > 0 ? (
            <div className="relative w-full h-[450px] sm:h-[520px] flex items-center justify-center perspective-[1400px] my-6">
              <div className="relative flex items-center justify-center w-full max-w-2xl h-full">
                {fanCards.map((hero, index) => {
                  const total = fanCards.length;
                  const centerOffset = index - (total - 1) / 2;
                  const rotation = centerOffset * 11;
                  const xOffset = centerOffset * 52;
                  const isHovered = activeIndex === index;

                  return (
                    <motion.div
                      key={hero.id || index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1,
                        y: isHovered ? -45 : Math.abs(centerOffset) * 14, 
                        x: xOffset,
                        rotate: isHovered ? 0 : rotation,
                        scale: isHovered ? 1.12 : 1,
                        zIndex: isHovered ? 50 : 10 - Math.abs(centerOffset)
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute w-[220px] sm:w-[260px] h-[340px] sm:h-[400px] bg-[#12100e] rounded-2xl p-3.5 border border-[#d07f05]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transform-gpu flex flex-col justify-between"
                    >
                      <div className="relative w-full h-[78%] rounded-xl overflow-hidden bg-black flex items-center justify-center border border-[#221c17]">
                        {hero.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={hero.image_url} 
                            alt={hero.title || "Hero Image"} 
                            className="w-full h-full object-contain pointer-events-none" 
                          />
                        ) : (
                          <div className="text-[10px] font-mono text-[#ab9f94]">No image</div>
                        )}
                        <div className="absolute top-2.5 left-2.5 bg-black/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[8px] font-mono tracking-[0.2em] text-[#d07f05]">
                          0{index + 1}
                        </div>
                      </div>

                      <div className="pt-2 px-1">
                        <div className="text-[8px] font-mono tracking-widest text-[#d07f05] uppercase mb-0.5">
                          Historical Figure
                        </div>
                        <h4 className="text-xs sm:text-sm text-[#f7f3ed] font-serif truncate">
                          {hero.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-[#362e26] rounded-3xl text-[#ab9f94] text-xs font-mono bg-[#100e0c]">
              Loading heroes records from database...
            </div>
          )}
        </section>

      </div>
    </motion.div>
  );
}