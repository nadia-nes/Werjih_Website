// components/Hero.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const IMG =
  "https://sygzaktjynjnqstbgenx.supabase.co/storage/v1/object/public/heritage-images/2026-10-05%2011.49.40.jpg";

export default function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative h-auto lg:min-h-[100dvh] w-full overflow-hidden bg-[#0b0a09] text-[#f1e9d8] flex items-center">
      
      {/* Background Image / Layout Setup */}
      <div className="absolute inset-0 z-0 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG}
          alt="A Werjih woman weaving a coiled basket"
          className="h-full w-full object-cover object-[50%_30%] filter brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/60 to-[#0b0a09]/80" />
      </div>

      <div className="absolute inset-0 hidden lg:grid grid-cols-12 items-center">
        <div className="col-span-6 h-full w-full bg-[#0b0a09]" />
        <motion.div
          className="col-span-6 h-full relative overflow-hidden"
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
          <div className="absolute top-0 right-0 h-[45%] w-[55%] bg-[radial-gradient(ellipse_at_top_right,rgba(11,10,9,0.95)_0%,rgba(11,10,9,0.5)_60%,transparent_100%)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09] via-[#0b0a09]/70 to-transparent" />
        </motion.div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-36 pb-16 lg:pt-20"
        initial={{ opacity: 0, y: reduce ? 0 : 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.4, ease }}
      >
        <div className="max-w-xl bg-black/40 lg:bg-transparent backdrop-blur-[2px] lg:backdrop-blur-none p-5 sm:p-8 lg:p-0 rounded-2xl lg:rounded-none border border-white/10 lg:border-none shadow-xl lg:shadow-none">
          
          {/* Heading */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-[2.1rem] sm:text-[3.9rem] font-light leading-[1.1] tracking-[0.01em] text-[#f1e9d8]">
            Werjih&apos;s story, told while{" "}
            <span className="relative inline-block pr-1 font-normal italic text-[#f1e9d8]">
              we still can.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-3.5 font-[family-name:var(--font-cormorant)] text-[15px] sm:text-[19px] leading-[1.6] tracking-wide text-[#cfc6b3]">
            “Every basket holds a mother&apos;s hands, every pattern an elder&apos;s
            prayer. Safeguarding centuries of ancestral craft and resilience, so
            what our grandparents wove is never lost, and our children inherit it
            whole.”
          </p>

          {/* Single Action Button */}
          <div className="mt-6 flex">
            <a
              href="#notice"
              className="inline-flex items-center justify-between sm:justify-center gap-4 rounded-xl px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f1e9d8] border border-[#c98a3c]/40 bg-black/50 hover:border-[#c98a3c] transition-all"
            >
              <span>A call to Werjih</span>
              <span className="text-[#c98a3c]">→</span>
            </a>
          </div>

        </div>
      </motion.div>
    </section>
  );
}