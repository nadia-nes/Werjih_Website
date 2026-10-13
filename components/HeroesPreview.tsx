"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
import Reveal from "@/components/Reveal";

interface HeroItem {
  id: string;
  name?: string;
  title?: string;
  title_am?: string | null; // optional new Supabase column
  image_url?: string;
}

export default function HeroesPreview() {
  const t = useTranslations("HeroesPreview");
  const locale = useLocale();

  const [heroes, setHeroes] = useState<HeroItem[]>([]);

  useEffect(() => {
    async function fetchHeroes() {
      try {
        const { data, error } = await supabase.from("heroes").select("*");

        if (!error && data) {
          const formattedHeroes = data.map((item) => {
            let imgPath = item.image_url;

            if (imgPath && !imgPath.startsWith("http")) {
              const { data: publicUrlData } = supabase.storage
                .from("heroes")
                .getPublicUrl(imgPath);

              imgPath = publicUrlData.publicUrl;
            }

            return {
              ...item,
              image_url: imgPath || "",
            };
          });
          setHeroes(formattedHeroes);
        }
      } catch (err) {
        console.error("Error loading preview avatars:", err);
      }
    }
    fetchHeroes();
  }, []);

  const previewHeroes = heroes.slice(0, 3);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#d07f05]/20">
      <Reveal direction="zoom">
        <div className="w-full bg-[#12100e] border border-[#d07f05]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
                {t("eyebrow")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f3ed]">{t("title")}</h3>
              <p className="text-[#ab9f94] text-sm font-sans font-light leading-relaxed">
                {t("text")}
              </p>
            </div>

            <div className="flex items-center gap-6 self-start md:self-center">
              <div className="flex -space-x-3 overflow-hidden">
                {previewHeroes.length > 0 ? (
                  previewHeroes.map((hero, index) => (
                    <div
                      key={hero.id || index}
                      className="w-10 h-10 rounded-full border-2 border-[#12100e] overflow-hidden bg-black/60 flex items-center justify-center shadow-md relative"
                    >
                      {hero.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={hero.image_url}
                          alt={(locale === "am" && hero.title_am) || hero.title || t("alt")}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[9px] font-mono text-[#ab9f94]">0{index + 1}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-xs font-mono text-[#ab9f94]">{t("loading")}</div>
                )}
              </div>

              <Link
                href="/heroes"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#d07f05] border border-[#d07f05]/40 hover:border-[#d07f05] px-5 py-3 rounded-xl transition-all duration-300 hover:bg-[#d07f05]/10 whitespace-nowrap"
              >
                <span>{t("cta")}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}