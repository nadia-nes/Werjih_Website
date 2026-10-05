"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ContributionPortal from '@/components/ContributionPortal';
import AncestralTree from '@/components/AncestralTree';
import EventsBoard from '@/components/EventsBoard';
import { useScroll, useTransform, useReducedMotion } from "framer-motion";
import VisualHeritageSlideshow from '@/components/VisualHeritageSlideshow';
import LeadershipImage from '@/components/leadership-image';
import BookAdvertSection from "@/components/Book-advert";
import BeginJourneySection from "@/components/BeginJourneySection";
import { supabase } from "@/lib/supabase";
import RootsSection from '@/components/RootsSection';
import HeroSection from '@/components/HeroSection';

// ==========================================
// SOCIAL CHANNELS CONFIGURATION (Compact Modern Pills)
// ==========================================
const socialChannels = [
  {
    name: 'Telegram',
    handle: '@WerjihSociety',
    description: 'Daily announcements & community discussions.',
    icon: '✈️',
    link: 'https://t.me/+b14galHOAIs3ZmY0',
    badge: 'Primary Hub',
  },
  {
    name: 'YouTube',
    handle: 'The Werjih Society',
    description: 'Documentaries & oral history archives.',
    icon: '▶',
    link: '#',
    badge: 'Video Vault',
  },
  {
    name: 'Instagram',
    handle: '@werjih.society',
    description: 'Visual cultural landmarks & snapshots.',
    icon: '📸',
    link: '#',
    badge: 'Gallery',
  },
  {
    name: 'TikTok',
    handle: '@werjih_heritage',
    description: 'Short-form cultural proverbs & reels.',
    icon: '🎵',
    link: '#',
    badge: 'Reels',
  },
];

interface HeroItem {
  id: string;
  name?: string;
  title?: string;
  image_url?: string;
}

