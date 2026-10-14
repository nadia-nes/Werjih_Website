'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Text lives in messages "Migration.eras.<era>.<key>". Blocks say which keys render, in order.
type Block =
  | { type: 'p'; key: string }
  | { type: 'ul'; keys: string[] }
  | { type: 'boxes'; keys: string[] };

const p = (key: string): Block => ({ type: 'p', key });
const ul = (...keys: string[]): Block => ({ type: 'ul', keys });

const ERAS: { key: string; blocks: Block[] }[] = [
  { key: 'e1', blocks: [p('p1'), ul('l1', 'l2'), p('p2')] },
  { key: 'e2', blocks: [p('p1'), p('p2')] },
  { key: 'e3', blocks: [p('p1'), p('p2')] },
  { key: 'e4', blocks: [p('p1'), p('p2')] },
  { key: 'e5', blocks: [p('p1'), p('p2')] },
  { key: 'e6', blocks: [p('p1'), ul('l1', 'l2')] },
  { key: 'e7', blocks: [p('p1'), p('p2')] },
  { key: 'e8', blocks: [p('p1'), ul('l1', 'l2')] },
  { key: 'e9', blocks: [p('p1'), ul('l1', 'l2', 'l3', 'l4')] },
  { key: 'e10', blocks: [p('p1'), { type: 'boxes', keys: ['b1', 'b2'] }] },
];

export default function MigrationPage() {
  const t = useTranslations('Migration');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

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

        {/* TIMELINE TRACK */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
          {ERAS.map((era) => {
            const open = !!expanded[era.key];
            const k = (name: string) => `eras.${era.key}.${name}`;

            return (
              <div key={era.key} className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />

                <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
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
                      onClick={() => toggle(era.key)}
                      className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                    >
                      <span>{open ? t('hide') : t('read')}</span>
                    </button>

                    {open && (
                      <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                        {era.blocks.map((block, i) => {
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
                          return (
                            <div key={i} className="space-y-3 pt-2 text-gray-400 font-light text-sm">
                              {block.keys.map((b) => (
                                <div
                                  key={b}
                                  className="p-3 rounded-lg bg-[#121212] border border-[#222]"
                                >
                                  <strong className="text-white block font-mono text-xs mb-1 text-[#e88d22]">
                                    {t(k(`${b}Title`))}
                                  </strong>
                                  {t(k(`${b}Text`))}
                                </div>
                              ))}
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