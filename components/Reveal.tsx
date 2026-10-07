// components/Reveal.tsx
"use client";

import { ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "left" | "right" | "zoom";
type Phase = "below" | "visible" | "above";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** How the content moves in. Default "up". */
  direction?: Direction;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Pixels the content travels. */
  distance?: number;
  /** true = animate in only once and stay visible afterwards. */
  once?: boolean;
  /** Shrinks the "visible zone" so sections fade before touching the screen edge. */
  margin?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 60,
  once = false,
  margin = "-10% 0px -10% 0px",
}: RevealProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("below");

  // Respect "reduce motion" settings: just show the content.
  if (reduce) return <div className={className}>{children}</div>;

  const hiddenState = (p: "below" | "above") => {
    const sign = p === "below" ? 1 : -1;
    switch (direction) {
      case "left":
        return { opacity: 0, x: -distance, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: distance, y: 0, scale: 1 };
      case "zoom":
        return { opacity: 0, x: 0, y: sign * distance * 0.4, scale: 0.92 };
      default:
        return { opacity: 0, x: 0, y: sign * distance, scale: 1 };
    }
  };

  const shownState = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial={hiddenState("below")}
      animate={phase === "visible" ? shownState : hiddenState(phase)}
      transition={{
        duration: 0.7,
        ease: EASE,
        delay: phase === "visible" ? delay : 0,
      }}
      viewport={{ amount: "some", margin }}
      onViewportEnter={() => setPhase("visible")}
      onViewportLeave={(entry) => {
        if (once) return;
        // Left through the top = "above", through the bottom = "below"
        setPhase(entry && entry.boundingClientRect.top < 0 ? "above" : "below");
      }}
    >
      {children}
    </motion.div>
  );
}