"use client";

import React, { useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface HeroSectionProps {
  shouldReduceMotion?: boolean | null;
  badgeY?: MotionValue<number>;
  buttonsY?: MotionValue<number>;
}

export default function HeroSection({ 
  shouldReduceMotion = false, 
  badgeY, 
  buttonsY 
}: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 30;
    setMousePos({ x, y });
  };

  const handleCallToWerjih = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Smooth scroll directly to the video section below
    setTimeout(() => {
      const videoSection = document.getElementById('call-video');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleWalkWithUs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = document.getElementById('notice');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 overflow-hidden bg-[#030201]"
    >
      
      {/* ========================================================= */}
      {/* GLOBAL RIPPLE OVERLAYS                                    */}
      {/* ========================================================= */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="absolute w-20 h-20 rounded-full border border-[#8c550d] bg-[#5c3605]/15 blur-sm"
            style={{ left: ripple.x - 40, top: ripple.y - 40 }}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* BACKGROUND VECTOR FLOW & MOVING THREADS                   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Deep Luxury Gradient Base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#170e05] via-[#050302] to-[#030201]"></div>

        {/* Left Side: Moving Threads */}
        <div className="absolute left-3 md:left-14 top-0 bottom-0 flex items-center space-x-2 md:space-x-4 z-10 opacity-60 md:opacity-100">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#8c550d]/30 to-transparent relative">
            <motion.div 
              className="absolute w-2 h-2 rounded-full bg-[#a86512] -left-[3.5px] shadow-[0_0_10px_#5c3605]"
              animate={{ y: ['0vh', '90vh', '0vh'] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#6b4208]/40 to-transparent relative hidden sm:block">
            <motion.div 
              className="absolute w-1.5 h-1.5 rounded-full bg-[#8c550d] -left-[2.5px] shadow-[0_0_6px_#a86512]"
              animate={{ y: ['80vh', '0vh', '80vh'] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Right Side: Moving Threads */}
        <div className="absolute right-3 md:right-14 top-0 bottom-0 flex items-center space-x-2 md:space-x-4 z-10 opacity-60 md:opacity-100">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#6b4208]/40 to-transparent relative hidden sm:block">
            <motion.div 
              className="absolute w-1.5 h-1.5 rounded-full bg-[#8c550d] -left-[2.5px] shadow-[0_0_6px_#a86512]"
              animate={{ y: ['50vh', '0vh', '50vh'] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#8c550d]/30 to-transparent relative">
            <motion.div 
              className="absolute w-2 h-2 rounded-full bg-[#a86512] -left-[3.5px] shadow-[0_0_10px_#5c3605]"
              animate={{ y: ['20vh', '95vh', '20vh'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Floating Blurred Geometric Wave & Line Art */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute inset-0 opacity-45 filter blur-[1px]"
            animate={{ x: mousePos.x * -1.5, y: mousePos.y * -1.5 }}
            transition={{ type: "spring", stiffness: 45, damping: 25 }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" fill="none">
              <motion.path 
                d="M-100 200 C 300 100, 600 400, 900 200 C 1200 0, 1400 300, 1600 150" 
                stroke="url(#bronzeGradient1)" 
                strokeWidth="1.5"
                strokeDasharray="8 12"
              />
              <motion.path 
                d="M-100 500 C 400 700, 700 300, 1100 600 C 1300 750, 1400 450, 1600 550" 
                stroke="url(#bronzeGradient2)" 
                strokeWidth="1"
              />
              <defs>
                <linearGradient id="bronzeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5c3605" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#8c550d" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3d2203" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="bronzeGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3d2203" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#5c3605" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8c550d" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Interactive Mouse Glow */}
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-[#8c550d]/10 blur-[130px] pointer-events-none z-10"
          animate={{ x: mousePos.x * 15, y: mousePos.y * 15 }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ left: 'calc(50% - 250px)', top: 'calc(50% - 250px)' }}
        />
      </div>

      {/* ========================================== */}
      {/* HERO CONTENT CONTAINER                     */}
      {/* ========================================== */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-4">
        
        <div className="lg:col-span-12 flex flex-col items-center">
          
          {/* 1. Pill Badge */}
          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mb-6 group cursor-pointer"
          >
            <div className="relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(140,85,13,0.2)]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#8c550d] via-[#a86512] to-[#8c550d] opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-[spin_4s_linear_infinite]"></span>
              <div className="relative px-6 py-2 rounded-full bg-[#0d0906]/95 backdrop-blur-xl">
                <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#d4cbb8]/85">
                  ✦ ANCIENT HERITAGE & LEGACY ✦
                </span>
              </div>
            </div>
          </motion.div>

          {/* 2. Harmonized Darkened Container Box for the Title */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="relative max-w-5xl w-full mx-auto rounded-3xl overflow-hidden mb-6 bg-gradient-to-b from-[#0c0806] via-[#070503] to-[#040302] border border-[#8c550d]/30 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-12 backdrop-blur-md"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#8c550d]/10 via-[#5c3605]/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8c550d]/10 via-[#5c3605]/10 to-transparent pointer-events-none"></div>

            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                }
              }}
              className="text-2xl sm:text-4xl md:text-6xl font-serif tracking-tight leading-[1.3] text-center text-white"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <motion.span 
                  variants={{ hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                  className="font-light text-white"
                >
                  Inside
                </motion.span>
                <motion.span 
                  variants={{ hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                  className="font-light text-white"
                >
                  THE
                </motion.span>

                <motion.span 
                  variants={{ hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: "easeOut" } } }}
                  className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#b47525] via-[#d9822b] to-[#915412] drop-shadow-[0_4px_20px_rgba(180,117,37,0.35)] px-1 sm:px-2"
                >
                  THE WERJIH&apos;S
                </motion.span>

                <motion.span 
                  variants={{ hidden: { opacity: 0, filter: "blur(6px)" }, visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } } }}
                  className="font-light text-white"
                >
                  World
                </motion.span>
              </div>
            </motion.h1>
          </motion.div>

          {/* 3. Harmonized Obsidian Description Box */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden mb-10 bg-gradient-to-b from-[#0c0806] via-[#070503] to-[#040302] border border-[#8c550d]/30 shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#8c550d]/10 via-[#5c3605]/10 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#8c550d]/10 via-[#5c3605]/10 to-transparent pointer-events-none"></div>

            <div className="relative px-8 py-7">
              <p className="text-[#d4cbb8]/90 text-base md:text-lg font-light leading-relaxed tracking-wide text-center">
                Unveiling centuries of history, resilience, and trade roots. Journey through the ancestral legacy, culture, and documented chapters of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b47525] via-[#d9822b] to-[#915412] font-normal italic">WERJIH</span> people.
              </p>
            </div>
          </motion.div>

          {/* 4. Action Buttons */}
          <motion.div
            style={{ y: buttonsY }}
            initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            {/* Walk With Us Button */}
            <a
              href="#notice"
              onClick={handleWalkWithUs}
              className="group relative px-9 py-4 bg-gradient-to-r from-[#8c550d] via-[#a86512] to-[#6b4208] text-[#f4e8d1] font-serif font-bold text-xs uppercase tracking-[0.25em] rounded-xl transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0.5 shadow-[0_10px_30px_rgba(140,85,13,0.3)] flex items-center space-x-3 overflow-hidden border border-[#c77703]/40"
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative z-10">Walk With Us</span>
              <span className="relative z-10 transform group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
            </a>

            {/* A Call to Werjih Button (Scrolls to Video Section) */}
            <a
              href="#call-video"
              onClick={handleCallToWerjih}
              className="group relative px-9 py-4 bg-[#0a0705] hover:bg-[#150f0a] text-[#f4e8d1] border border-[#8c550d]/40 hover:border-[#8c550d] font-serif text-xs uppercase tracking-[0.25em] rounded-xl transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center space-x-3 overflow-hidden cursor-pointer"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c550d] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5c3605] shadow-[0_0_6px_#8c550d]"></span>
              </span>
              <span className="relative z-10">A Call to WERJIH</span>
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}