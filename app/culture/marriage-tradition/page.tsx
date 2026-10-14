'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

// Each step's number and (language-neutral) chant. Text comes from messages "Marriage.steps.<key>".
const STEPS: { key: string; num: string; verse: string | null }[] = [
  { key: 's1', num: '01', verse: null },
  { key: 's2', num: '02', verse: null },
  { key: 's3', num: '03', verse: null },
  { key: 's4', num: '04', verse: '«ብቅል ሰበራው ዛሬ ነው ዝምታው ምድነው»' },
  { key: 's5', num: '05', verse: '«እንሾሽላ ቅጠሌ ዛሬ ነው ዛሬ: የጓሮዬ ጤና አዳም አብቢ በጣም»' },
  { key: 's6', num: '06', verse: '«እልል በይ ወፌ እልል በይ አሞራ ከእከለሊት... ኦ ኡስኮባይ እከሊት ዘበናይ»' },
  {
    key: 's7',
    num: '07',
    verse: `«ላኢላሀ ኢለላህ ላኢላሀ ኢለላህ ሙሀመደን ረሱሉላህ»\n«አላሁ አክበር አላሁ አክበር»\n\n«እንዳለሽ ፍርፋሪ, እንዳለሽ ፍራፋሪ, ደግመሽ ደጋግመሽ ዳሪ»`,
  },
  { key: 's8', num: '08', verse: null },
  {
    key: 's9',
    num: '09',
    verse: `«ሚዜ አቦሬ ሚዜ አቦሬ, ጉድህ ፈላ ዛሬ\nሚዜ ተላላ ሚዜ ተላላ, ተጋተር አተላ\nከሌለ ብሩ, ከእኛ ተበደሩ\nጎትት ጎትት ድመቴ, እሬሳ ወድቋል ከቤቴ»`,
  },
  { key: 's10', num: '10', verse: null },
  { key: 's11', num: '11', verse: null },
];

export default function MarriageTraditionPage() {
  const t = useTranslations('Marriage');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#D66D13] selection:text-black font-sans">
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D66D13]/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-24 relative z-10">
        {/* EDITORIAL HEADER */}
        <header className="text-center mb-20 scroll-mt-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D66D13]/20 text-[#D66D13] text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D66D13] animate-pulse" />
            {t('badge')}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            {t('titleA')} <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e68a33] via-[#D66D13] to-[#a34b07]">
              {t('titleB')}
            </span>
          </h1>

          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              {t.rich('intro', {
                hl: (chunks) => <span className="text-[#D66D13] italic">{chunks}</span>,
              })}
            </p>
          </div>
        </header>

        {/* TIMELESS CHRONICLE TIMELINE */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-20">
          {STEPS.map((step) => (
            <div key={step.key} className="relative group">
              {/* TIMELINE NODE MARKER */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />

              {/* STEP CARD CONTENT */}
              <div className="space-y-4">
                {/* META INFO */}
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest">
                    {step.num}
                  </span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    {t(`steps.${step.key}.title`)}
                  </h2>
                  {/* The Amharic name is only shown next to the English title */}
                  {locale !== 'am' && (
                    <span className="text-xs text-gray-500 font-serif italic">
                      ({t(`steps.${step.key}.amharic`)})
                    </span>
                  )}
                </div>

                {/* NARRATIVE TEXT */}
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  {t(`steps.${step.key}.content`)}
                </p>

                {/* TRADITIONAL VERSE / CHANT BLOCK (IF AVAILABLE) */}
                {step.verse && (
                  <div className="my-5 p-4 md:p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-200 font-serif text-sm italic leading-relaxed whitespace-pre-line shadow-inner">
                    {step.verse}
                  </div>
                )}

                {/* INTEGRATED MEDIA SLOT */}
                <div className="pt-2">
                  <div className="bg-[#101010] hover:bg-[#141414] transition-colors rounded-xl p-5 border border-[#222] hover:border-[#D66D13]/30 flex items-center justify-between group/slot cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl opacity-70 group-hover/slot:opacity-100 transition-opacity">
                        🎬
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        {t('mediaSlot', { num: step.num })}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#D66D13] opacity-0 group-hover/slot:opacity-100 transition-opacity">
                      {t('loadMedia')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NAVIGATION */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#111] hover:bg-[#D66D13] hover:text-black hover:border-[#D66D13] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> {t('back')}
          </Link>
        </footer>
      </div>
    </div>
  );
}