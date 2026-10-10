"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface JourneyCardProps {
  id: string;
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

function JourneyCard({ title, description, isOpen, setIsOpen, children }: JourneyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track when the card leaves the visible viewport to auto-collapse
  const isInView = useInView(ref, { margin: "-80px 0px -80px 0px" });

  useEffect(() => {
    if (!isInView && isOpen) {
      setIsOpen(false);
    }
  }, [isInView, isOpen, setIsOpen]);

  return (
    <div 
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className="bg-[#121110] border border-[#3a332d] rounded-xl p-8 shadow-xl cursor-pointer hover:border-[#d07f05]/60 transition-all font-sans"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-normal text-[#f4efe6]">{title}</h3>
        <span className={`text-[#d07f05] transform transition-transform duration-300 text-xs font-mono ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      
      <p className="text-[#a3978c] text-sm leading-relaxed mb-4 font-light">
        {description}
      </p>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-[#3a332d] text-[#c5bbb2] text-sm leading-relaxed space-y-4 font-light"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function BeginJourneySection() {
  const t = useTranslations("Journey");
  const [openCard1, setOpenCard1] = useState(true);
  const [openCard2, setOpenCard2] = useState(false);

  return (
    <section id="notice" className="max-w-5xl mx-auto px-6 sm:px-12 py-20 font-serif">
      <div className="space-y-3 mb-12 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
          {t("eyebrow")}
        </div>
        <h2 className="text-3xl sm:text-4xl font-normal text-[#f4efe6] tracking-tight">
          {t("title")}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Card 1 */}
        <JourneyCard 
          id="card1"
          title={t("card1.title")}
          description={t("card1.desc")}
          isOpen={openCard1}
          setIsOpen={setOpenCard1}
        >
          <p><strong className="text-[#d07f05] font-normal">{t("card1.headsUp")}</strong> {t("card1.p0")}</p>
          <p>{t("card1.p1")}</p>
          <p>{t("card1.p2")}</p>
          <p>{t("card1.p3")}</p>
          <p>{t("card1.p4")}</p>
          <p>{t("card1.p5")}</p>
        </JourneyCard>

        {/* Card 2 */}
        <JourneyCard 
          id="card2"
          title={t("card2.title")}
          description={t("card2.desc")}
          isOpen={openCard2}
          setIsOpen={setOpenCard2}
        >
          <p><strong className="text-[#d07f05] font-normal">{t("card2.fromRoots")}</strong> {t("card2.p0")}</p>
          <p>{t("card2.p1")}</p>
          <p>{t("card2.p2")}</p>
          <p>{t("card2.p3")}</p>
          <p>{t("card2.p4")}</p>
          <p><strong className="text-[#d07f05] font-normal">{t("card2.gathering")}</strong> {t("card2.p5")}</p>
          <p>{t("card2.p6")}</p>
          <p>{t("card2.p7")}</p>
          <p>{t("card2.p8")}</p>
        </JourneyCard>

      </div>
    </section>
  );
}