export default function Home() {
  const [activeSocial, setActiveSocial] = useState(socialChannels[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [showSellers, setShowSellers] = useState(false);
  const [heroes, setHeroes] = useState<HeroItem[]>([]);

  // Scroll parallax effects for hero elements
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const badgeY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -30]);
  const buttonsY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 30]);

  // Fetch heroes for the circular avatar preview stack
  useEffect(() => {
    async function fetchHeroes() {
      try {
        const { data, error } = await supabase.from("heroes").select("*");

        if (!error && data) {
          const formattedHeroes = data.map((item) => {
            let imgPath = item.image_url;

            if (imgPath && !imgPath.startsWith("http")) {
              const { data: publicUrlData } = supabase.storage
                .from("heroes")
                .getPublicUrl(imgPath);
              
              imgPath = publicUrlData.publicUrl;
            }

            return {
              ...item,
              image_url: imgPath || "",
            };
          });
          setHeroes(formattedHeroes);
        }
      } catch (err) {
        console.error("Error loading preview avatars:", err);
      }
    }
    fetchHeroes();
  }, []);

  const previewHeroes = heroes.slice(0, 3);

  // Ticker phrases array
  const tickerPhrases = [
    "GLOBAL GATHERING EVERY AUGUST 10TH",
    "PRESERVING OUR IDENTITY & HISTORY",
    "THE UNBROKEN GENERATIONAL SHIELD",
    "TRADE ROOTS & ANCESTRAL LEGACY"
  ];

  return (
    <main id="home" className="min-h-screen bg-[#0f0e0e] text-white selection:bg-[#d07f05] selection:text-black">
      
      {/* CINEMATIC HERO SECTION */}
      <HeroSection 
        shouldReduceMotion={shouldReduceMotion}
        badgeY={badgeY}
        buttonsY={buttonsY}
      />

      {/* BOTTOM TICKER BAR (Ceremonial Infinite Marquee) */}
      <div 
        className="relative w-full bg-[#0a0807] border-t border-b border-[#d07f05]/40 py-3.5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        ></div>

        <div className="flex whitespace-nowrap overflow-hidden">
          <div 
            className="flex items-center space-x-10 shrink-0"
            style={{
              animation: `marquee 45s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {tickerPhrases.map((phrase, index) => (
              <div key={index} className="flex items-center space-x-10">
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d07f05]/90 font-medium">
                  {phrase}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d07f05] animate-pulse"></span>
              </div>
            ))}
          </div>
          
          <div 
            className="flex items-center space-x-10 shrink-0 pl-10"
            style={{
              animation: `marquee 45s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
            aria-hidden="true"
          >
            {tickerPhrases.map((phrase, index) => (
              <div key={`dup-${index}`} className="flex items-center space-x-10">
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d07f05]/90 font-medium">
                  {phrase}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d07f05] animate-pulse"></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Foundational Leadership & Generational Hierarchy */}
      <section id="leadership" className="max-w-6xl mx-auto px-8 py-20">
        <LeadershipImage />
      </section>

      {/* Book Highlight & Compact Hover 3D Flipping Authorized Sellers Section */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-[#d07f05]/20">
        <div className="bg-[#161616] border border-[#d07f05]/30 rounded-xl p-5 md:p-6 shadow-xl">
          
          <BookAdvertSection />

          <div 
            className="mt-6 pt-5 border-t border-[#d07f05]/20 perspective-1000 group cursor-pointer"
            onMouseEnter={() => setShowSellers(true)}
            onMouseLeave={() => setShowSellers(false)}
          >
            <div 
              className={`relative w-full transition-transform duration-700 transform-style-3d ${
                showSellers ? "rotate-y-180" : ""
              }`}
            >
              
              {/* FRONT FACE: Call to Action */}
              <div className="w-full bg-[#121110] border border-[#d07f05]/30 rounded-lg p-4 text-center backface-hidden shadow-lg">
                <span className="px-2.5 py-0.5 mb-1.5 text-[9px] font-bold text-black bg-[#d07f05] rounded-full uppercase tracking-wider inline-block">
                  Get Your Copy
                </span>
                <h3 className="text-sm font-bold text-white mb-0.5">Authorized Book Sellers</h3>
                <p className="text-gray-400 text-[11px] mb-3">Distributors across Addis Ababa & surroundings.</p>
                
                <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-[#d07f05] bg-[#d07f05]/10 px-3 py-1.5 rounded-md border border-[#d07f05]/30 animate-pulse">
                  <span>Hover to View 5 Distributor Contacts</span>
                  <span>🔄</span>
                </div>
              </div>

              {/* BACK FACE: Contact List */}
              <div className="absolute inset-0 w-full h-full bg-[#121110] border border-[#d07f05]/40 rounded-lg p-4 backface-hidden rotate-y-180 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#d07f05]/20">
                    <h3 className="text-[11px] font-bold text-[#d07f05] uppercase tracking-wider">Authorized Distributors</h3>
                    <span className="text-[9px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">Scroll to view all</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] max-h-[95px] overflow-y-auto pr-1.5 custom-scrollbar">
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">1. Roza Siraj <span className="text-[#d07f05] text-[9px]">[Bethel]</span></span>
                      <a href="tel:0988022885" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0988022885</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">2. Hamid Hamza <span className="text-[#d07f05] text-[9px]">[Autobis Tera]</span></span>
                      <a href="tel:0911646448" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0911646448</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">3. Ali Usman <span className="text-[#d07f05] text-[9px]">[Jemo Mall]</span></span>
                      <a href="tel:0912008319" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0912008319</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">4. Hussein Ali <span className="text-[#d07f05] text-[9px]">[Daleti]</span></span>
                      <a href="tel:0922158994" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0922158994</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">5. Adam Mohammed <span className="text-[#d07f05] text-[9px]">[Sebeta]</span></span>
                      <a href="tel:0923433183" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0923433183</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <BeginJourneySection />

      {/* ========================================== */}
      {/* PILLARS OF LEGACY: HEROES PREVIEW SECTION */}
      {/* ========================================== */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="w-full bg-[#12100e] border border-[#d07f05]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
            {/* Left text description */}
            <div className="space-y-2 max-w-xl">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
                ★ Werjih Heroes &amp; Historical Figures
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f3ed]">
                Explore Our Documented Lineage &amp; Sacrifices
              </h3>
              <p className="text-[#ab9f94] text-sm font-sans font-light leading-relaxed">
                Discover the documented profiles, heroic sacrifices, and lifelong contributions of leaders who shaped our society.
              </p>
            </div>

            {/* Right side: Circular overlapping avatars + View Full Archive Button */}
            <div className="flex items-center gap-6 self-start md:self-center">
              
              {/* Overlapping Circles Preview */}
              <div className="flex -space-x-3 overflow-hidden">
                {previewHeroes.length > 0 ? (
                  previewHeroes.map((hero, index) => (
                    <div 
                      key={hero.id || index}
                      className="w-10 h-10 rounded-full border-2 border-[#12100e] overflow-hidden bg-black/60 flex items-center justify-center shadow-md relative"
                    >
                      {hero.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={hero.image_url} 
                          alt={hero.title || "Hero"} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="text-[9px] font-mono text-[#ab9f94]">0{index + 1}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-mono text-[#ab9f94]">Loading...</div>
                )}
              </div>

              {/* View Full Archive Button */}
              <Link 
                href="/heroes"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#d07f05] border border-[#d07f05]/40 hover:border-[#d07f05] px-5 py-3 rounded-xl transition-all duration-300 hover:bg-[#d07f05]/10 whitespace-nowrap"
              >
                <span>View Full Archive</span>
                <span>→</span>
              </Link>

            </div>

          </div>
        </div>
      </section>
      
      {/* ROOTS & HOMELAND MAP SECTION */}
      <RootsSection />

      {/* Interactive Core Sections */}
      <ContributionPortal />
      <AncestralTree />
      <EventsBoard />

      {/* ========================================== */}
      {/* Visual Heritage Slideshow */}
      {/* ========================================== */}
      <section className="py-20 px-6 bg-[#0a0806] border-t border-[#d07f05]/20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-[0.3em] text-[#d07f05] uppercase">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">Visual Heritage Slideshow</h2>
          <p className="text-gray-400 text-sm mt-1 max-w-xl mx-auto font-light">
            Glimpses into our ancestral artifacts, gatherings, and historical landmarks dynamically fetched from the archive database.
          </p>
        </div>

        <VisualHeritageSlideshow />
      </section>

      {/* Compact Interactive Social Pill Widget */}
      <section id="social-channels" className="max-w-4xl mx-auto px-8 py-20 border-t border-[#d07f05]/25 relative">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#d07f05] uppercase tracking-widest bg-[#d07f05]/10 px-3 py-1 rounded-full">
            Network Hub
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-2">
            Connect Across <span className="text-[#d07f05]">Platforms</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            Select a channel below to view handle details and instantly join our community space.
          </p>
        </div>

        <div className="bg-[#141313] border border-[#d07f05]/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {socialChannels.map((channel) => {
              const isSelected = activeSocial.name === channel.name;
              return (
                <button
                  key={channel.name}
                  onClick={() => setActiveSocial(channel)}
                  className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                    isSelected
                      ? "bg-[#d07f05] text-black border-[#d07f05] shadow-[0_0_20px_rgba(208,127,5,0.4)] scale-105"
                      : "bg-[#1a1919] text-gray-300 border-[#d07f05]/20 hover:border-[#d07f05]/60 hover:text-white"
                  }`}
                >
                  <span className="text-base">{channel.icon}</span>
                  <span>{channel.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-[#1a1919]/80 border border-[#d07f05]/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 text-[#d07f05] text-[10px] font-bold uppercase tracking-wider">
                  {activeSocial.badge}
                </span>
                <span className="text-xs font-mono text-gray-400">{activeSocial.handle}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{activeSocial.name} Channel</h3>
              <p className="text-gray-300 text-xs md:text-sm font-light max-w-md">
                {activeSocial.description}
              </p>
            </div>

            <a
              href={activeSocial.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (activeSocial.link === '#') {
                  e.preventDefault();
                  alert(`The ${activeSocial.name} link will be active once setup is complete.`);
                }
              }}
              className="px-6 py-3 bg-[#d07f05] text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-all shadow-lg flex items-center space-x-2 shrink-0"
            >
              <span>Join {activeSocial.name}</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      
      <footer className="relative bg-gradient-to-b from-[#060504] via-[#040302] to-[#020101] border-t border-[#d07f05]/20 mt-28 py-20 overflow-hidden text-gray-400 font-serif">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/50 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-[25rem] h-[15rem] bg-[#d07f05]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Brand & Legacy */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-[9px] font-mono tracking-[0.3em] uppercase text-[#d07f05] bg-[#d07f05]/10 px-3.5 py-1 rounded-full border border-[#d07f05]/25">
              <span>✦ SANCTUARY & LEGACY ✦</span>
            </div>
            <div className="text-xl font-normal text-white tracking-wide">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b47525] via-[#d9822b] to-[#915412] font-semibold italic">TIGRI WERJIH&apos;S</span>
            </div>
            <p className="text-xs font-sans font-light text-[#ab9f94] leading-relaxed max-w-sm">
              Preserving our history, honoring our ancestral trade routes, and uniting our global community across generations with enduring pride.
            </p>
          </div>

          {/* Column 2: Navigation / Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05]">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link href="/" className="hover:text-[#d07f05] transition-colors flex items-center gap-2 group">
                  <span className="text-[#d07f05] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span> Home Chronicle
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-[#d07f05] transition-colors flex items-center gap-2 group">
                  <span className="text-[#d07f05] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span> History & Lineage
                </Link>
              </li>
              <li>
                <Link href="/#notice" className="hover:text-[#d07f05] transition-colors flex items-center gap-2 group">
                  <span className="text-[#d07f05] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span> Community & Notice
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-[#d07f05] transition-colors flex items-center gap-2 group">
                  <span className="text-[#d07f05] opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span> Digital Archive Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Annual Gathering */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05]">Annual Gathering</h4>
            <p className="text-xs font-sans font-light text-[#ab9f94]">
              Held every August 10th globally to celebrate our roots, share stories, and strengthen kinship bonds.
            </p>
            <div>
              <Link 
                href="/#notice" 
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d07f05] bg-[#d07f05]/10 border border-[#d07f05]/30 hover:bg-[#d07f05] hover:text-black py-2 px-4 rounded-xl transition-all duration-300"
              >
                Register Now &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="max-w-6xl mx-auto px-8 pt-8 border-t border-[#221c17] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#8c7e72] gap-4">
          <p>&copy; {new Date().getFullYear()} The Werjih Society. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#d07f05]/80">Built with pride, heritage, and lineage.</p>
        </div>

      </footer>
    </main>
  );
}

      