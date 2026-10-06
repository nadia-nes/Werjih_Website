"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollThumb() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 300) {
        setIsVisible(true);
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking or dragging along the vertical track to jump/scroll to that position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = clickY / rect.height;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    window.scrollTo({
      top: percentage * totalHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="fixed right-3 top-1/2 -translate-y-1/2 z-50 md:hidden flex flex-col items-center select-none"
        >
          {/* Vertical Track & Draggable Thumb */}
          <div
            onClick={handleTrackClick}
            className="relative w-2 h-36 bg-[#0a0705]/80 border border-[#d07f05]/30 rounded-full backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Active Scroll Indicator Pill */}
            <motion.div
              style={{ top: `${scrollProgress}%` }}
              className="absolute left-0 right-0 -translate-y-1/2 w-full h-8 bg-gradient-to-b from-[#f0a024] to-[#d07f05] rounded-full shadow-[0_0_10px_#f0a024] transition-all duration-75"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}