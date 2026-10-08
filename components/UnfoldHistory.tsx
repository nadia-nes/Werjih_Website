"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

type Chapter = {
  era: string;
  short: string;
  title: string;
  text: string;
};

const chapters: Chapter[] = [
  {
    era: "1128",
    short: "1128",
    title: "A name in the record",
    text:
      "Our story begins with a single line in an old Arabic chronicle. In the year 1128, the Wärğiḥ are named as a people who stood on their own land and held it, turning back armies that pushed south from the north. Before there were cities, before there were kings in Shewa, we were already remembered by name.",
  },
  {
    era: "1332",
    short: "1332",
    title: "Keepers of camels, defenders of home",
    text:
      "Two centuries later, the chronicles of King Amdä Ṣəyon describe us as herdsmen, keepers of camels, and strong in battle. We were a people of the open lowlands, guarding our herds and our freedom, and our neighbours knew us as fighters who did not give up their ground easily.",
  },
  {
    era: "The 16th century",
    short: "16th c.",
    title: "When the roads called us",
    text:
      "Then came an age of upheaval. Kingdoms fell, peoples moved across the highlands, and old ways of life could no longer hold. Our elders remember that it was in this season that we left our herds behind and took to the caravan roads, carrying salt, cloth and coffee, and settling beside the markets. They remember the first village, Abdällo, near Šäno, where the story of the highland Werji begins.",
  },
  {
    era: "1813 – 1840",
    short: "1813",
    title: "A refuge and a gift of land",
    text:
      "In the days of King Śahlä Śəlase of Shewa, our traders became trusted friends of the court. Oral tradition tells of Abdure-Lottu, who found refuge with the king and received a wide land at Ṭoṭose. There he founded a village that became a home for generations. Our merchants carried goods, and they also carried news of the lands beyond the king's reach.",
  },
  {
    era: "1865 – 1889",
    short: "1865",
    title: "\u201CDo not touch their lands\u201D",
    text:
      "When a governor tried to move the people of Tigri Teracha from their homes, the elders walked to the court of King Menilek and made their appeal. The king answered that the Wärğəḥ paid a yearly tax of one thaler for every mule, and he ordered the governor to leave their land alone. Because of those words, the village still stands today.",
  },
  {
    era: "1879 E.C.",
    short: "1879",
    title: "A new capital, a new home",
    text:
      "When Addis Ababa rose as the new capital, the great market of Rogge, where our traders had gathered, fell silent as the road moved away. Our chief, Ture-Waryo, went to Menilek and asked for new land, and the king settled our people at Daleti, which is today a major part of Sebeta. In 1881 Empress Taytu invited us to Enṭoṭṭo to help trade grow there.",
  },
  {
    era: "1896",
    short: "1896",
    title: "Adwa: a gift remembered",
    text:
      "When the nation rose to defend itself against Italy, the people of Daleti remember that a wealthy Werji man lent twelve thousand thalers to Emperor Menilek II. It was one gift among many, and it tells how fully our community saw its own fate bound to Ethiopia's freedom.",
  },
];

