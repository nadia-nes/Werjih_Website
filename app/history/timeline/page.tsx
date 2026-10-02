'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState<'full' | 'part1' | 'part2'>('full');
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (cardKey: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }));
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#D66D13] selection:text-black font-sans relative">
      
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D66D13]/5 blur-[160px] rounded-full" />
      </div>

      {/* TIMELINE MAIN CONTAINER */}
      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">

        {/* TIMELINE HERO / EDITORIAL HEADER */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D66D13]/20 text-[#D66D13] text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D66D13] animate-pulse" />
            Chronological Archive & Heritage
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            Werji Historical Timeline <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e68a33] via-[#D66D13] to-[#a34b07]">
              Ancestral Chronicles
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed italic">
              A thousand-year journey through faith, trade corridors, imperial friction, and community survival.
            </p>
          </div>
          
          {/* VIEW SWITCHER TABS */}
          <div className="flex justify-center gap-3 flex-wrap mt-8">
            <button 
              onClick={() => setActiveTab('full')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'full' 
                  ? 'bg-[#D66D13] text-black font-medium shadow-[0_0_15px_rgba(214,109,19,0.3)]' 
                  : 'bg-[#121212] text-gray-400 border border-[#222] hover:border-[#D66D13]/40 hover:text-white'
              }`}
            >
              Full Timeline
            </button>
            <button 
              onClick={() => setActiveTab('part1')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'part1' 
                  ? 'bg-[#D66D13] text-black font-medium shadow-[0_0_15px_rgba(214,109,19,0.3)]' 
                  : 'bg-[#121212] text-gray-400 border border-[#222] hover:border-[#D66D13]/40 hover:text-white'
              }`}
            >
              Part One: Ancient & Medieval
            </button>
            <button 
              onClick={() => setActiveTab('part2')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'part2' 
                  ? 'bg-[#D66D13] text-black font-medium shadow-[0_0_15px_rgba(214,109,19,0.3)]' 
                  : 'bg-[#121212] text-gray-400 border border-[#222] hover:border-[#D66D13]/40 hover:text-white'
              }`}
            >
              Part Two: Menelik Era & Modern
            </button>
          </div>
        </header>

        {/* TIMELESS CHRONICLE TIMELINE TRACK */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-20">

          {/* PART ONE */}
          {(activeTab === 'full' || activeTab === 'part1') && (
            <div className="space-y-16" data-group="part1">
              
              {/* SECTION HEADING */}
              <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222]">
                <span className="text-[#D66D13] font-mono tracking-[0.2em] text-xs uppercase block">
                  Part One: Ancient & Medieval Origins (8th Century – Early 1500s)
                </span>
              </div>

              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">8th Century</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Islam Adopted Early
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Among the first peoples in the entire Horn of Africa to embrace Islam.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card1')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card1'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card1'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> The Werji accepted Islam centuries ahead of most neighboring groups. This deep, early spiritual alignment formed the bedrock of their identity, anchoring them as natural allies to later regional Muslim sultanates.</p>
                        <p className="text-xs text-gray-400 italic">Note: Entries before 1883 E.C. rest primarily on oral tradition and secondary academic sourcing.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">9th Century</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Under the Sultanate of Shewa
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Carried Semitic language and culture into the lowlands of Shewa.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card2')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card2'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card2'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Alongside the ancestors of today&apos;s Argobba people, the Werji transmitted high-altitude custom and Semitic language threads from the Harari plateau directly into the Shewan lowlands, outlasting the political boundaries of the era.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Middle Ages</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Allied with Ifat, then Adal
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Muslim sultanate alliances against Christian Abyssinian expansion.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card3')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card3'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card3'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> As Muslim power consolidated across the Horn, the Werji stood with it—allied with the Ifat Sultanate during its rise, and subsequently with the Adal Sultanate during the protracted Ethiopian–Adal War.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Early 1500s</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Two Branches Converge
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Tigray-descended and Harar-descended lines unite in north Shewa.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card4')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card4'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card4'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Oral tradition pins the physical convergence of the two ancestral streams to this exact era. The northern branch preserved its distinct title—<strong className="text-white">Tigray-Werji</strong>—as a permanent marker of the road they walked before becoming one community.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">16th Century Onward</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Oromo Expansion Pressure
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Linguistic assimilation begins; distinctive identity survives, centered on Daleti.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card5')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card5'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card5'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> As Oromo populations expanded northward, many local groups assimilated linguistically, adopting Afaan Oromoo. The Werji adapted to the language of the road while maintaining their core identity, anchoring themselves in their historic hometown of Daleti.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* PART TWO */}
          {(activeTab === 'full' || activeTab === 'part2') && (
            <div className="space-y-16 pt-6" data-group="part2">
              
              {/* SECTION HEADING */}
              <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222]">
                <span className="text-[#D66D13] font-mono tracking-[0.2em] text-xs uppercase block">
                  Part Two: The Menelik Era & Modern Settlement (19th Century – Present)
                </span>
              </div>

              {/* Card 6 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">19th Century</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Awash Valley Trade Held
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Caravan routes reach west toward the Kingdom of Ennarea.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card6')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card6'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card6'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Werji trade networks secured crucial passages through the Awash valley, feeding commercial networks reaching into Jimma&apos;s markets and the Gibe region under master traders like Nagadras Menase Hada.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 7 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">1883 E.C.</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Exiled from Danu
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Ture Waro leads the community&apos;s move to Salale under royal pressure.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card7')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card7'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card7'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Escalating imperial pressure from King Menelik forced a split: Ture Waro led followers to Salale where they were welcomed, while Sheikh Muhammed Danu&apos;s faction remained behind in Danu, triggering a historic stand.</p>
                        <p className="text-xs text-gray-400 italic">Note: Entries before 1883 E.C. rest primarily on oral tradition and secondary academic sourcing.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 8 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">1885–1888 E.C.</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Addis Ababa Founded
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Werji land on Entoto and labor absorbed into the new imperial capital.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card8')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card8'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card8'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Empress Taytu moved the royal camp to Entoto in 1885 E.C., where 82 Werji families were pressed into royal service. By 1888 E.C., the capital took root over land the community had long farmed and traded upon.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 9 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Post-Niggad</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Ture Waro Assassinated & Strategic Split
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Community divides into Hard Power (north) and Soft Power (south) strategies.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card9')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card9'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card9'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Following Turio Wario&apos;s assassination, Northern Shewa Werji chose confrontation, rerouting trade outward toward Sudan and Yemen. Southern Werji in Salale chose internal community, religion, and economic resilience.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 10 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">20th C. – Today</span>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                      Modern Settlement Pattern
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                    Centered on Daleti, with communities across Shewa, Wollo, Addis Ababa, and Kemise.
                  </p>

                  <div className="pt-1">
                    <button 
                      onClick={() => toggleCard('card10')}
                      className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                    >
                      <span>{expandedCards['card10'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                    </button>
                    
                    {expandedCards['card10'] && (
                      <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-3 shadow-inner">
                        <p><strong className="text-white">Detailed Record:</strong> Following succession disputes and the incorporation of Salale into Empress Menen&apos;s personal gult, the modern footprint stabilized. Census tracking registers the population between 13,000 and 20,500 people.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* FOOTER NAV RETURN */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#111] hover:bg-[#D66D13] hover:text-black hover:border-[#D66D13] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </div>
  );
}