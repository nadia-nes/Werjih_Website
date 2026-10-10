"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Hero {
  id: string;
  key: string; // translation key in messages ("Heroes.items.<key>")
  matchTitle: string; // English title, used to match Supabase rows
  amharicName?: string;
  image_url: string;
  audio_url: string;
}

const BASE_HEROES: Hero[] = [
  {
    id: "ali-abdo",
    key: "aliAbdo",
    matchTitle: "Ali Abdo",
    amharicName: "አሊ አብዶ",
    image_url: "",
    audio_url: "",
  },
  {
    id: "fitawrari-aba-werjih",
    key: "abaWerjih",
    matchTitle: "Fitawrari Aba Werjih",
    amharicName: "አባ ወርጂ (ፊትአውራሪ አባ ወርጂ)",
    image_url: "",
    audio_url: "",
  },
];

function HeroItem({
  hero,
  expandedId,
  setExpandedId,
}: {
  hero: Hero;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  const t = useTranslations("Heroes");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isExpanded = expandedId === hero.id;

  // Track when the item leaves the visible viewport
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px" });

  useEffect(() => {
    // If it scrolls out of view and it was currently expanded, auto-collapse it
    if (!isInView && isExpanded) {
      setExpandedId(null);
    }
  }, [isInView, isExpanded, hero.id, setExpandedId]);

  const title = t(`items.${hero.key}.title`);

  return (
    <div ref={ref} className="border-b border-[#3a332d] pb-8 transition-colors">
      <div
        onClick={() => setExpandedId(isExpanded ? null : hero.id)}
        className="cursor-pointer group py-2"
      >
        <div className="flex items-center space-x-3 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#d07f05]"></span>
          <span className="text-xs font-mono text-[#d07f05] tracking-widest uppercase">
            {t(`items.${hero.key}.role`)}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl text-[#f4efe6] group-hover:text-[#d07f05] transition-colors">
            {title}
            {/* The Amharic name is only shown next to the English title */}
            {locale !== "am" && hero.amharicName && (
              <span className="text-xl text-[#d07f05] font-normal ml-2">{hero.amharicName}</span>
            )}
          </h2>
          <span className="text-xs font-mono text-[#a3978c] underline underline-offset-4 group-hover:text-white transition-colors">
            {isExpanded ? t("collapse") : t("expand")}
          </span>
        </div>
      </div>

      {/* Expanded Detailed Record View */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 space-y-8 pt-6 border-t border-[#3a332d]/60 font-sans"
        >
          {/* Hero Portrait & Audio Grid if available */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 relative aspect-square rounded-xl overflow-hidden border border-[#3a332d] bg-[#121110]">
              {hero.image_url ? (
                <Image
                  src={hero.image_url}
                  alt={title || t("imageAlt")}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#736a61] space-y-2">
                  <span className="text-3xl">🏛</span>
                  <span className="text-[9px] font-mono tracking-widest uppercase">
                    {t("archiveImage")}
                  </span>
                </div>
              )}
            </div>

            <div className="sm:col-span-7 space-y-4">
              <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#d07f05]">
                {t("biography")}
              </h3>
              <p className="text-[#c5bbb2] text-sm leading-relaxed font-light whitespace-pre-line">
                {t(`items.${hero.key}.description`)}
              </p>
            </div>
          </div>

          {/* Enduring Legacy Section */}
          <div className="space-y-3 bg-[#121110] border border-[#3a332d] p-6 rounded-xl">
            <h3 className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#d07f05]">
              {t("legacy")}
            </h3>
            <p className="text-[#ded6cb] text-sm italic font-serif leading-relaxed">
              {`“${t(`items.${hero.key}.legacy`)}”`}
            </p>
          </div>

          {/* Audio Player if present */}
          {hero.audio_url && (
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#d07f05]">
                {t("audio")}
              </div>
              <audio controls className="w-full h-9 accent-[#d07f05]">
                <source src={hero.audio_url} type="audio/mpeg" />
                {t("audioUnsupported")}
              </audio>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default function HeroesContent() {
  const t = useTranslations("Heroes");
  const [heroes, setHeroes] = useState<Hero[]>(BASE_HEROES);
  const [expandedId, setExpandedId] = useState<string | null>("ali-abdo");

  useEffect(() => {
    async function fetchSupabaseMedia() {
      const { data, error } = await supabase.from("heroes").select("*");
      if (!error && data && data.length > 0) {
        const formattedHeroes = data.map((hero) => {
          let fullImageUrl = hero.image_url;

          // If it's a relative path, convert it to Supabase's public storage URL
          if (hero.image_url && !hero.image_url.startsWith("http")) {
            const { data: publicUrlData } = supabase.storage
              .from("heroes")
              .getPublicUrl(hero.image_url);

            fullImageUrl = publicUrlData.publicUrl;
          }

          return {
            ...hero,
            image_url: fullImageUrl,
          };
        });

        // Merge fetched Supabase rows with the local data safely
        setHeroes((prevHeroes) =>
          prevHeroes.map((localHero) => {
            const remoteMatch = formattedHeroes.find(
              (item) =>
                item.title?.toLowerCase().includes(localHero.matchTitle.toLowerCase()) ||
                localHero.matchTitle.toLowerCase().includes(item.title?.toLowerCase() || "")
            );

            if (!remoteMatch) return localHero;

            return {
              ...localHero,
              image_url: remoteMatch.image_url || localHero.image_url,
            };
          })
        );
      }
    }
    fetchSupabaseMedia();
  }, []);

  return (
    <div className="min-h-screen bg-[#090807] text-[#e5dcd3] font-serif selection:bg-[#d07f05] selection:text-black py-20 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Archive Header Metadata */}
        <div className="space-y-4 border-b border-[#3a332d] pb-8 text-center sm:text-left">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
            {t("eyebrow")}
          </div>
          <h1 className="text-4xl sm:text-6xl font-normal text-[#f4efe6] tracking-tight">
            {t("title")}
          </h1>
          <p className="text-[#a3978c] text-sm sm:text-base font-sans font-light leading-relaxed max-w-xl">
            {t("intro")}
          </p>
        </div>

        {/* Section Marker */}
        <div className="border-b border-[#3a332d] pb-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#d07f05]">
            {t("section1")}
          </span>
        </div>

        {/* Archive Timeline Feed */}
        <div className="space-y-6">
          {heroes.map((hero) => (
            <HeroItem
              key={hero.id}
              hero={hero}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            />
          ))}
        </div>

        {/* Closing Call to Action / Manifesto */}
        <section className="border-t border-[#3a332d] pt-16 space-y-6 text-center">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
            {t("section2")}
          </div>
          <h3 className="text-2xl sm:text-3xl text-[#f4efe6]">{t("manifestoTitle")}</h3>
          <p className="text-[#a3978c] text-sm font-sans font-light leading-relaxed max-w-xl mx-auto">
            {t("manifesto")}
          </p>
        </section>

        {/* Return Navigation */}
        <div className="pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#d07f05] hover:text-white transition-colors border-b border-[#d07f05] pb-1"
          >
            <span>{t("back")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}