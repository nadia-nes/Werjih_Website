"use client";

import React, { useRef } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  Calm palette: warm black, ivory, and softened shades of #e88d22
  #080604  ink            #14100a  umber (glow base)
  #f1e9d8  ivory (text)   #cfc6b3  stone (body text)
  #e6cfa6  champagne      #d9a05a  soft amber
  #c98a3c  antique bronze #a8691c  deep bronze
*/

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], display: "swap" });

interface HeroSectionProps {
  shouldReduceMotion?: boolean | null;
  badgeY?: MotionValue<number>;
  buttonsY?: MotionValue<number>;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default function HeroSection({
  shouldReduceMotion,
  badgeY,
  buttonsY,
}: HeroSectionProps) {
  const systemReduce = useReducedMotion();
  const reduce = shouldReduceMotion ?? systemReduce ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  /* Gentle mouse depth */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 22 });
  const sy = useSpring(my, { stiffness: 40, damping: 22 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-90, 90]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-60, 60]);

  /* Soft scroll exit */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollToId = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  const handleWalkWithUs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId("notice");
  };
  const handleCallToWerjih = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId("call-video");
  };

  /* One slow, graceful entrance */
  const column = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
  };
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 1.1, ease: EASE },
    },
  };
  const headline = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
  };
  const word = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 24,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.01 : 1.3, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${sans.className} relative isolate flex min-h-[88svh] flex-col items-center justify-center overflow-hidden bg-[#080604] px-6 pb-24 pt-16 text-center`}
    >
      {/* ---------- Background ---------- */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#17100a_0%,#0c0805_50%,#080604_85%)]" />

        {/* Soft glow that breathes slowly and drifts with the cursor */}
        <motion.div
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
          style={reduce ? undefined : { x: glowX, y: glowY }}
        >
          <motion.div
            className="h-[560px] w-[560px] rounded-full bg-[#c98a3c]/[0.08] blur-[140px]"
            animate={
              reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }
            }
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Fine film grain for a tactile, printed feel */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080604] to-transparent" />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-5xl"
      >
        <motion.div
          variants={column}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div style={{ y: badgeY }} className="mb-9">
            <motion.div
              variants={rise}
              className="flex items-center gap-4 text-[#d9a05a]"
            >
              <span
                aria-hidden
                className="h-px w-8 bg-gradient-to-r from-transparent to-[#c98a3c]/70 sm:w-14"
              />
              <span
                className={`${display.className} text-lg italic tracking-[0.06em] sm:text-xl`}
              >
                Ancient heritage &amp; legacy
              </span>
              <span
                aria-hidden
                className="h-px w-8 bg-gradient-to-l from-transparent to-[#c98a3c]/70 sm:w-14"
              />
            </motion.div>
          </motion.div>

          {/* Headline with a gentle 3D tilt */}
          <motion.div
            style={{
              transformPerspective: 1400,
              rotateX: reduce ? 0 : tiltX,
              rotateY: reduce ? 0 : tiltY,
            }}
          >
            <motion.h1
              id="hero-title"
              variants={headline}
              className={`${display.className} flex flex-wrap items-baseline justify-center gap-x-4 gap-y-0 text-[3.25rem] font-light leading-[1.05] tracking-[-0.01em] text-[#f1e9d8] sm:text-7xl md:text-8xl lg:text-[8.5rem]`}
            >
              <motion.span variants={word}>Inside</motion.span>
              <motion.span
                variants={word}
                className="bg-gradient-to-b from-[#ecd7b0] via-[#d9a05a] to-[#b9772a] bg-clip-text px-2 font-medium italic text-transparent"
              >
                Werjih&apos;s
              </motion.span>
              <motion.span variants={word}>World</motion.span>
            </motion.h1>
          </motion.div>

          {/* Divider */}
          <motion.span
            variants={rise}
            aria-hidden
            className="my-10 h-px w-20 bg-gradient-to-r from-transparent via-[#c98a3c]/70 to-transparent"
          />

          {/* Description */}
          <motion.p
            variants={rise}
            className={`${display.className} max-w-xl text-xl leading-relaxed text-[#cfc6b3] md:text-2xl`}
          >
            Unveiling centuries of history, resilience, and trade roots. Journey
            through the ancestral legacy, culture, and documented chapters of
            the <span className="italic text-[#e6cfa6]">Werjih</span> people.
          </motion.p>

          {/* Buttons */}
          <motion.div style={{ y: buttonsY }} className="mt-12 w-full sm:w-auto">
            <motion.div
              variants={rise}
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
            >
              <a
                href="#notice"
                onClick={handleWalkWithUs}
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-[#e6cfa6]/25 bg-gradient-to-b from-[#d49a4e] to-[#b27832] px-8 text-[15px] font-medium tracking-wide text-[#16100a] shadow-[0_8px_24px_rgba(201,138,60,0.16)] transition duration-300 hover:-translate-y-0.5 hover:from-[#dba35b] hover:to-[#bb8038] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6cfa6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080604] sm:w-auto"
              >
                Walk with us
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>

              <a
                href="#call-video"
                onClick={handleCallToWerjih}
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-[#f1e9d8]/20 bg-white/[0.02] px-8 text-[15px] font-medium tracking-wide text-[#f1e9d8] transition duration-300 hover:-translate-y-0.5 hover:border-[#c98a3c]/60 hover:bg-[#c98a3c]/[0.07] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e6cfa6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080604] sm:w-auto"
              >
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c98a3c]/60 text-[#d9a05a] transition-colors duration-300 group-hover:bg-[#c98a3c]/20"
                >
                  <svg viewBox="0 0 12 12" className="ml-0.5 h-2.5 w-2.5" fill="currentColor">
                    <path d="M2 1l9 5-9 5z" />
                  </svg>
                </span>
                A call to Werjih
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}