// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Components
import Reveal from "@/components/Reveal";
import Hero from "@/components/HeroSection";
import LeadershipImage from "@/components/leadership-image";
import BeginJourneySection from "@/components/BeginJourneySection";
import RootsSection from "@/components/RootsSection";
import AncestralTree from "@/components/AncestralTree";
import EventsBoard from "@/components/EventsBoard";
import ContributionPortal from "@/components/ContributionPortal";
import BookAdvertSection from "@/components/Book-advert";
import VisualHeritageSlideshow from "@/components/VisualHeritageSlideshow";

// Social Channels Configuration
const socialChannels = [
  {
    name: "Telegram",
    handle: "@WerjihSociety",
    description: "Daily announcements & community discussions.",
    icon: "✈️",
    link: "https://t.me/+b14galHOAIs3ZmY0",
    badge: "Primary Hub",
  },
  {
    name: "YouTube",
    handle: "The Werjih Society",
    description: "Documentaries & oral history archives.",
    icon: "▶",
    link: "",
    badge: "Video Vault",
  },
  {
    name: "Instagram",
    handle: "@werjih.society",
    description: "Visual cultural landmarks & snapshots.",
    icon: "📸",
    link: "#",
    badge: "Gallery",
  },
  {
    name: "TikTok",
    handle: "@werjih_heritage",
    description: "Short-form cultural proverbs & reels.",
    icon: "🎵",
    link: "#",
    badge: "Reels",
  },
];

