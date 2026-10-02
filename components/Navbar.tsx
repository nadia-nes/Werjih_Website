'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-black py-3 sm:py-5 px-4 sm:px-6" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Main 3D Floating Glass Navigation Shell */}
        <nav className="w-full mx-auto flex items-center justify-between px-4 sm:px-8 h-20 sm:h-24 rounded-2xl bg-[#14100c]/95 backdrop-blur-2xl border border-[#d07f05]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-visible">
          
          {/* Subtle Ambient Top Border */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/40 to-transparent" />

          {/* MOBILE LOGO (Visible only on small screens) */}
          <div className="flex md:hidden items-center">
            <Link href="/" onClick={closeAll} className="font-serif tracking-widest leading-none">
              <span className="block text-[8px] text-[#d07f05] font-sans tracking-[0.3em] uppercase">THE TIGRI</span>
              <span className="block text-sm font-bold text-[#f4e8d1] tracking-[0.15em] uppercase">WERJIHS</span>
            </Link>
          </div>

          {/* DESKTOP LEFT SECTION: Home, History, Culture */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
            <li>
              <Link href="/" className="hover:text-[#f4e8d1] transition-colors duration-300 py-2 inline-block">
                HOME
              </Link>
            </li>
            
            {/* History Dropdown */}
            <li className="relative">
              <button 
                onClick={(e) => toggleDropdown('history', e)}
                className="flex items-center gap-1.5 hover:text-[#f4e8d1] transition-colors duration-300 py-2 cursor-pointer focus:outline-none"
              >
                HISTORY <span className="text-[7px] text-[#d07f05]/70">▼</span>
              </button>
              {activeDropdown === 'history' && (
                <div className="absolute top-full left-0 w-64 bg-[#14100c] border border-[#d07f05]/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-3 mt-3 z-50 backdrop-blur-xl">
                  <Link href="/history/origins" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Origins of the Werji People</Link>
                  <Link href="/history/migration" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Migration History</Link>
                  <Link href="/history/timeline" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Historical Timeline</Link>
                </div>
              )}
            </li>

            {/* Culture Dropdown */}
            <li className="relative">
              <button 
                onClick={(e) => toggleDropdown('culture', e)}
                className="flex items-center gap-1.5 hover:text-[#f4e8d1] transition-colors duration-300 py-2 cursor-pointer focus:outline-none"
              >
                CULTURE <span className="text-[7px] text-[#d07f05]/70">▼</span>
              </button>
              {activeDropdown === 'culture' && (
                <div className="absolute top-full left-0 w-64 bg-[#14100c] border border-[#d07f05]/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-3 mt-3 z-50 backdrop-blur-xl">
                  <Link href="/culture/clothing" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Traditional Clothing</Link>
                  <Link href="/culture/cuisine" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Food & Cuisine</Link>
                  <Link href="/culture/music" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Music & Heritage</Link>
                  <Link href="/culture/marriage-tradition" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Marriage Tradition</Link>
                </div>
              )}
            </li>
          </ul>

          {/* DESKTOP CENTER LOGO BADGE */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-7 z-30 pointer-events-auto">
            <Link 
              href="/" 
              onClick={closeAll}
              className="block px-10 py-4 rounded-xl group transition-all duration-300 hover:scale-105 bg-[#14100c] border border-[#d07f05]/40 shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            >
              <div className="text-center font-serif tracking-widest leading-none relative z-10">
                <span className="block text-[9px] text-[#d07f05] font-sans tracking-[0.4em] uppercase mb-1.5">
                  THE TIGRI
                </span>
                <span className="block text-base font-bold text-[#f4e8d1] tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                  WERJIHS
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP RIGHT SECTION: Community, Memorial, Archive */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
            <li className="relative">
              <button 
                onClick={(e) => toggleDropdown('community', e)}
                className="flex items-center gap-1.5 hover:text-[#f4e8d1] transition-colors duration-300 py-2 cursor-pointer focus:outline-none"
              >
                COMMUNITY <span className="text-[7px] text-[#d07f05]/70">▼</span>
              </button>
              {activeDropdown === 'community' && (
                <div className="absolute top-full right-0 w-64 bg-[#14100c] border border-[#d07f05]/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-3 mt-3 z-50 backdrop-blur-xl">
                  <Link href="/community/programs-and-events" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Programs & Events</Link>
                  <Link href="/community/projects" onClick={closeAll} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Projects & Funding</Link>
                </div>
              )}
            </li>

            <li>
              <Link href="/memorial" onClick={closeAll} className="hover:text-[#f4e8d1] transition-colors duration-300 py-2 inline-block">
                MEMORIAL
              </Link>
            </li>

            <li>
              <Link href="/archive" onClick={closeAll} className="hover:text-[#f4e8d1] transition-colors duration-300 py-2 inline-block">
                ARCHIVE
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
          <div className="absolute top-full left-4 right-4 mt-2 bg-[#14100c]/98 border border-[#d07f05]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-6 z-50 md:hidden backdrop-blur-2xl">
            <ul className="flex flex-col space-y-4 text-xs font-medium tracking-[0.2em] text-[#d8c5a8]">
              <li>
                <Link href="/" onClick={closeAll} className="block py-2 hover:text-[#f4e8d1]">HOME</Link>
              </li>
              
              {/* Mobile History Section */}
              <div className="border-t border-[#d07f05]/20 pt-3">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-2">History</span>
                <Link href="/history/origins" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Origins of the Werji People</Link>
                <Link href="/history/migration" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Migration History</Link>
                <Link href="/history/timeline" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Historical Timeline</Link>
              </div>

              {/* Mobile Culture Section */}
              <div className="border-t border-[#d07f05]/20 pt-3">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-2">Culture</span>
                <Link href="/culture/clothing" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Traditional Clothing</Link>
                <Link href="/culture/cuisine" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Food & Cuisine</Link>
                <Link href="/culture/music" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Music & Heritage</Link>
                <Link href="/culture/marriage-tradition" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Marriage Tradition</Link>
              </div>

              {/* Mobile Community Section */}
              <div className="border-t border-[#d07f05]/20 pt-3">
                <span className="text-[10px] text-[#d07f05] tracking-[0.3em] uppercase block mb-2">Community</span>
                <Link href="/community/programs-and-events" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Programs & Events</Link>
                <Link href="/community/projects" onClick={closeAll} className="block py-1.5 pl-3 text-xs text-[#d8c5a8] hover:text-[#f4e8d1]">Projects & Funding</Link>
              </div>

              <div className="border-t border-[#d07f05]/20 pt-3 flex flex-col space-y-3">
                <Link href="/memorial" onClick={closeAll} className="block py-2 hover:text-[#f4e8d1]">MEMORIAL</Link>
                <Link href="/archive" onClick={closeAll} className="block py-2 hover:text-[#f4e8d1]">ARCHIVE</Link>
              </div>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}