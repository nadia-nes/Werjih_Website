'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OriginsPage() {
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

      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        
        {/* EDITORIAL HERO */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D66D13]/20 text-[#D66D13] text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D66D13] animate-pulse" />
            The Heritage Archive • Origins
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            Origins: Where the Werji Come From <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e68a33] via-[#D66D13] to-[#a34b07]">
              Before Written History
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed italic">
              Before written history, there was a word—and the word already explained everything.
            </p>
          </div>
        </header>

        {/* SECTION ONE: THE FOUNDATION */}
        <div className="mb-20">
          <div className="relative -ml-6 md:-ml-10 pl-6 md:pl-10 pb-4 border-b border-[#222] mb-12">
            <span className="text-[#D66D13] font-mono tracking-[0.2em] text-xs uppercase block">
              Section 01: Identity, Lineage & Trade Corridors
            </span>
          </div>

          <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
            
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Etymology & Language</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    The Name Tells the Story & The Language of the Road
                  </h2>
                </div>

                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  How &quot;Tigri-Werji&quot; defines a trade-bound identity and why they speak the languages of the road.
                </p>

                <div className="pt-1">
                  <button 
                    onClick={() => toggleCard('card1')}
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card1'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card1'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Tigri-Werji:</strong> Long before written chronicles, identity and occupation were one. &quot;Tigri&quot; originates from the Arabic word for merchant. Put simply, <strong className="text-white">Tigri-Werji</strong> means <em className="text-[#D66D13]">&quot;merchant of Werji.&quot;</em> To be Werji was to be a trader—building life out of routes, cross-border commerce, and movement rather than stone walls.</p>
                      
                      <p><strong className="text-white">A People Without a Single Bound Language:</strong> This explains why the Werji are uniquely one of the only ethnic groups in Ethiopia without a standalone native tongue. Those who make their living on the open road learn whatever language the road requires. Today, Werji communities fluently speak <strong className="text-white">Afaan Oromoo</strong> and <strong className="text-white">Amharic</strong>, holding faith, name, and collective memory as their true core.</p>
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
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Lineage</span>
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
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card2'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card2'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p>Ask Werji elders where their ancestors originated, and two narratives emerge, carried forward side by side rather than argued into one:</p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        <li><strong className="text-white">The Northern Branch:</strong> Traces back north to Tigray (preserving the distinct name <em className="text-[#D66D13]">Tigray-Werji</em>).</li>
                        <li><strong className="text-white">The Eastern Branch:</strong> Traces east to the ancient plateau of Harar (distinctly separating themselves from a related trading community called the <em className="text-[#D66D13]">Tegri</em> or <em className="text-[#D66D13]">Warjih Tegri</em>).</li>
                      </ul>
                      <p>Oral history points to the exact historical intersection: the <strong className="text-white">early 16th century</strong> in the highlands of north Shewa. Two historical currents meeting to form a single, enduring identity.</p>
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
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Faith & History</span>
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
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card3'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card3'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p>Long before Islam swept across the wider Horn of Africa, the Werji had already made it their foundational faith. Historical and academic accounts place their conversion as early as the <strong className="text-white">8th century</strong>, placing them inside the powerful orbit of the <strong className="text-white">Sultanate of Shewa</strong> by the 9th century.</p>
                      
                      <p>Alongside the ancient Gebel people (ancestors of the Argobba), the Werji carried Semitic language elements, faith, and high-altitude custom down from the Harari plateau directly into the Shewa plains—weaving a cultural thread that outlived regional kingdoms.</p>
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
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Trade Networks</span>
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
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card4'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card4'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Defended Corridors:</strong> By the 19th century, Werji trade networks controlled critical passages through the Awash valley, reaching west toward the Kingdom of Ennarea, the court of King Aba Jifar in Jimma, and Agaro. Trade was never a side job; it was the vessel that carried survival across turbulent centuries.</p>
                      
                      <p><strong className="text-white">Structural Political Influence:</strong> In Gibe-region kingdoms, the position of <em className="text-[#D66D13]">nagadras</em> (chief of trade and markets)—often doubling as provincial governors—was entrusted to master merchants. Werji traders stepped naturally into these roles because commerce was their lived legacy.</p>
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
            <span className="text-[#D66D13] font-mono tracking-[0.2em] text-xs uppercase block">
              Section 02: Demographics & Historical Evidence
            </span>
          </div>

          <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-16">
            
            {/* Card 5 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Demographics</span>
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
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card5'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card5'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p><strong className="text-white">Population Scale:</strong> Ethiopian census tracking places the Werji population between roughly <strong className="text-white">13,000 and 20,500 people</strong> (with <strong className="text-white">20,536</strong> logged in the 1994 census). A striking reminder that immense historical footprint does not require massive headcounts.</p>
                      
                      <p><strong className="text-white">Where They Reside Today:</strong></p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        <li><strong className="text-white">Core Hometown:</strong> Daleti (Shewa).</li>
                        <li><strong className="text-white">Regional Spread:</strong> Pastoral and rural trading communities across Shewa and Wollo.</li>
                        <li><strong className="text-white">Urban Hubs:</strong> Prominent commercial footholds in Addis Ababa and Kemise.</li>
                        <li><strong className="text-white">Broader Affiliations:</strong> Ethnographically linked with Muslim trading networks like the Jeberti, Gurage, Harari, Silte, Afar, and Argobba (known in Somali as <em className="text-[#D66D13]">Warjeex</em>).</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest bg-[#D66D13]/10 px-3 py-1 rounded-full border border-[#D66D13]/20">Visual Archives</span>
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
                    className="text-xs font-mono text-[#D66D13] hover:underline cursor-pointer flex items-center gap-1.5 bg-[#121212] px-4 py-2 rounded-lg border border-[#222] hover:border-[#D66D13]/30 transition-colors"
                  >
                    <span>{expandedCards['card6'] ? '− Hide Details' : '+ Read Detailed Record'}</span>
                  </button>
                  
                  {expandedCards['card6'] && (
                    <div className="mt-4 p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-300 font-serif text-sm leading-relaxed space-y-4 shadow-inner">
                      <p className="text-center text-[#e68a33] italic">
                        &quot;Before Danu, before Ture Waro, before Addis Ababa took its name from a flower: two horizons, one people, and a name that means merchant.&quot;
                      </p>

                      <div className="rounded-xl overflow-hidden border border-[#222] bg-[#0c0c0c] p-2">
                        <img 
                          src="origin-pictures/IMAGE 2026-08-13 20:06:26.jpg" 
                          alt="Awash Valley & Gibe Trade Routes" 
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                          className="w-full h-auto rounded-lg object-cover"
                        />
                        <p className="text-[11px] text-gray-400 text-center mt-2 font-mono">
                          Figure 2.1: Reconstructed 19th-century trade route corridor connecting the Awash Valley to Jimma and Ennarea.
                        </p>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-[#222] bg-[#0c0c0c] p-2 mt-4">
                        <img 
                          src="origin-pictures/IMAGE 2026-08-13 20:10:52.jpg" 
                          alt="Shewa Sultanate Archives" 
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
                          className="w-full h-auto rounded-lg object-cover"
                        />
                        <p className="text-[11px] text-gray-400 text-center mt-2 font-mono">
                          Figure 2.2: Primary medieval reference documentation tracking 8th-to-9th century Islamic trading settlements in the highlands.
                        </p>
                      </div>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#111] hover:bg-[#D66D13] hover:text-black hover:border-[#D66D13] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> Return to Home page
          </Link>
        </footer>

      </div>
    </div>
  );
}