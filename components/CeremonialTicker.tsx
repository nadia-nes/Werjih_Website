"use client";

import { useState } from "react";

const tickerPhrases = [
  "GLOBAL GATHERING EVERY Jne 22'nd",
  "PRESERVING OUR IDENTITY & HISTORY",
  "THE UNBROKEN GENERATIONAL SHIELD",
  "TRADE ROOTS & ANCESTRAL LEGACY",
];

export default function CeremonialTicker() {
  const [isPaused, setIsPaused] = useState(false);

  const tickerMask = {
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  };

  return (
    <>
      <div
        className="relative w-full bg-[#0a0807] border-t border-b border-[#d07f05]/40 py-3.5 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] z-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex whitespace-nowrap overflow-hidden" style={tickerMask}>
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center space-x-10 shrink-0 pr-10"
              style={{
                animation: `marquee 45s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {tickerPhrases.map((phrase, index) => (
                <div key={`${copy}-${index}`} className="flex items-center space-x-10">
                  <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d07f05]/90 font-medium">
                    {phrase}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d07f05] animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
}