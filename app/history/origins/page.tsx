'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useLocale, useTranslations } from 'next-intl';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface OldMap {
  id: number;
  title?: string;
  title_am?: string | null; // optional new Supabase columns
  description?: string;
  description_am?: string | null;
  'image-url'?: string;
}

// Text lives in messages "Origins.cards.<card>.<key>". Blocks say which keys render, in order.
type Block =
  | { type: 'p'; key: string }
  | { type: 'ul'; keys: string[] }
  | { type: 'maps' };

const p = (key: string): Block => ({ type: 'p', key });
const ul = (...keys: string[]): Block => ({ type: 'ul', keys });

const SECTIONS: { titleKey: string; cards: { key: string; blocks: Block[] }[] }[] = [
  {
    titleKey: 'section1',
    cards: [
      { key: 'c1', blocks: [p('p1'), p('p2')] },
      { key: 'c2', blocks: [p('p1'), ul('l1', 'l2'), p('p2')] },
      { key: 'c3', blocks: [p('p1'), p('p2')] },
      { key: 'c4', blocks: [p('p1'), p('p2')] },
    ],
  },
  {
    titleKey: 'section2',
    cards: [
      { key: 'c5', blocks: [p('p1'), p('p2'), ul('l1', 'l2', 'l3', 'l4')] },
      { key: 'c6', blocks: [{ type: 'maps' }] },
    ],
  },
];

export default function OriginsPage() {
  const t = useTranslations('Origins');
  const locale = useLocale();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [maps, setMaps] = useState<OldMap[]>([]);
  const [loadingMaps, setLoadingMaps] = useState(false);

  const toggle = (key: string) => {
    if (key === 'c6' && maps.length === 0) {
      fetchMaps();
    }
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  async function fetchMaps() {
    setLoadingMaps(true);
    try {
      const { data, error } = await supabase.from('old-maps').select('*');

      if (error) {
        console.error('Error fetching from old-maps:', error.message);
      } else if (data) {
        setMaps(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoadingMaps(false);
    }
  }

  const rich = {
    b: (chunks: React.ReactNode) => <strong className="text-white">{chunks}</strong>,
    hl: (chunks: React.ReactNode) => <em className="text-[#e88d22]">{chunks}</em>,
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#e88d22] selection:text-white font-sans relative">
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212] via-[#090909] to-[#070707]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e88d22]/[0.03] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-24 relative z-10">
        {/* EDITORIAL HERO */}
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
        </header>

        {SECTIONS.map((section) => (
          <div key={section.titleKey} className="mb-20">
            <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222] mb-12">
              <span className="text-[#e88d22] font-mono tracking-[0.2em] text-xs uppercase block">
                {t(section.titleKey)}
              </span>
            </div>

            <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
              {section.cards.map((card) => {
                const open = !!expanded[card.key];
                const k = (name: string) => `cards.${card.key}.${name}`;

                return (
                  <div key={card.key} className="relative group">
                    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />

                    <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">
                          {t(k('badge'))}
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
                          <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                            {card.blocks.map((block, i) => {
                              if (block.type === 'p') {
                                return <p key={i}>{t.rich(k(block.key), rich)}</p>;
                              }
                              if (block.type === 'ul') {
                                return (
                                  <ul key={i} className="list-disc pl-5 space-y-2 text-gray-400">
                                    {block.keys.map((li) => (
                                      <li key={li}>{t.rich(k(li), rich)}</li>
                                    ))}
                                  </ul>
                                );
                              }

                              // maps block (card c6)
                              return (
                                <div key={i} className="space-y-4">
                                  <p className="text-center text-[#e88d22] italic">
                                    {t(k('quote'))}
                                  </p>

                                  {loadingMaps ? (
                                    <div className="text-center py-8 text-xs font-mono tracking-widest text-[#e88d22]">
                                      {t('maps.loading')}
                                    </div>
                                  ) : maps.length === 0 ? (
                                    <div className="text-center py-8 text-xs font-mono text-gray-400">
                                      {t('maps.none')}
                                    </div>
                                  ) : (
                                    <div className="space-y-6 mt-4">
                                      {maps.map((map) => {
                                        const imageUrl = map['image-url'];
                                        const mapTitle =
                                          (locale === 'am' && map.title_am) ||
                                          map.title ||
                                          t('maps.defaultTitle');
                                        const mapDescription =
                                          (locale === 'am' && map.description_am) ||
                                          map.description;

                                        return (
                                          <div
                                            key={map.id}
                                            className="rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a] p-3"
                                          >
                                            {imageUrl ? (
                                              <div className="flex justify-center bg-black/40 rounded-lg p-2 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                  src={imageUrl}
                                                  alt={mapTitle || t('maps.defaultAlt')}
                                                  className="max-h-80 w-auto rounded-md object-contain shadow-md"
                                                />
                                              </div>
                                            ) : (
                                              <div className="py-6 text-center text-xs font-mono text-gray-500">
                                                {t('maps.imageMissing')}
                                              </div>
                                            )}
                                            <p className="text-[11px] text-gray-400 text-center mt-3 font-mono">
                                              <strong className="text-white uppercase tracking-wider">
                                                {mapTitle}
                                              </strong>
                                              {mapDescription && (
                                                <span className="block mt-1 text-gray-400/80">
                                                  {mapDescription}
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#121212] hover:bg-[#e88d22] hover:text-white hover:border-[#e88d22] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> {t('back')}
          </Link>
        </footer>
      </div>
    </div>
  );
}