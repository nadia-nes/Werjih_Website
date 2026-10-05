"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { BookOpen, FileText, Mic, Video, Image as ImageIcon, Download, Play, Pause, ExternalLink, Sparkles, Layers } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ArchiveItem {
  id: string;
  title: string;
  category: "book" | "research" | "voice" | "video" | "photo";
  description: string;
  file_url: string;
  author_or_source?: string;
  created_at?: string;
}

const categories = [
  { id: "all", label: "All Chronicles", icon: Layers },
  { id: "book", label: "Books & Literature", icon: BookOpen },
  { id: "research", label: "Research Papers", icon: FileText },
  { id: "voice", label: "Oral History & Voices", icon: Mic },
  { id: "video", label: "Video Chronicles", icon: Video },
  { id: "photo", label: "Visual Snapshots", icon: ImageIcon },
];

export default function ArchiveHubPage() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchArchiveItems() {
      try {
        const { data, error } = await supabase
          .from("archive_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setItems(data);
        }
      } catch (err) {
        console.error("Error loading archive items:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArchiveItems();
  }, []);

  const handleToggleAudio = (id: string, url: string) => {
    if (playingAudioId === id && audioRef.current) {
      audioRef.current.pause();
      setPlayingAudioId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(url);
      audioRef.current = newAudio;
      newAudio.play();
      setPlayingAudioId(id);
      
      newAudio.onended = () => {
        setPlayingAudioId(null);
        audioRef.current = null;
      };
    }
  };

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#070605] text-[#e8dfd3] font-serif py-24 px-5 sm:px-12 relative overflow-hidden selection:bg-[#d07f05] selection:text-black">
      
      {/* Immersive Background Architectural Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-gradient-to-b from-[#d07f05]/10 via-[#d07f05]/3 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/10 w-[30rem] h-[30rem] bg-[#d07f05]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Modern Classic Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.4em] uppercase text-[#d07f05] bg-[#d07f05]/10 px-4 py-1.5 rounded-full border border-[#d07f05]/25 shadow-inner">
            <Sparkles className="w-3 h-3 text-[#d07f05]" />
            <span>The Sacred Repository Hub</span>
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-normal text-[#f7f3ed] tracking-tight font-serif leading-[1.1]">
            Digital Archive
          </h1>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent mx-auto" />
          
          <p className="text-[#ab9f94] text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
            A curated sanctuary of our books, research manuscripts, elders&apos; oral accounts, visual memories, and historical chronicles preserving centuries of Werjih legacy.
          </p>
        </div>

        {/* Elegant Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#d07f05] to-[#e0890f] text-black font-semibold shadow-[0_4px_25px_rgba(208,127,5,0.4)] border border-[#d07f05] scale-[1.02]"
                    : "bg-[#110f0d] text-[#bfaea1] border border-[#2b231d] hover:border-[#d07f05]/50 hover:bg-[#181411] hover:text-[#f7f3ed]"
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110 text-[#d07f05]"}`} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Context Blurbs */}
        <AnimatePresence mode="wait">
          {selectedCategory === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Complete Sanctuary Repository</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;Exploring every facet of our shared heritage where history, research, voices, and deeply bonded community traditions converge under one roof.&rdquo;
              </p>
            </motion.div>
          )}

          {selectedCategory === "book" && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Literary Works & Manuscripts</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;Written records and compiled volumes that map out our historical journey, preserving the profound identity, wisdom, and literature of our ancestors for future generations.&rdquo;
              </p>
            </motion.div>
          )}

          {selectedCategory === "research" && (
            <motion.div
              key="research"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Invaluable Research Papers</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;Gathering information for these research papers was a monumental task, often met with scarcity. These records stand as testaments to invaluable minds who persevered through countless barriers to bring these truths to light.&rdquo;
              </p>
            </motion.div>
          )}

          {selectedCategory === "voice" && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Oral History & Elders&apos; Voices</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;Listening directly to the spoken words of our elders preserving oral traditions, ancestral wisdom, and lived histories passed down from generation to generation.&rdquo;
              </p>
            </motion.div>
          )}

          {selectedCategory === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Visual Chronicles & Documentaries</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;Moving imagery and captured cultural events depicting community gatherings, traditional ceremonies, and milestones in motion.&rdquo;
              </p>
            </motion.div>
          )}

          {selectedCategory === "photo" && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto text-center bg-[#110f0d]/80 border border-[#d07f05]/20 rounded-2xl p-5 shadow-lg"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] mb-1">Visual Kinship & Heritage</p>
              <p className="text-sm font-sans font-light text-[#ab9f94] italic leading-relaxed">
                &ldquo;What makes the Werjih community uniquely close-knit is our deep rooted kinship nearly everyone knows one another, and open door family gatherings echo in every home because, one way or another, we are all family.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-[#d07f05]/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-[#d07f05] border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xs font-mono tracking-widest text-[#ab9f94] uppercase">Unfolding Archive Records...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-4"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group relative bg-gradient-to-b from-[#14110f] to-[#0d0b09] border border-[#2d241e] hover:border-[#d07f05]/60 rounded-3xl p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(208,127,5,0.15)] transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle top inner border highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d07f05]/0 group-hover:via-[#d07f05] to-transparent transition-all duration-700" />

                  <div className="space-y-5">
                    {/* Category Tag & Author/Source */}
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em]">
                      <span className="px-3 py-1 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 text-[#d07f05] font-medium">
                        {item.category}
                      </span>
                      {item.author_or_source && (
                        <span className="text-[#8c7e72] truncate max-w-[160px] italic font-serif">
                          {item.author_or_source}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-serif text-[#f7f3ed] group-hover:text-[#d07f05] transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm font-sans text-[#ab9f94] font-light leading-relaxed line-clamp-3">
                      {item.description || "Historical preservation record documenting the rich heritage, lineage, and cultural traditions of the Werjih society."}
                    </p>
                  </div>

                  {/* Modern Classic Action Buttons */}
                  <div className="pt-6 mt-8 border-t border-[#221c17] flex items-center justify-between">
                    {item.category === "voice" ? (
                      <button
                        onClick={() => handleToggleAudio(item.id, item.file_url)}
                        className="w-full flex items-center justify-center gap-2.5 text-xs font-mono tracking-widest uppercase text-black bg-gradient-to-r from-[#d07f05] to-[#e0890f] hover:from-[#e0890f] hover:to-[#f09515] py-3 px-5 rounded-2xl transition-all duration-300 cursor-pointer shadow-md font-medium"
                      >
                        {playingAudioId === item.id ? (
                          <>
                            <Pause className="w-4 h-4" /> Pause Audio Account
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-black" /> Listen Voice Account
                          </>
                        )}
                      </button>
                    ) : item.category === "book" || item.category === "research" ? (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 text-xs font-mono tracking-widest uppercase text-black bg-gradient-to-r from-[#d07f05] to-[#e0890f] hover:from-[#e0890f] hover:to-[#f09515] py-3 px-5 rounded-2xl transition-all duration-300 cursor-pointer shadow-md font-medium"
                      >
                        <Download className="w-4 h-4" /> Read / Download PDF
                      </a>
                    ) : (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 text-xs font-mono tracking-widest uppercase text-[#e8dfd3] bg-[#1a1714] hover:bg-[#d07f05] hover:text-black border border-[#332a22] hover:border-[#d07f05] py-3 px-5 rounded-2xl transition-all duration-300 cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" /> View Full Record
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-28 border border-dashed border-[#362e26] rounded-3xl text-[#ab9f94] text-xs font-mono bg-[#110f0d] space-y-3">
            <p className="uppercase tracking-widest text-[#d07f05]">Catalog Notice</p>
            <p>No records have been filed under this category in Supabase yet.</p>
          </div>
        )}

        {/* Footer Return */}
        <footer className="mt-32 text-center pt-12 border-t border-[#221c17]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full text-gray-300 text-xs font-mono tracking-[0.25em] uppercase border border-[#332a22] bg-[#110f0d] hover:bg-[#d07f05] hover:text-black hover:border-[#d07f05] transition-all duration-300 cursor-pointer shadow-xl group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </div>
  );
}