/* ---------- Expanded story (mounted only while open) ---------- */
function Story({ onFold }: { onFold: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div ref={ref} className="relative mt-10 sm:mt-14">
      {/* track + progress line */}
      <div className="absolute bottom-0 left-[5px] top-0 w-px bg-[#d07f05]/20 sm:left-[7px]" />
      <motion.div
        style={{ scaleY: progress, transformOrigin: "top" }}
        className="absolute bottom-0 left-[5px] top-0 w-px bg-[#d07f05] sm:left-[7px]"
      />

      <div className="space-y-14 pl-8 sm:space-y-20 sm:pl-14">
        {chapters.map((c, i) => (
          <motion.article
            key={c.era}
            id={`chapter-${i}`}
            className="relative scroll-mt-24"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* dot */}
            <span className="absolute -left-[33px] top-2 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#d07f05] bg-[#0b0a09] sm:-left-[56px] sm:h-[15px] sm:w-[15px]">
              <span className="h-1 w-1 rounded-full bg-[#d07f05] sm:h-1.5 sm:w-1.5" />
            </span>

            {/* big faded numeral */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-5 right-0 select-none font-[family-name:var(--font-cormorant)] text-[4.5rem] font-light leading-none text-[#d07f05]/[0.07] sm:-top-8 sm:text-[9rem]"
            >
              {c.short}
            </span>

            <p className="relative font-sans text-[11px] uppercase tracking-[0.25em] text-[#d07f05] sm:text-sm">
              Chapter {i + 1} &middot; {c.era}
            </p>
            <h3 className="relative mt-2 font-[family-name:var(--font-cormorant)] text-2xl leading-tight text-[#f1e9d8] sm:text-4xl">
              {c.title}
            </h3>
            <p
              className={`relative mt-3 font-[family-name:var(--font-cormorant)] text-[15px] leading-[1.75] text-[#e4dac4] sm:text-xl sm:leading-[1.8] ${
                i === 0
                  ? "first-letter:float-left first-letter:mr-2 first-letter:font-normal first-letter:leading-[0.8] first-letter:text-[#d07f05] first-letter:text-5xl sm:first-letter:text-7xl"
                  : ""
              }`}
            >
              {c.text}
            </p>
          </motion.article>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start gap-6 pl-8 sm:pl-14">
        <p className="border-t border-[#d07f05]/20 pt-6 font-sans text-[11px] leading-relaxed text-[#f1e9d8]/50 sm:text-xs">
          This telling draws on Deresse Ayenachew&rsquo;s study,{" "}
          <em>
            &ldquo;A historical overview of the W&auml;r&#287;&#601;&#7717; Muslim
            community in the Christian highland of &Scaron;&auml;wa&rdquo;
          </em>{" "}
          (Afriques, 2016, doi:10.4000/afriques.1944), together with the oral
          traditions of our villages.
        </p>
        <button
          type="button"
          onClick={onFold}
          className="inline-flex items-center gap-3 rounded-xl border border-[#d07f05]/40 px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.25em] text-[#d07f05] transition-colors hover:border-[#d07f05] hover:bg-[#d07f05]/10 sm:text-[11px]"
        >
          <span>Fold the story</span>
          <span aria-hidden>&uarr;</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function UnfoldHistory() {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const [jumpTo, setJumpTo] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const pendingDelta = useRef(0);
  const prevAnchor = useRef("");

  const openStory = () => {
    openedAt.current = Date.now();
    setOpen(true);
  };

  // Open from the hero button / footer link, or a #unfold-history URL
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (a && a.getAttribute("href")?.endsWith("#unfold-history")) {
        openedAt.current = Date.now();
        setOpen(true);
      }
    };
    const onHash = () => {
      if (window.location.hash === "#unfold-history") {
        openedAt.current = Date.now();
        setOpen(true);
      }
    };

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    const t = setTimeout(onHash, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // Jump to a chapter after opening from an era dot
  useEffect(() => {
    if (open && jumpTo !== null) {
      const t = setTimeout(() => {
        document
          .getElementById(`chapter-${jumpTo}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        setJumpTo(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [open, jumpTo]);

  // AUTO-FOLD: collapse when the story is well out of view
  useEffect(() => {
    if (!open) return;
    const el = storyRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;
        if (Date.now() - openedAt.current < 1200) return; // just opened
        const rect = entry.boundingClientRect;
        if (rect.height < 200) return; // still animating

        const wasAbove = rect.bottom <= 0;
        pendingDelta.current = wasAbove ? rect.height : 0;

        // step 1: switch to an instant collapse, step 2: close
        setInstant(true);
        requestAnimationFrame(() => {
          const root = document.documentElement;
          prevAnchor.current = root.style.overflowAnchor;
          root.style.overflowAnchor = "none"; // we compensate manually
          setOpen(false);
        });
      },
      { rootMargin: "400px 0px 400px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [open]);

  // After an auto-fold finishes, keep the reader's place on the page
  const onExitComplete = () => {
    if (pendingDelta.current > 0) {
      window.scrollBy({
        top: -pendingDelta.current,
        behavior: "instant" as ScrollBehavior,
      });
      pendingDelta.current = 0;
    }
    document.documentElement.style.overflowAnchor = prevAnchor.current;
    setInstant(false);
  };

  // Manual fold (button): animate and return to the title
  const fold = () => {
    setOpen(false);
    setTimeout(
      () =>
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      50
    );
  };

  return (
    <section
      ref={sectionRef}
      id="unfold-history"
      className="scroll-mt-20 bg-[#0b0a09] px-5 py-14 text-[#f1e9d8] sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        {/* Title block (always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d07f05] sm:text-xs">
            The Werji Story &middot; Seven Chapters
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl">
            Unfold History
          </h2>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-cormorant)] text-base italic leading-relaxed text-[#cfc6b3] sm:text-xl">
            Nine centuries of herders, traders and settlers, told the way our
            elders tell it.
          </p>
        </motion.div>

        {/* Era thread (always visible, compact) */}
        <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative flex min-w-[560px] items-start justify-between pt-[5px]">
            <div className="absolute left-0 right-0 top-[10px] h-px bg-gradient-to-r from-[#d07f05]/10 via-[#d07f05]/50 to-[#d07f05]/10" />
            {chapters.map((c, i) => (
              <button
                key={c.era}
                type="button"
                onClick={() => {
                  openStory();
                  setJumpTo(i);
                }}
                aria-label={`Open chapter ${i + 1}: ${c.title}`}
                className="group relative flex flex-col items-center gap-2 px-1"
              >
                <span className="h-[11px] w-[11px] rounded-full border border-[#d07f05] bg-[#0b0a09] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#d07f05]" />
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#cfc6b3]/70 transition-colors group-hover:text-[#d07f05] sm:text-xs">
                  {c.short}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => (open ? fold() : openStory())}
          aria-expanded={open}
          aria-controls="unfold-history-story"
          className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#e88d22]/40 bg-black/50 px-5 py-2.5 font-sans text-[10px] uppercase tracking-[0.25em] text-[#f1e9d8] transition-all hover:border-[#e88d22] sm:px-6 sm:py-3 sm:text-[11px]"
        >
          <span>{open ? "Fold the story" : "Unfold the story"}</span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#e88d22]"
          >
            &darr;
          </motion.span>
        </button>

        {/* Expandable story */}
        <AnimatePresence initial={false} onExitComplete={onExitComplete}>
          {open && (
            <motion.div
              ref={storyRef}
              id="unfold-history-story"
              key="story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: instant ? 0 : 0.5 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <Story onFold={fold} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}