'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface MigrationRecord {
  id: number;
  title?: string;
  description?: string;
  'image-url'?: string;
}

export default function MigrationPage() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [records, setRecords] = useState<MigrationRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const toggleCard = (cardKey: string) => {
    if (cardKey === 'era10' && records.length === 0) {
      fetchRecords();
    }
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  async function fetchRecords() {
    setLoadingRecords(true);
    try {
      const { data, error } = await supabase
        .from('migration-records')
        .select('*');

      if (error) {
        console.error('Error fetching from migration-records:', error.message);
      } else if (data) {
        setRecords(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoadingRecords(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#D66D13] selection:text-white font-sans relative">
      
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212] via-[#090909] to-[#070707]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D66D13]/[0.03] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        
        {/* EDITORIAL HERO */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D66D13]/30 text-gray-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D66D13] animate-pulse" />
            ✦ The Heritage Archive • Migration History ✦
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            Migration History of the Werjih <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D66D13] via-[#e88732] to-[#f4b06c]">
              A Thousand Years of Movement
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6 bg-[#121212]/40 backdrop-blur-md rounded-2xl px-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed italic">
              Tracing a thousand years of movement, trade, faith, and survival across the Horn of Africa.
            </p>
          </div>
        </header>

        {/* TIMELINE TRACK */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">

          {/* Era 1 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Pre-1500s – Early 1500s</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 1 — Two Branches, One Convergence
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Exploring the northern Tigray and eastern Harar ancestral streams converging in north Shewa.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era1')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era1'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era1'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>The migration history begins not with a single point of origin, but with two distinct geographical streams that eventually merged into one people:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li><strong className="text-white">The Northern Branch:</strong> Traces roots to Tigray, preserving the specific designation <strong className="text-white">Tigray-Werjih</strong> (*Təgray/i Wärğəḥ*) as a marker of their path.</li>
                      <li><strong className="text-white">The Eastern Branch:</strong> Traces ancestry to the ancient plateau of Harar (distinctly separating themselves from a related trading group, the *Tegri* or *Warjih Tegri*).</li>
                    </ul>
                    <p>Oral tradition pinpoints their physical convergence to the <strong className="text-white">early 16th century</strong> in the highlands of north Shewa.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 2 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">8th–9th Centuries</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 2 — Faith Before Empire
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Tracing their early acceptance of Islam and their Semitic cultural transmission into the Shewan lowlands.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era2')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era2'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era2'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>Predating the Shewan convergence, the spiritual foundation of the Werjih shaped every subsequent movement. The Werjih were among the earliest groups in the entire Horn of Africa to accept Islam, doing so as early as the <strong className="text-white">8th century</strong>.</p>
                    <p>By the 9th century, they resided within the historic <strong className="text-white">Sultanate of Shewa</strong>. Alongside the Gebel people (ancestors of today’s Argobba), they carried Semitic language elements and high-altitude customs down into the Shewan lowlands, forging an identity that anchored future trade and politics.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 3 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Middle Ages – 16th Century</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 3 — Siding With the Sultanates
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Reviewing their alliances with the Ifat and Adal Sultanates along the regional frontier.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era3')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era3'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era3'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>As Islamic political power consolidated, the Werjih integrated directly into its defense and administration. They allied with the <strong className="text-white">Ifat Sultanate</strong> during its medieval rise and subsequently with the <strong className="text-white">Adal Sultanate</strong> during the protracted Ethiopian–Adal War.</p>
                    <p>Positioned on the frontier between Muslim sultanates and Christian highlands, commercial routes and military alliances went hand in hand.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 4 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">16th Century Onward</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 4 — The Oromo Expansion & Assimilation Pressure
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Seeing how they preserved their distinct identity despite regional restructuring and linguistic shifts.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era4')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era4'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era4'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>Centuries of regional conflict destabilized borders, opening the door for Oromo northward migration into lands previously held by groups like the Werjih. While many local communities assimilated, adopting Afaan Oromoo and blending into the social fabric, the Werji retained their distinct ethnic core.</p>
                    <p>They adopted Amharic and Afaan Oromoo as languages of the road, but preserved their memory anchored in their historic hometown of <strong className="text-white">Daleti</strong>, Shewa.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 5 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">19th Century</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 5 — Holding the Awash Trade Corridor
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Inspecting caravan routes connecting the Awash valley to Jimma, Ennarea, and Agaro.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era5')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era5'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era5'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>By the 1800s, the Werjih dominated a vital economic geography: <strong className="text-white">the Awash valley</strong>. Caravan routes stretched westward toward the Kingdom of Ennarea.</p>
                    <p>This network connects directly to the community&apos;s internal records (<em className="text-[#D66D13]">The Werjih&apos;s: History of Trade and Struggle, Vol. 01</em>), detailing master merchants like <em className="text-[#D66D13]">Nagadras Menase Hada</em> operating inside King Aba Jifar’s court in Jimma.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 6 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Late 19th Century</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 6 — Danu & Imperial Pressure
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Learning about the 1883 E.C. displacement crisis, the Salale relocation, and the Danu stand.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era6')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era6'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era6'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>Under Menelik&apos;s expanding Shewan crown, Werji settlements centered around <strong className="text-white">Danu</strong> (near Yerer Mountain) faced heavy pressure. In <strong className="text-white">1883 E.C.</strong>, the community split geographically:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li><strong className="text-white">Ture Waro and followers</strong> moved to Salale, where local Werjih welcomed them and accepted Ture Waro as leader.</li>
                      <li><strong className="text-white">Sheikh Muhammed Danu and followers</strong> remained in Danu, leading directly to the historic &quot;dig your own graves&quot; confrontation with imperial forces.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 7 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">1885–1888 E.C.</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 7 — Entoto & the Founding of Addis Ababa
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Uncovering how urban expansion swallowed settled Werjih lands on Entoto.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era7')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era7'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era7'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>When the imperial court relocated first to Entoto under Empress Taytu, then to the newly founded capital of <strong className="text-white">Addis Ababa</strong>—Werjih communities farming and trading on those lands were absorbed by urban growth.</p>
                    <p>82 Werjih families on Entoto were pressed into royal service, while those refusing were displaced to Yerer Balo as the capital expanded over community land.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 8 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Post-Niggad Era</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 8 — The Post-Assassination Strategic Fracture
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Exploring the split between northern trade realignment with Sudan/Yemen and southern integration.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era8')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era8'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era8'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>Following Turio Wario&apos;s assassination at Niggad, the Werjih population split along profound strategic lines:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li><strong className="text-white">Northern Shewa Werjih</strong> (Niggad, Sanzakba, Danu, Karsa, etc.) chose economic resistance, rerouting trade away from central markets toward <strong className="text-white">Sudan and Yemen</strong>.</li>
                      <li><strong className="text-white">Southern/Southwestern Werjih</strong> (Salale) chose continued integration with the central economy, building security through internal community cohesion.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 9 */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">20th Century – Present</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 9 — Settling Into the Modern Pattern
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Viewing current demographic footprints, census statistics, and modern city bases.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era9')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era9'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era9'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    <p>Following post-conflict boundary shifts and the incorporation of Salale into Empress Menen&apos;s landholding (<em className="text-[#D66D13]">gult</em>), the contemporary distribution took shape:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li><strong className="text-white">Daleti</strong> remains the primary ancestral hometown.</li>
                      <li>Communities are dispersed across <strong className="text-white">Shewa and Wollo</strong>.</li>
                      <li>Urban footholds remain active in <strong className="text-white">Addis Ababa</strong> and <strong className="text-white">Kemise</strong>.</li>
                      <li>Official census counts place the population between <strong className="text-white">13,000 and 20,500 people</strong> (20,536 in 1994).</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Era 10 - DYNAMIC SUPABASE RECORDS */}
          <div className="relative group">
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13]/50 group-hover:border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_12px_rgba(214,109,19,0.3)]" />
            
            <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#D66D13]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Visual Archives</span>
                <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                  Era 10 — Migration Mapping & Records
                </h2>
              </div>

              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                Examine historical migration paths and visual documentation retrieved from the archive.
              </p>

              <div className="pt-1">
                <button 
                  onClick={() => toggleCard('era10')}
                  className="text-xs font-mono text-[#D66D13] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#D66D13]/40 transition-all shadow-sm"
                >
                  <span>{expandedCards['era10'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                </button>
                
                {expandedCards['era10'] && (
                  <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                    {loadingRecords ? (
                      <div className="text-center py-8 text-xs font-mono tracking-widest text-[#D66D13]">
                        LOADING MIGRATION RECORDS FROM SUPABASE...
                      </div>
                    ) : records.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono text-gray-400">
                        No records found in the &apos;migration-records&apos; database table yet.
                      </div>
                    ) : (
                      <div className="space-y-6 mt-4">
                        {records.map((record) => {
                          const imageUrl = record['image-url'];
                          return (
                            <div key={record.id} className="rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a] p-3">
                              {imageUrl ? (
                                <div className="flex justify-center bg-black/40 rounded-lg p-2 overflow-hidden">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img 
                                    src={imageUrl} 
                                    alt={record.title || 'Migration Archive'} 
                                    className="max-h-80 w-auto rounded-md object-contain shadow-md"
                                  />
                                </div>
                              ) : (
                                <div className="py-6 text-center text-xs font-mono text-gray-500">
                                  [Image URL missing for this record]
                                </div>
                              )}
                              <p className="text-[11px] text-gray-400 text-center mt-3 font-mono">
                                <strong className="text-white uppercase tracking-wider">{record.title || 'Migration Record'}</strong>
                                {record.description && <span className="block mt-1 text-gray-400/80">{record.description}</span>}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#121212] hover:bg-[#D66D13] hover:text-white hover:border-[#D66D13] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </div>
  );
}
