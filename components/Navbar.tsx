'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeAll = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (prefix: string) => pathname?.startsWith(prefix);

  return (
    <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md py-3 sm:py-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Main 3D Floating Glass Navigation Shell */}
        <nav className="w-full mx-auto flex items-center justify-between px-4 sm:px-8 h-20 sm:h-24 rounded-2xl bg-gradient-to-b from-[#1c140d] via-[#120d09] to-[#0a0705] backdrop-blur-2xl border border-[#d07f05]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-visible">
          
          {/* Subtle Ambient Top Rim Light */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent" />

          {/* MOBILE LOGO */}
          <div className="flex md:hidden items-center">
            <Link href="/" onClick={closeAll} className="font-serif tracking-widest leading-none">
              <span className="block text-[8px] text-[#d07f05] font-sans tracking-[0.3em] uppercase">THE TIGRI</span>
              <span className="block text-sm font-bold text-[#f4e8d1] tracking-[0.15em] uppercase">WERJIHS</span>
            </Link>
          </div>

          {/* DESKTOP LEFT SECTION: Home, History, Culture */}
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
            <li>
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-xl transition-all duration-300 inline-flex items-center gap-2 ${
                  isActive('/') && pathname === '/' 
                    ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                    : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
                }`}
              >
                <span>HOME</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive('/') && pathname === '/' ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-transparent'}`} />
              </Link>
            </li>
            
            {/* History Dropdown */}
            <li className="relative group py-2">
              <button className={`px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none ${
                isParentActive('/history') 
                  ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                  : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
              }`}>
                <span>HISTORY</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isParentActive('/history') ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-[#d07f05]/30 group-hover:bg-[#d07f05]'}`} />
                <span className="text-[7px] text-[#d07f05]/70 group-hover:rotate-180 transition-transform duration-300">▼</span>
              </button>
              
              <div className="absolute top-full left-0 w-72 bg-[#120d09]/98 border border-[#d07f05]/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] py-3 mt-3 z-50 backdrop-blur-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                <div className="px-3 space-y-1">
                  <Link href="/history/origins" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/history/origins') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/history/origins') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Origins of the Werji People
                  </Link>
                  <Link href="/history/migration" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/history/migration') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/history/migration') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Migration History
                  </Link>
                  <Link href="/history/timeline" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/history/timeline') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/history/timeline') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Historical Timeline
                  </Link>
                </div>
              </div>
            </li>

            {/* Culture Dropdown */}
            <li className="relative group py-2">
              <button className={`px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none ${
                isParentActive('/culture') 
                  ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                  : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
              }`}>
                <span>CULTURE</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isParentActive('/culture') ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-[#d07f05]/30 group-hover:bg-[#d07f05]'}`} />
                <span className="text-[7px] text-[#d07f05]/70 group-hover:rotate-180 transition-transform duration-300">▼</span>
              </button>
              
              <div className="absolute top-full left-0 w-72 bg-[#120d09]/98 border border-[#d07f05]/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] py-3 mt-3 z-50 backdrop-blur-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                <div className="px-3 space-y-1">
                  <Link href="/culture/clothing" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/culture/clothing') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/culture/clothing') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Traditional Clothing
                  </Link>
                  <Link href="/culture/cuisine" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/culture/cuisine') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/culture/cuisine') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Food & Cuisine
                  </Link>
                  <Link href="/culture/music" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/culture/music') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/culture/music') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Music & Heritage
                  </Link>
                  <Link href="/culture/marriage-tradition" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/culture/marriage-tradition') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/culture/marriage-tradition') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Marriage Tradition
                  </Link>
                </div>
              </div>
            </li>
          </ul>

          {/* DESKTOP CENTER 3D LOGO MEDALLION */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-6 z-30 pointer-events-auto">
            <Link 
              href="/" 
              onClick={closeAll}
              className="block px-8 py-3.5 rounded-2xl group transition-all duration-300 hover:scale-105 bg-gradient-to-b from-[#221810] via-[#14100c] to-[#0a0705] border border-[#d07f05]/50 shadow-[0_15px_35px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
              <div className="text-center font-serif tracking-widest leading-none relative z-10">
                <span className="block text-[8px] text-[#d07f05] font-sans tracking-[0.4em] uppercase mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  THE TIGRI
                </span>
                <span className="block text-sm font-bold text-[#f4e8d1] tracking-[0.25em] uppercase group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  WERJIHS
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP RIGHT SECTION: Community, Memorial, Archive */}
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
            {/* Community Dropdown */}
            <li className="relative group py-2">
              <button className={`px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none ${
                isParentActive('/community') 
                  ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                  : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
              }`}>
                <span>COMMUNITY</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isParentActive('/community') ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-[#d07f05]/30 group-hover:bg-[#d07f05]'}`} />
                <span className="text-[7px] text-[#d07f05]/70 group-hover:rotate-180 transition-transform duration-300">▼</span>
              </button>
              
              <div className="absolute top-full right-0 w-72 bg-[#120d09]/98 border border-[#d07f05]/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] py-3 mt-3 z-50 backdrop-blur-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
                <div className="px-3 space-y-1">
                  <Link href="/community/programs-and-events" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/community/programs-and-events') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/community/programs-and-events') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Programs & Events
                  </Link>
                  <Link href="/community/vanguard-of-islam" className={`flex items-center gap-3 px-4 py-2.5 text-xs font-light tracking-wider rounded-xl transition-all group/item ${isActive('/community/vanguard-of-islam') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]' : 'text-[#d8c5a8] hover:bg-[#1a120a] hover:text-[#f4e8d1]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d07f05] transition-all ${isActive('/community/vanguard-of-islam') ? 'scale-125 shadow-[0_0_6px_#d07f05]' : 'opacity-0 group-hover/item:opacity-100'}`} />
                    Vanguard of Islam
                  </Link>
                </div>
              </div>
            </li>

            {/* Memorial Link */}
            <li>
              <Link 
                href="/memorial" 
                className={`px-3 py-2 rounded-xl transition-all duration-300 inline-flex items-center gap-2 ${
                  isActive('/memorial') 
                    ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                    : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
                }`}
              >
                <span>MEMORIAL</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive('/memorial') ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-transparent'}`} />
              </Link>
            </li>

            {/* Archive Link */}
            <li>
              <Link 
                href="/archive" 
                className={`px-3 py-2 rounded-xl transition-all duration-300 inline-flex items-center gap-2 ${
                  isActive('/archive') 
                    ? 'bg-[#1e140c] text-[#f4e8d1] border border-[#d07f05]/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(208,127,5,0.15)]' 
                    : 'hover:text-[#f4e8d1] hover:-translate-y-0.5'
                }`}
              >
                <span>ARCHIVE</span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive('/archive') ? 'bg-[#d07f05] shadow-[0_0_8px_#d07f05] scale-125' : 'bg-transparent'}`} />
              </Link>
            </li>
          </ul>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#d8c5a8] hover:text-[#f4e8d1] p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </nav>

        {/* MOBILE DROPDOWN MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-[#120d09]/98 border border-[#d07f05]/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.95)] p-6 z-50 md:hidden backdrop-blur-2xl">
            <div className="flex flex-col space-y-4 text-xs font-medium tracking-[0.2em] text-[#d8c5a8]">
              <div>
                <Link href="/" onClick={closeAll} className={`block py-2 px-3 rounded-xl ${isActive('/') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30' : 'hover:text-[#f4e8d1]'}`}>HOME</Link>
              </div>
              
              {/* Mobile History Section */}
              <div className="border-t border-[#d07f05]/20 pt-3 flex flex-col space-y-1.5">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-1">History</span>
                <Link href="/history/origins" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/history/origins') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Origins of the Werji People</Link>
                <Link href="/history/migration" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/history/migration') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Migration History</Link>
                <Link href="/history/timeline" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/history/timeline') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Historical Timeline</Link>
              </div>

              {/* Mobile Culture Section */}
              <div className="border-t border-[#d07f05]/20 pt-3 flex flex-col space-y-1.5">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-1">Culture</span>
                <Link href="/culture/clothing" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/culture/clothing') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Traditional Clothing</Link>
                <Link href="/culture/cuisine" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/culture/cuisine') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Food & Cuisine</Link>
                <Link href="/culture/music" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/culture/music') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Music & Heritage</Link>
                <Link href="/culture/marriage-tradition" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/culture/marriage-tradition') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Marriage Tradition</Link>
              </div>

              {/* Mobile Community Section */}
              <div className="border-t border-[#d07f05]/20 pt-3 flex flex-col space-y-1.5">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-1">Community</span>
                <Link href="/community/programs-and-events" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/community/programs-and-events') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Programs & Events</Link>
                <Link href="/community/vanguard-of-islam" onClick={closeAll} className={`block py-2 px-3 rounded-xl text-xs ${isActive('/community/vanguard-of-islam') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'text-[#d8c5a8] hover:text-[#f4e8d1]'}`}>Vanguard of Islam</Link>
              </div>

              <div className="border-t border-[#d07f05]/20 pt-3 flex flex-col space-y-3">
                <Link href="/memorial" onClick={closeAll} className={`block py-2 px-3 rounded-xl ${isActive('/memorial') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'hover:text-[#f4e8d1]'}`}>MEMORIAL</Link>
                <Link href="/archive" onClick={closeAll} className={`block py-2 px-3 rounded-xl ${isActive('/archive') ? 'text-[#f4e8d1] bg-[#1e140c] border border-[#d07f05]/30 font-bold' : 'hover:text-[#f4e8d1]'}`}>ARCHIVE</Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}