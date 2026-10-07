// components/Hero.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const IMG =
  "https://sygzaktjynjnqstbgenx.supabase.co/storage/v1/object/public/heritage-images/2026-10-05%2011.49.40.jpg";

export default function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0b0a09] text-[#f1e9d8]">
      {/* Background container holding both the image on the right and the deep dark gradient on the left */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 items-center">
        
        {/* Left side: Solid dark base for crystal-clear typography */}
        <div className="absolute inset-0 lg:relative lg:col-span-6 h-full w-full bg-[#0b0a09] z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-16" />

        {/* Right side: Image with targeted top-right corner darkening */}
        <motion.div
          className="absolute inset-y-0 right-0 w-full lg:col-span-6 lg:relative h-full overflow-hidden z-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 2.2, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG}
            alt="A Werjih woman weaving a coiled basket"
            className="h-full w-full object-cover object-[50%_32%] opacity-90"
          />

          {/* Focused gradient darkening ONLY the top-right corner */}
          <div className="absolute top-0 right-0 h-[45%] w-[55%] bg-[radial-gradient(ellipse_at_top_right,rgba(11,10,9,0.95)_0%,rgba(11,10,9,0.5)_60%,transparent_100%)] pointer-events-none" />

          {/* Gradient overlay to seamlessly blend the image into the dark left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09] via-[#0b0a09]/70 to-transparent lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-transparent to-[#0b0a09]/50 lg:hidden" />
        </motion.div>
      </div>

      {/* Foreground Text Content with Modern 3D Floating Typography Effect */}
      <motion.div
        className="relative z-20 flex h-full max-w-7xl mx-auto flex-col justify-center px-6 sm:px-12 lg:px-16 pt-20"
        initial={{ opacity: 0, y: reduce ? 0 : 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.4, ease }}
      >
        <div className="max-w-xl">
          {/* 3D Floating Badge matching the unified amber-gold tone */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-[#c98a3c] border border-[#c98a3c]/30 px-4 py-1.5 rounded-full bg-[#121110]/60 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#c98a3c] animate-pulse" />
            Ancient Heritage & Legacy
          </motion.div>

          {/* 3D Layered Heading with constant navbar-matching white color */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.3rem,4.5vw,3.9rem)] font-light leading-[1.1] tracking-[0.01em] text-[#f1e9d8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            Werjih&apos;s story, told while{" "}
            <span className="relative inline-block pr-1 font-normal italic text-[#f1e9d8]">
              we still can.
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#c98a3c] via-[#c98a3c]/40 to-transparent shadow-[0_0_12px_rgba(201,138,60,0.6)]"
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 1.4, ease }}
              />
            </span>
          </h1>

          {/* 3D Depth Paragraph */}
          <p className="mt-5 font-[family-name:var(--font-cormorant)] text-[16px] sm:text-[19px] leading-[1.7] tracking-wide text-[#cfc6b3] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            “Every basket holds a mother&apos;s hands, every pattern an elder&apos;s
            prayer. Safeguarding centuries of ancestral craft and resilience, so
            what our grandparents wove is never lost, and our children inherit it
            whole.”
          </p>

          {/* Sleek Black Buttons with Brownish-Amber-Gold Touch */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#notice"
              className="group relative inline-flex items-center gap-3 rounded-xl bg-[#0e0d0c] px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f1e9d8] border border-[#c98a3c]/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-500 hover:border-[#c98a3c] hover:bg-[#161412] hover:shadow-[0_15px_30px_rgba(201,138,60,0.15)]"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#c98a3c]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 text-[#e6cfa6]">A call to Werjih</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 text-[#c98a3c]">→</span>
            </a>

            <a
              href="#call-video"
              className="group relative inline-flex items-center gap-3 rounded-xl bg-black/40 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#cfc6b3] border border-white/10 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#c98a3c]/60 hover:text-[#f1e9d8] hover:bg-[#121110]/80"
            >
              <span>Walk with Us</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1 text-[#c98a3c]">→</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}