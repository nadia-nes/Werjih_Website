// components/Hero.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const IMG =
  "https://sygzaktjynjnqstbgenx.supabase.co/storage/v1/object/public/heritage-images/2026-10-05%2011.49.40.jpg";

const fadeLeft = "linear-gradient(to right, transparent 0%, black 38%, black 100%)";
const barrelZone =
  "radial-gradient(ellipse 55% 52% at 92% 14%, black 25%, transparent 78%)";

export default function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b0a09] text-[#f3ead8]">
      {/* photo */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-[72%]"
        style={{ WebkitMaskImage: fadeLeft, maskImage: fadeLeft }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 2.4, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG}
          alt="A Werjih woman weaving a coiled basket"
          className="h-full w-full object-cover object-[50%_32%]"
        />

        {/* barrel: blur the upper right, then melt it into the background */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{ WebkitMaskImage: barrelZone, maskImage: barrelZone }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_46%_at_92%_12%,rgba(11,10,9,0.92),rgba(11,10,9,0.55)_50%,transparent_80%)]" />
      </motion.div>

      {/* floor behind the text so it always reads clearly */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b0a09]/95 via-[#0b0a09]/55 to-transparent" />

      {/* text */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-14 md:px-16 md:pb-20"
        initial={{ opacity: 0, y: reduce ? 0 : 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: reduce ? 0 : 1.4, delay: reduce ? 0 : 0.6, ease }}
      >
        <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-snug tracking-[0.01em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] md:whitespace-nowrap">
          Werjih&apos;s story, told while{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#e88d22] via-[#e9b074] to-[#f3ead8] bg-clip-text pr-1 font-bold italic text-transparent">
            we still can.
            <motion.span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-[#e88d22] via-[#e88d22]/40 to-transparent"
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 1.6, ease }}
            />
          </span>
        </h1>

        <p className="mt-5 max-w-xl font-[family-name:var(--font-cormorant)] text-[17px] leading-[1.75] tracking-wide text-[#f6eedd] drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] md:text-[19px]">
          “Every basket holds a mother&apos;s hands, every pattern an elder&apos;s
          prayer. Safeguarding centuries of ancestral craft and resilience, so
          what our grandparents wove is never lost, and our children inherit it
          whole.”
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#notice"
            className="group inline-flex items-center gap-3 rounded-none bg-[#e88d22] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0b0a09] transition duration-500 hover:bg-[#f4a24a]"
          >
            A call to Werjih
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#call-video"
            className="group inline-flex items-center gap-3 rounded-none border border-[#e88d22] bg-black/20 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#e88d22] backdrop-blur-md transition duration-500 hover:bg-[#e88d22] hover:text-[#0b0a09]"
          >
            Walk with Us
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}