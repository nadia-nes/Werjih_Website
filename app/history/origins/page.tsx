'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface OldMap {
  id: number;
  title?: string;
  description?: string;
  'image-url'?: string;
}

export default function OriginsPage() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [maps, setMaps] = useState<OldMap[]>([]);
  const [loadingMaps, setLoadingMaps] = useState(false);

  const toggleCard = (cardKey: string) => {
    if (cardKey === 'card6' && maps.length === 0) {
      fetchMaps();
    }
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  async function fetchMaps() {
    setLoadingMaps(true);
    try {
      const { data, error } = await supabase
        .from('old-maps')
        .select('*');

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

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#e88d22] selection:text-white font-sans relative">
      
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#121212] via-[#090909] to-[#070707]"></div>
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e88d22]/[0.03] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        
        {/* EDITORIAL HERO */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#e88d22]/30 text-gray-300 text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e88d22] animate-pulse" />
            ✦ The Heritage Archive • Origins ✦
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            Origins: Where the Werjih Come From <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D66D13] via-[#e88732] to-[#f4b06c]">
              Before Written History
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6 bg-[#121212]/40 backdrop-blur-md rounded-2xl px-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed italic">
              Before written history, there was a word and the word already explained everything.
            </p>
          </div>
        </header>

        {/* SECTION ONE: THE FOUNDATION */}
        <div className="mb-20">
          <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222] mb-12">
            <span className="text-[#e88d22] font-mono tracking-[0.2em] text-xs uppercase block">
              Section 01: Identity, Lineage & Trade Corridors
            </span>
          </div>

          <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
            
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Etymology & Language</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    The Name Tells the Story & The Language of the Road
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  How &quot;Tigri-Werjih&quot; defines a trade bound identity and why they speak the languages of the road.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card1')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card1'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card1'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Tigri Werjih:</strong> Long before written chronicles, identity and occupation were one. &quot;Tigri&quot; originates from the Arabic word for merchant. Put simply, <strong className="text-white">Tigri-Werjih</strong> means <em className="text-[#e88d22]">&quot;merchant of Werji.&quot;</em> To be Werjih was to be a trader building life out of routes, cross-border commerce, and movement rather than stone walls.</p>
                      
                      <p><strong className="text-white">A People Without a Single Bound Language:</strong> This explains why the Werjih are uniquely one of the only ethnic groups in Ethiopia without a standalone native tongue. Those who make their living on the open road learn whatever language the road requires. Today, Werjih communities fluently speak <strong className="text-white">Amharic</strong> and <strong className="text-white">Affan Oromo</strong>, holding faith, name, and collective memory as their true core.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Lineage</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    Two Rivers, One People: Dual Ancestry
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  The convergence of northern Tigray and eastern Harar lineages in 16th-century Shewa.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card2')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card2'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card2'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p>Ask Werjih elders where their ancestors originated, and two narratives emerge, carried forward side by side rather than argued into one:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong className="text-white">The Northern Branch:</strong> Traces back north to Tigray (preserving the distinct name <em className="text-[#e88d22]">Tigray-Werjih</em>).</li>
                        <li><strong className="text-white">The Eastern Branch:</strong> Traces east to the ancient plateau of Harar (distinctly separating themselves from a related trading community called the <em className="text-[#e88d22]">Tegri</em> or <em className="text-[#e88d22]">Warjih Tegri</em>).</li>
                      </ul>
                      <p>Oral history points to the exact historical intersection: the <strong className="text-white">early 16th century</strong> in the highlands of north Shewa. Two historical currents meeting to form a single, enduring identity.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Faith & History</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    Among the First to Believe
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  Tracing their early acceptance of Islam by the 8th century and their foundational cultural footprint in Shewa.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card3')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card3'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card3'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p>Long before Islam swept across the wider Horn of Africa, the Werjih had already made it their foundational faith. Historical and academic accounts place their conversion as early as the <strong className="text-white">8th century</strong>, placing them inside the powerful orbit of the <strong className="text-white">Sultanate of Shewa</strong> by the 9th century.</p>
                      
                      <p>Alongside the ancient Gebel people (ancestors of the Argobba), the Werji carried Semitic language elements, faith, and high altitude custom down from the Harari plateau directly into the Shewa plains weaving a cultural thread that outlived regional kingdoms.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Trade Networks</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    The Roads They Held & Centers of Power
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  How guarded Awash valley corridors and nagadras market authorities shaped regional courts.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card4')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card4'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card4'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Defended Corridors:</strong> By the 19th century, Werjih trade networks controlled critical passages through the Awash valley, reaching west toward the Kingdom of Ennarea, the court of King Aba Jifar in Jimma, and Agaro. Trade was never a side job; it was the vessel that carried survival across turbulent centuries.</p>
                      
                      <p><strong className="text-white">Structural Political Influence:</strong> In Gibe region kingdoms, the position of <em className="text-[#e88d22]">nagadras</em> (chief of trade and markets) often doubling as provincial governors was entrusted to master merchants. Werjih traders stepped naturally into these roles because commerce was their lived legacy.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION TWO: DEMOGRAPHICS & EVIDENCE */}
        <div className="mb-20">
          <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222] mb-12">
            <span className="text-[#e88d22] font-mono tracking-[0.2em] text-xs uppercase block">
              Section 02: Demographics & Historical Evidence
            </span>
          </div>

          <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
            
            {/* Card 5 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Demographics</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    Demographic Scale & Modern Settlements
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  Reviewing official census counts, modern hometown bases like Daleti, and broader ethnic alignments.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card5')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card5'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card5'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Population Scale:</strong> Ethiopian census tracking places the Werjih population between roughly <strong className="text-white">13,000 and 20,500 people</strong> (with <strong className="text-white">20,536</strong> logged in the 1994 census). A striking reminder that immense historical footprint does not require massive headcounts.</p>
                      
                      <p><strong className="text-white">Where They Reside Today:</strong></p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-400">
                        <li><strong className="text-white">Core Hometown:</strong> Daleti (Shewa).</li>
                        <li><strong className="text-white">Regional Spread:</strong> Pastoral and rural trading communities across Shewa and Wollo.</li>
                        <li><strong className="text-white">Urban Hubs:</strong> Prominent commercial footholds in Addis Ababa and Kemise.</li>
                        <li><strong className="text-white">Broader Affiliations:</strong> Ethnographically linked with Muslim trading networks like the Jeberti, Gurage, Harari, Silte, Afar, and Argobba (known in Somali as <em className="text-[#e88d22]">Warjeex</em>).</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 6 - DYNAMIC SUPABASE MAPS */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#e88d22]/50 group-hover:border-[#e88d22] group-hover:bg-[#e88d22] transition-all duration-300 shadow-[0_0_12px_rgba(232,141,34,0.3)]" />
              
              <div className="space-y-4 bg-gradient-to-b from-[#121212]/80 via-[#0d0d0d]/80 to-[#0a0a0a]/80 border border-[#222] hover:border-[#e88d22]/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#e88d22] font-mono text-xs tracking-widest bg-[#e88d22]/10 px-3 py-1 rounded-full border border-[#e88d22]/20">Visual Archives</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    Archival Evidence & Trade Route Map
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  Inspect historical trade maps, primary manuscripts, and visual reference layouts.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card6')}
                    className="text-xs font-mono text-[#e88d22] hover:text-white cursor-pointer flex items-center gap-1.5 bg-[#0a0a0a] px-4 py-2.5 rounded-xl border border-[#222] hover:border-[#e88d22]/40 transition-all shadow-sm"
                  >
                    <span>{expandedCards['card6'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card6'] && (
                    <div className="mt-4 p-5 rounded-xl bg-[#0a0a0a] border-l-2 border-[#e88d22] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p className="text-center text-[#e88d22] italic">
                        &quot;Before Danu, before Turio Wario, before Addis Ababa took its name from a flower: two horizons, one people, and a name that means merchant.&quot;
                      </p>

                      {loadingMaps ? (
                        <div className="text-center py-8 text-xs font-mono tracking-widest text-[#e88d22]">
                          LOADING ARCHIVED MAPS FROM SUPABASE...
                        </div>
                      ) : maps.length === 0 ? (
                        <div className="text-center py-8 text-xs font-mono text-gray-400">
                          No maps found in the &apos;old-maps&apos; database table yet.
                        </div>
                      ) : (
                        <div className="space-y-6 mt-4">
                          {maps.map((map) => {
                            const imageUrl = map['image-url'];
                            return (
                              <div key={map.id} className="rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a] p-3">
                                {imageUrl ? (
                                  <div className="flex justify-center bg-black/40 rounded-lg p-2 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                      src={imageUrl} 
                                      alt={map.title || 'Historical Map Archive'} 
                                      className="max-h-80 w-auto rounded-md object-contain shadow-md"
                                    />
                                  </div>
                                ) : (
                                  <div className="py-6 text-center text-xs font-mono text-gray-500">
                                    [Image URL missing for this record]
                                  </div>
                                )}
                                <p className="text-[11px] text-gray-400 text-center mt-3 font-mono">
                                  <strong className="text-white uppercase tracking-wider">{map.title || 'Historical Map'}</strong>
                                  {map.description && <span className="block mt-1 text-gray-400/80">{map.description}</span>}
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
        </div>

        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#121212] hover:bg-[#e88d22] hover:text-white hover:border-[#e88d22] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </div>
  );
}