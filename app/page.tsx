"use client";

// Components
import Hero from "@/components/HeroSection";
import CeremonialTicker from "@/components/CeremonialTicker";
import UnfoldHistory from "@/components/UnfoldHistory";
import LeadershipImage from "@/components/leadership-image";
import BeginJourneySection from "@/components/BeginJourneySection";
import HeroesPreview from "@/components/HeroesPreview";
import RootsSection from "@/components/RootsSection";
import AncestralTree from "@/components/AncestralTree";
import EventsBoard from "@/components/EventsBoard";
import ContributionPortal from "@/components/ContributionPortal";
import BookAdvertSection from "@/components/Book-advert";
import VisualHeritageSlideshow from "@/components/VisualHeritageSlideshow";
import SocialChannelsWidget from "@/components/SocialChannelsWidget";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen overflow-x-clip bg-[#0f0e0e] text-white text-base selection:bg-[#d07f05] selection:text-black"
    >
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. CEREMONIAL INFINITE TICKER BAR */}
      <CeremonialTicker />

      {/* 2b. UNFOLD HISTORY */}
      <UnfoldHistory />

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
      <HeroesPreview />

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
      <VisualHeritageSlideshow />

      {/* 10. SOCIAL CHANNELS WIDGET */}
      <SocialChannelsWidget />

      {/* 11. FOOTER */}
      <Footer />
    </main>
  );
}