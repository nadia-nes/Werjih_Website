// components/BookAdvertSection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

interface BookAdvertItem {
  id: string;
  title: string;
  description: string;
  title_am?: string | null; // optional new Supabase columns
  description_am?: string | null;
  video_url: string;
}

const SELLERS = [
  { key: "roza", phone: "0988022885" },
  { key: "hamid", phone: "0911646448" },
  { key: "ali", phone: "0912008319" },
  { key: "hussein", phone: "0922158994" },
  { key: "adam", phone: "0923433183" },
];

function AdvertCard({ item }: { item: BookAdvertItem }) {
  const t = useTranslations("BookAdvert");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const title = (locale === "am" && item.title_am) || item.title;
  const description = (locale === "am" && item.description_am) || item.description;

  // Auto-collapse when scrolling completely out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsOpen(false);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-[#d07f05]/30 bg-[#120e0a] shadow-2xl"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d07f05]/50 to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#d07f05]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-8 p-4 md:p-6">
        {/* Video */}
        <div className="md:col-span-3">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#d07f05]/30 bg-black shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <video
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-contain"
            >
              <source src={item.video_url} type="video/mp4" />
              {t("videoUnsupported")}
            </video>
          </div>
        </div>

        {/* Text + CTA */}
        <div className="md:col-span-2 flex flex-col justify-center gap-4">
          <div>
            <span className="inline-block text-[10px] font-mono tracking-[0.25em] uppercase text-[#d07f05] px-3 py-1 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5 mb-3">
              {t("nowAvailable")}
            </span>
            <h3 className="text-xl md:text-2xl font-serif text-[#f4e8d1] leading-tight mb-2">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            className={`group flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
              isOpen
                ? "bg-[#d07f05] border-[#d07f05] text-black"
                : "bg-[#d07f05]/10 border-[#d07f05]/40 text-[#d07f05] hover:bg-[#d07f05]/20"
            }`}
          >
            <span>
              <span className="block text-[9px] font-mono uppercase tracking-[0.25em] opacity-80">
                {t("getCopy")}
              </span>
              <span className="block text-sm font-bold">
                {t("distributors", { count: SELLERS.length })}
              </span>
            </span>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Distributors panel (compact) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-4 pt-3 border-t border-[#d07f05]/20">
              <p className="text-[10px] text-gray-500 font-serif mb-2">
                {t("area")}
              </p>

              <ul className="rounded-xl border border-[#d07f05]/20 bg-[#181615] divide-y divide-white/5 overflow-hidden">
                {SELLERS.map((seller, i) => {
                  const name = t(`sellers.${seller.key}.name`);
                  const place = t(`sellers.${seller.key}.place`);
                  return (
                    <li
                      key={seller.phone}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#d07f05]/5 transition-colors"
                    >
                      <span className="shrink-0 w-4 text-[10px] font-mono text-[#d07f05]/70">
                        {i + 1}
                      </span>

                      <p className="min-w-0 flex-1 truncate text-xs text-gray-100">
                        <span className="font-medium">{name}</span>
                        <span className="text-[#d07f05] text-[10px]"> · {place}</span>
                      </p>

                      <a
                        href={`tel:${seller.phone}`}
                        aria-label={t("callAria", { name })}
                        className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 hover:bg-[#d07f05] hover:text-black text-[#d07f05] text-[10px] font-mono transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        {seller.phone}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function BookAdvertSection() {
  const t = useTranslations("BookAdvert");
  const [adverts, setAdverts] = useState<BookAdvertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookAdverts() {
      try {
        const { data, error } = await supabase
          .from("book-advert")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setAdverts(data);
      } catch (err) {
        console.error("Error fetching book adverts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookAdverts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-xs font-mono text-[#d07f05]">
        {t("loading")}
      </div>
    );
  }

  if (adverts.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-6">
      {adverts.map((item) => (
        <AdvertCard key={item.id} item={item} />
      ))}
    </section>
  );
}