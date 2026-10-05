"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface EventItem {
  id: string;
  title?: string;
  date?: string;
  image_url: string;
  description?: string;
}

export default function ProgramsAndEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase.from("events").select("*");

        if (!error && data) {
          const formattedEvents = data.map((item, index) => {
            let imgPath = item.image_url;

            if (imgPath && !imgPath.startsWith("http")) {
              const { data: publicUrlData } = supabase.storage
                .from("events")
                .getPublicUrl(imgPath);
              
              imgPath = publicUrlData.publicUrl;
            }

            return {
              ...item,
              title: item.title || `Archive Fragment 0${index + 1}`,
              description: item.description || "A priceless fragment of our collective heritage preserved in visual history.",
              image_url: imgPath,
            };
          });
          setEvents(formattedEvents);
        }
      } catch (err) {
        console.error("Error loading event images:", err);
      }
    }
    fetchEvents();
  }, []);

  const fanCards = events.slice(0, 10);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-[#070605] text-[#e8dfd3] font-serif selection:bg-[#D97706] selection:text-black py-20 px-4 sm:px-12 relative overflow-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-10 left-1/4 w-[35rem] h-[35rem] bg-[#D97706]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[35rem] h-[35rem] bg-[#D97706]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        {/* Header / Breadcrumb */}
        <div className="space-y-6 border-b border-[#2d2722] pb-10 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.35em] uppercase text-[#D97706] bg-[#D97706]/10 px-3 py-1 rounded-full border border-[#D97706]/30">
            <span>Community Archive</span>
            <span>/</span>
            <span>Programs & Events</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-normal text-[#f7f3ed] tracking-tight font-serif">
            Now or Never
          </h1>
          <p className="text-[#ab9f94] text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl">
            For generations, we carried our history the only way we could: in our mouths, in our memories, in the voices of our elders.
          </p>
        </div>

        {/* Section 1: The Weight of History */}
        <section className="space-y-6 font-sans">
          <div className="border-l-2 border-[#D97706] pl-4">
            <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D97706]">
              Part I • Surviving Without Writing
            </h2>
            <h3 className="text-2xl sm:text-3xl text-[#f7f3ed] font-serif mt-1">
              We Never Had a Written History
            </h3>
          </div>
          <div className="space-y-5 text-[#bfaea1] text-base sm:text-lg leading-relaxed font-light">
            <p>
              Nobody wrote us down. So while other peoples sat in the safety of their archives, we were busy surviving.
            </p>
            <p>
              And we paid for it. We lost our language, the sound our grandmothers&apos; prayers and lullabies once had. We lost our land, the soil our fathers walked, traded on and were buried in. We were scattered across cities, regions and continents, so far apart that cousins now meet as strangers.
            </p>
            <p>
              Now the last thing we hold is slipping away. Our elders are growing old. Each year, a little more is forgotten. Each funeral buries a library with no catalogue. Some stories are told with certainty, others only with assumption, and the gaps between them widen every season. While we hesitate, others are speaking for us, claiming our identity and telling our stories as their own.
            </p>
          </div>
        </section>

        {/* Section 2: A Dream Made Real */}
        <section className="space-y-6 bg-gradient-to-br from-[#12100e] to-[#0d0b09] border border-[#D97706]/30 p-6 sm:p-14 rounded-3xl font-sans shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D97706]/5 rounded-bl-full pointer-events-none" />
          <div className="border-l-2 border-[#D97706] pl-4">
            <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D97706]">
              Part II • A Dream Made Real
            </h2>
            <h3 className="text-2xl sm:text-3xl text-[#f7f3ed] font-serif mt-1">
              From Whisper to Print
            </h3>
          </div>
          <div className="space-y-5 text-[#cebfae] text-base sm:text-lg leading-relaxed font-light">
            <p className="italic font-serif text-[#D97706] text-xl border-l border-[#D97706]/40 pl-4 py-1">
              &ldquo;For years, this was only a dream whispered in living rooms and at gatherings: &apos;One day, someone will write our story.&apos;&rdquo;
            </p>
            <p>
              Then the dream became a book. To our author, <strong>Arif Abdulkadir</strong>, thank you. You took the scattered memories of a people and gave them a home on paper. You listened, you searched, you gathered, and you wrote with a love that every Werji reader can feel. You gave us what generations before us could only wish for. Because of you, our grandchildren will not have to ask whether we existed. They will hold the proof.
            </p>
            <p>
              To the <strong>Werji diaspora</strong>, thank you. You are far from the land, yet you never stopped carrying it in your hearts. You gave your support, your resources, your encouragement and your belief when this was still only an idea. Distance did not make you forget. It made you hold on tighter. This book belongs to you as much as to those who stayed.
            </p>
            <p>
              What we dreamed of has become real. The first part is a <strong>336-page book in Amharic</strong> that tells of the golden age of the Werji people, their struggles and their trade, the Ulamas remembered in poetry, and the heroes, merchants and well known figures who carried our name. People who had only heard fragments saw the names of their ancestors printed on a page. Elders wept. Young people asked, &ldquo;Is this really us?&rdquo; And the answer was yes: we existed, we mattered, and we built.
            </p>
          </div>
        </section>

        {/* 3D Interactive Fanned Card Deck Gallery */}
        <section className="space-y-12 py-10 overflow-hidden">
          <div className="text-center space-y-4">
            <div className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-[#D97706] border-b border-[#D97706]/30 pb-1">
              Est. Tradition &amp; Heritage • Archival Record
            </div>
            
            {/* Amber Golden Faded Band with Black Stylish Writing */}
            <div className="py-4 px-6 bg-gradient-to-r from-transparent via-[#D97706] to-transparent max-w-3xl mx-auto shadow-[0_0_25px_rgba(217,119,6,0.2)]">
              <h3 className="text-3xl sm:text-5xl font-serif text-black tracking-tight font-normal">
                Sacred Moments in Hand
              </h3>
            </div>
          </div>

          {fanCards.length > 0 ? (
            <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center perspective-[1400px] my-6 px-4">
              
              <div className="relative flex items-center justify-center w-full max-w-2xl h-full">
                {fanCards.map((ev, index) => {
                  const total = fanCards.length;
                  const centerOffset = index - (total - 1) / 2;
                  
                  const rotation = centerOffset * (window && typeof window !== 'undefined' && window.innerWidth < 640 ? 6 : 11);
                  const xOffset = centerOffset * (window && typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 52);
                  const isHovered = activeIndex === index;

                  return (
                    <motion.div
                      key={ev.id || index}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1,
                        y: isHovered ? -35 : Math.abs(centerOffset) * 10, 
                        x: xOffset,
                        rotate: isHovered ? 0 : rotation,
                        scale: isHovered ? 1.08 : 1,
                        zIndex: isHovered ? 50 : 10 - Math.abs(centerOffset)
                      }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute w-[180px] sm:w-[260px] h-[300px] sm:h-[400px] bg-[#12100e] rounded-2xl p-3 border border-[#D97706]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer transform-gpu flex flex-col justify-between"
                    >
                      {/* Uncropped Image Display */}
                      <div className="relative w-full h-[75%] rounded-xl overflow-hidden bg-black flex items-center justify-center border border-[#221c17]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={ev.image_url} 
                          alt={ev.title || "Community Moment"} 
                          className="w-full h-full object-contain pointer-events-none" 
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 text-[8px] font-mono tracking-[0.2em] text-[#D97706]">
                          0{index + 1}
                        </div>
                      </div>

                      {/* Card Footer Details */}
                      <div className="pt-2 px-1">
                        <div className="text-[8px] font-mono tracking-widest text-[#D97706] uppercase mb-0.5">
                          Archive Fragment
                        </div>
                        <h4 className="text-[11px] sm:text-sm text-[#f7f3ed] font-serif truncate">
                          {ev.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-[#D97706]/30 rounded-3xl text-[#ab9f94] text-xs font-mono bg-[#100e0c]">
              No event images found in Supabase storage bucket yet.
            </div>
          )}
        </section>

        {/* Section 3: The Work Is Not Finished */}
        <section className="space-y-6 font-sans pt-6">
          <div className="border-l-2 border-[#D97706] pl-4">
            <h2 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#D97706]">
              Part III • The Call to Action
            </h2>
            <h3 className="text-2xl sm:text-3xl text-[#f7f3ed] font-serif mt-1">
              The Work Is Not Finished
            </h3>
          </div>
          <div className="space-y-5 text-[#bfaea1] text-base sm:text-lg leading-relaxed font-light">
            <p>
              But one book cannot save everything. It opened the door, and now we must walk through it.
            </p>
            <p>
              Every photograph sitting in a drawer, every story an elder has never told, every recording of a selewat, every memory of those we lost under the Derg, every account of how our wealth and our scholars were taken: all of it is evidence that we were here. If we don&apos;t gather it now, it is gone, and the people who would rewrite us will fill the silence.
            </p>
          </div>
        </section>

        {/* Closing Manifesto Box */}
        <section className="bg-gradient-to-b from-[#14110f] via-[#0d0b09] to-[#070605] border border-[#D97706]/40 p-6 sm:p-16 rounded-3xl text-center space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D97706]/10 via-transparent to-transparent pointer-events-none" />
          <div className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-[#D97706] border-b border-[#D97706]/30 pb-1">
            It Is Now or Never
          </div>
          <h3 className="text-3xl sm:text-6xl font-serif text-[#f7f3ed] tracking-tight">
            We Choose Now.
          </h3>
          <p className="text-[#ab9f94] text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Sit with your grandfather and record his voice before it fades. Send us the photographs. Write down what you remember, even if you think it is small. Tell us the names. Tell us the struggles. Tell us who we are, in our own words, before someone else does.
          </p>
          <div className="pt-4 text-xs font-mono text-[#D97706] tracking-[0.25em] uppercase">
            Thank you, Arif. Thank you, diaspora. Thank you, every Werji heart that refused to forget.
          </div>
        </section>
        
        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-xs font-mono tracking-widest uppercase border border-[#D97706]/40 bg-[#141210] hover:bg-[#D97706] hover:text-black hover:border-[#D97706] transition-all duration-300 cursor-pointer no-underline shadow-[0_0_20px_rgba(217,119,6,0.2)]"
          >
            <span>←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </motion.div>
  );
}