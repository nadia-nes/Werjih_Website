'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  return (
    <div className="sticky top-0 z-50 bg-black py-5 px-6" ref={dropdownRef}>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Main 3D Floating Glass Navigation Shell matching Ancestral Tree */}
        <nav className="w-full mx-auto flex items-center justify-between px-8 h-24 rounded-2xl bg-[#14100c]/95 backdrop-blur-2xl border border-[#d07f05]/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-visible">
          
          {/* Subtle Ambient Top Border */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/40 to-transparent" />

          {/* LEFT SECTION: Home, History, Culture */}
          <ul className="flex items-center space-x-6 lg:space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
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
                  <Link href="/history/origins" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Origins of the Werji People</Link>
                  <Link href="/history/migration" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Migration History</Link>
                  <Link href="/history/timeline" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Historical Timeline</Link>
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
                  <Link href="/culture/clothing" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Traditional Clothing</Link>
                  <Link href="/culture/cuisine" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Food & Cuisine</Link>
                  <Link href="/culture/music" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Music & Heritage</Link>
                  <Link href="/culture/marriage-tradition" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Marriage Tradition</Link>
                </div>
              )}
            </li>
          </ul>

          {/* CENTER LOGO BADGE */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-30 pointer-events-auto">
            <Link 
              href="/" 
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

          {/* RIGHT SECTION: Community, Memorial, Archive */}
          <ul className="flex items-center space-x-6 lg:space-x-8 text-[11px] font-medium tracking-[0.2em] text-[#d8c5a8] relative z-20">
            <li className="relative">
              <button 
                onClick={(e) => toggleDropdown('community', e)}
                className="flex items-center gap-1.5 hover:text-[#f4e8d1] transition-colors duration-300 py-2 cursor-pointer focus:outline-none"
              >
                COMMUNITY <span className="text-[7px] text-[#d07f05]/70">▼</span>
              </button>
              {activeDropdown === 'community' && (
                <div className="absolute top-full right-0 w-64 bg-[#14100c] border border-[#d07f05]/30 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] py-3 mt-3 z-50 backdrop-blur-xl">
                  <Link href="/community/programs-and-events" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Programs & Events</Link>
                  <Link href="/community/projects" onClick={() => setActiveDropdown(null)} className="block px-6 py-2.5 text-xs font-light tracking-wider text-[#d8c5a8] hover:bg-[#261d15] hover:text-[#f4e8d1] transition-colors">Projects & Funding</Link>
                </div>
              )}
            </li>

            <li>
              <Link href="/memorial" className="hover:text-[#f4e8d1] transition-colors duration-300 py-2 inline-block">
                MEMORIAL
              </Link>
            </li>

            <li>
              <Link href="/archive" className="hover:text-[#f4e8d1] transition-colors duration-300 py-2 inline-block">
                ARCHIVE
              </Link>
            </li>
          </ul>

        </nav>
      </div>
    </div>
  );
}