const tickerPhrases = [
  "GLOBAL GATHERING EVERY AUGUST 10TH",
  "PRESERVING OUR IDENTITY & HISTORY",
  "THE UNBROKEN GENERATIONAL SHIELD",
  "TRADE ROOTS & ANCESTRAL LEGACY",
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#leadership", label: "History & Lineage" },
  { href: "/#community", label: "Community & Clans" },
  { href: "/heroes", label: "Heroes & Figures" },
  { href: "/archive", label: "Digital Archive" },
  { href: "/#social-channels", label: "Social Channels" },
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
  const [heroes, setHeroes] = useState<HeroItem[]>([]);

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

  const socialComingSoon = !activeSocial.link || activeSocial.link === "#";

  const tickerMask = {
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  };

  return (
    <main
      id="home"
      className="min-h-screen overflow-x-clip bg-[#0f0e0e] text-white text-base selection:bg-[#d07f05] selection:text-black"
    >
      {/* 1. HERO SECTION (not wrapped, it's the first thing people see) */}
      <Hero />

      {/* 2. CEREMONIAL INFINITE TICKER BAR */}
      <div
        className="relative w-full bg-[#0a0807] border-t border-b border-[#d07f05]/40 py-3.5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex whitespace-nowrap overflow-hidden" style={tickerMask}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center space-x-10 shrink-0 pr-10"
              style={{
                animation: `marquee 45s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {tickerPhrases.map((phrase, index) => (
                <div key={`${copy}-${index}`} className="flex items-center space-x-10">
                  <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d07f05]/90 font-medium">
                    {phrase}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d07f05] animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

      {/* 3. FOUNDATIONAL LEADERSHIP SECTION */}
      <section
        id="leadership"
        className="max-w-6xl mx-auto px-4 md:px-8 py-6 border-t border-[#d07f05]/20"
      >
        <Reveal>
          <LeadershipImage />
        </Reveal>
      </section>

      {/* 4. BEGIN JOURNEY SECTION */}
      <section className="border-t border-[#d07f05]/20">
        <Reveal>
          <BeginJourneySection />
        </Reveal>
      </section>

      {/* 5. HEROES PREVIEW SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#d07f05]/20">
        <Reveal direction="zoom">
          <div className="w-full bg-[#12100e] border border-[#d07f05]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
                  ★ Werjih Heroes &amp; Historical Figures
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f3ed]">
                  Explore Our Documented Lineage &amp; Sacrifices
                </h3>
                <p className="text-[#ab9f94] text-sm font-sans font-light leading-relaxed">
                  Discover the documented profiles, heroic sacrifices, and lifelong contributions
                  of leaders who shaped our society.
                </p>
              </div>

              <div className="flex items-center gap-6 self-start md:self-center">
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
        </Reveal>
      </section>

      {/* 6. ROOTS & HOMELAND MAP */}
      <section className="border-t border-[#d07f05]/20">
        <Reveal direction="zoom">
          <RootsSection />
        </Reveal>
      </section>

      {/* 7. ANCESTRAL TREE, EVENTS & CONTRIBUTIONS */}
      <section className="border-t border-[#d07f05]/20">
        <Reveal direction="right">
          <AncestralTree />
        </Reveal>
      </section>

      <section className="border-t border-[#d07f05]/20">
        <Reveal>
          <EventsBoard />
        </Reveal>
      </section>

      <section className="border-t border-[#d07f05]/20">
        <Reveal direction="left">
          <ContributionPortal />
        </Reveal>
      </section>

      {/* 8. BOOK ADVERT SECTION */}
      <section className="border-t border-[#d07f05]/20">
        <Reveal direction="left">
          <BookAdvertSection />
        </Reveal>
      </section>

      {/* 9. VISUAL HERITAGE SLIDESHOW */}
      <section className="py-20 px-6 bg-[#0a0806] border-t border-[#d07f05]/20">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-[0.3em] text-[#d07f05] uppercase">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
              Visual Heritage Slideshow
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl mx-auto font-light">
              Glimpses into our ancestral artifacts, gatherings, and historical landmarks
              dynamically fetched from the archive database.
            </p>
          </div>
          <VisualHeritageSlideshow />
        </Reveal>
      </section>

      {/* 10. SOCIAL CHANNELS WIDGET */}
      <section
        id="social-channels"
        className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-14 border-t border-[#d07f05]/25 relative"
      >
        <style>{`
          @keyframes socialIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
          .social-in { animation: socialIn .35s ease-out both }
          @media (prefers-reduced-motion: reduce) { .social-in { animation: none } }
        `}</style>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] bg-[#d07f05]/10 rounded-full blur-[100px] pointer-events-none" />

        <Reveal direction="zoom">
          <div className="relative text-center mb-7">
            <span className="text-[10px] font-bold text-[#d07f05] uppercase tracking-[0.25em] bg-[#d07f05]/10 px-3 py-1 rounded-full border border-[#d07f05]/20">
              Network Hub
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-1.5">
              Connect Across <span className="text-[#d07f05]">Platforms</span>
            </h2>
            <p className="text-gray-400 text-xs">Tap a channel to see its details and join.</p>
          </div>

          <div className="relative rounded-2xl border border-[#d07f05]/30 bg-[#141313]/90 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d07f05]/50 to-transparent" />

            {/* Icon dock */}
            <div className="flex items-start justify-center gap-3 sm:gap-5 px-4 pt-6 pb-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {socialChannels.map((channel) => {
                const isSelected = activeSocial.name === channel.name;
                return (
                  <button
                    key={channel.name}
                    type="button"
                    onClick={() => setActiveSocial(channel)}
                    aria-pressed={isSelected}
                    aria-label={channel.name}
                    className="group shrink-0 flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#d07f05] text-black border-[#d07f05] -translate-y-1 shadow-[0_10px_28px_rgba(208,127,5,0.45)]"
                          : "bg-[#1a1919] text-gray-300 border-[#d07f05]/20 group-hover:border-[#d07f05]/60 group-hover:-translate-y-0.5"
                      }`}
                    >
                      {channel.icon}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${
                        isSelected ? "text-[#d07f05]" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    >
                      {channel.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Details strip */}
            <div
              key={activeSocial.name}
              className="social-in border-t border-[#d07f05]/20 bg-[#1a1919]/80 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="min-w-0 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 text-[#d07f05] text-[10px] font-bold uppercase tracking-wider">
                    {activeSocial.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400 truncate">
                    {activeSocial.handle}
                  </span>
                </div>
                <p className="mt-1.5 text-gray-300 text-xs font-light leading-relaxed line-clamp-2 max-w-md">
                  {activeSocial.description}
                </p>
              </div>

              {socialComingSoon ? (
                <span className="shrink-0 px-5 py-2.5 rounded-full border border-dashed border-[#d07f05]/40 text-[#d07f05]/80 text-[11px] font-mono uppercase tracking-widest">
                  Coming soon
                </span>
              ) : (
                <a
                  href={activeSocial.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#d07f05] text-black font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-[#e8921a] transition-all duration-300 shadow-lg"
                >
                  Join {activeSocial.name} <span>&rarr;</span>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 11. FOOTER */}
      <footer className="relative mt-16 md:mt-24 overflow-hidden border-t border-[#d07f05]/20 bg-gradient-to-b from-[#080605] to-[#020101] font-serif text-gray-400">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[34rem] h-48 bg-[#d07f05]/10 rounded-full blur-[110px] pointer-events-none" />

        {/* Giant outlined watermark */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[28%] text-center font-bold leading-none whitespace-nowrap text-[19vw] md:text-[13rem] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(208,127,5,0.16)" }}
        >
          WERJIH&apos;S
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020101] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-24 md:pb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand + socials */}
            <div className="md:col-span-5 space-y-4">
              <span className="inline-flex items-center text-[9px] font-mono tracking-[0.3em] uppercase text-[#d07f05] bg-[#d07f05]/10 px-3.5 py-1 rounded-full border border-[#d07f05]/25">
                ✦ Sanctuary &amp; Legacy ✦
              </span>
              <div className="text-2xl md:text-3xl font-normal text-white tracking-wide leading-tight">
                THE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b47525] via-[#d9822b] to-[#915412] font-semibold italic">
                  TIGRI WERJIH&apos;S
                </span>
              </div>
              <p className="text-xs font-sans font-light text-[#ab9f94] leading-relaxed max-w-sm">
                Preserving our history, honoring our ancestral trade routes, and uniting our
                global community across generations with enduring pride.
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                {socialChannels.map((channel) => {
                  const live = !!channel.link && channel.link !== "#";
                  const circle =
                    "w-10 h-10 rounded-full border flex items-center justify-center text-base transition-all duration-300";

                  return live ? (
                    <a
                      key={channel.name}
                      href={channel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${channel.name} (opens in a new tab)`}
                      title={channel.name}
                      className={`${circle} border-[#d07f05]/40 bg-[#d07f05]/10 text-[#d07f05] hover:bg-[#d07f05] hover:text-black hover:-translate-y-0.5`}
                    >
                      {channel.icon}
                    </a>
                  ) : (
                    <span
                      key={channel.name}
                      title={`${channel.name}: coming soon`}
                      aria-label={`${channel.name}: coming soon`}
                      className={`${circle} border-white/10 bg-white/[0.02] text-gray-600 opacity-60 cursor-default`}
                    >
                      {channel.icon}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Explore */}
            <nav aria-label="Footer" className="md:col-span-3">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05] mb-4">
                Explore
              </h4>
              <ul className="space-y-1 font-sans text-sm">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 py-1.5 text-[#ab9f94] hover:text-white transition-colors"
                    >
                      <span className="h-px w-3 bg-[#d07f05]/40 transition-all duration-300 group-hover:w-7 group-hover:bg-[#d07f05]" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Join card */}
            <div className="md:col-span-4">
              <div className="rounded-2xl border border-[#d07f05]/30 bg-[#0f0b08]/80 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05]">
                  Be part of the story
                </h4>
                <p className="mt-2 text-xs font-sans font-light text-[#ab9f94] leading-relaxed">
                  Join our community, share your family&apos;s history, and gather with us at the
                  annual celebration.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={socialChannels[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d07f05] hover:bg-[#e8921a] text-black text-[11px] font-mono font-bold uppercase tracking-widest py-2.5 px-5 transition-colors"
                  >
                    Join on Telegram &rarr;
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/#contribution-portal"
                      className="text-center rounded-full border border-[#d07f05]/30 text-[#d07f05] hover:bg-[#d07f05]/10 text-[10px] font-mono uppercase tracking-wider py-2 transition-colors"
                    >
                      Contribute
                    </Link>
                    <Link
                      href="/#gatherings-events"
                      className="text-center rounded-full border border-[#d07f05]/30 text-[#d07f05] hover:bg-[#d07f05]/10 text-[10px] font-mono uppercase tracking-wider py-2 transition-colors"
                    >
                      Gathering
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-5 border-t border-[#221c17] flex items-center justify-between gap-4 text-[11px] font-sans text-[#8c7e72]">
            <div className="space-y-1">
              <p>&copy; {new Date().getFullYear()} The Werjih Society. All rights reserved.</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#d07f05]/80">
                Built with pride, heritage, and lineage.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="shrink-0 w-11 h-11 rounded-full border border-[#d07f05]/40 text-[#d07f05] text-lg flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
            >
              ↑
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}