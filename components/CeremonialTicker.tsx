"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PHRASE_KEYS = ["p1", "p2", "p3", "p4"] as const;

export default function CeremonialTicker() {
  const t = useTranslations("Ticker");
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
              {PHRASE_KEYS.map((key) => (
                <div key={`${copy}-${key}`} className="flex items-center space-x-10">
                  <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d07f05]/90 font-medium">
                    {t(key)}
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