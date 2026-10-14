'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Tab = 'full' | 'part1' | 'part2';

// Text lives in messages "Timeline.cards.<key>.*". "note" adds the oral-tradition note.
const CARDS: { key: string; part: 1 | 2; note?: boolean }[] = [
  { key: 't1', part: 1, note: true },
  { key: 't2', part: 1 },
  { key: 't3', part: 1 },
  { key: 't4', part: 1 },
  { key: 't5', part: 1 },
  { key: 't6', part: 2 },
  { key: 't7', part: 2, note: true },
  { key: 't8', part: 2 },
  { key: 't9', part: 2 },
  { key: 't10', part: 2 },
];

const TABS: Tab[] = ['full', 'part1', 'part2'];

export default function TimelinePage() {
  const t = useTranslations('Timeline');

  const [activeTab, setActiveTab] = useState<Tab>('full');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const rich = {
    b: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong>,
  };

  const renderCard = (card: { key: string; note?: boolean }) => {
    const open = !!expanded[card.key];
    const k = (name: string) => `cards.${card.key}.${name}`;

    return (
      <div key={card.key} className="relative group">
        <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />

        <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 transition-all duration-300 p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">
              {t(k('period'))}
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
              {t(k('title'))}
            </h2>
          </div>

          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
            {t(k('summary'))}
          </p>

          <div className="pt-1">
            <button
              onClick={() => toggle(card.key)}
              className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
            >
              <span>{open ? t('hide') : t('read')}</span>
            </button>

            {open && (
              <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                <p>{t.rich(k('detail'), rich)}</p>
                {card.note && (
                  <p className="text-xs text-gray-400 italic">{t('note')}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const tabClass = (tab: Tab) =>
    `px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
      activeTab === tab
        ? 'bg-[#e88d22] text-white font-medium shadow-[0_0_15px_rgba(232,141,34,0.3)]'
        : 'bg-[#121212] text-gray-400 border border-[#222] hover:border-[#e88d22]/40 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#e88d22] selection:text-white font-sans relative">
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212] via-[#090909] to-[#070707]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e88d22]/[0.03] blur-[160px] rounded-full" />
      </div>

      {/* TIMELINE MAIN CONTAINER */}
      <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-24 relative z-10">
        {/* TIMELINE HERO / EDITORIAL HEADER */}
        <header className="text-center mb-20 scroll-mt-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#e88d22]/30 text-gray-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e88d22] animate-pulse" />
            {t('badge')}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            {t('titleA')} <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D66D13] via-[#e88732] to-[#f4b06c]">
              {t('titleB')}
            </span>
          </h1>

          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6 bg-[#121212]/40 backdrop-blur-md rounded-2xl px-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed italic">
              {t('intro')}
            </p>
          </div>

          {/* VIEW SWITCHER TABS */}
          <div className="flex justify-center gap-3 flex-wrap mt-8">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(tab)}>
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </header>

        {/* TIMELESS CHRONICLE TIMELINE TRACK */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-20">
          {/* PART ONE */}
          {(activeTab === 'full' || activeTab === 'part1') && (
            <div className="space-y-16" data-group="part1">
              <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222]">
                <span className="text-[#e88d22] font-mono tracking-[0.2em] text-xs uppercase block">
                  {t('heads.part1')}
                </span>
              </div>
              {CARDS.filter((c) => c.part === 1).map(renderCard)}
            </div>
          )}

          {/* PART TWO */}
          {(activeTab === 'full' || activeTab === 'part2') && (
            <div className="space-y-16 pt-6" data-group="part2">
              <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222]">
                <span className="text-[#e88d22] font-mono tracking-[0.2em] text-xs uppercase block">
                  {t('heads.part2')}
                </span>
              </div>
              {CARDS.filter((c) => c.part === 2).map(renderCard)}
            </div>
          )}
        </div>

        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#121212] hover:bg-[#e88d22] hover:text-white hover:border-[#e88d22] transition-all duration-300 cursor-pointer no-underline shadow-lg font-medium"
          >
            <span>←</span> {t('back')}
          </Link>
        </footer>
      </div>
    </div>
  );
}