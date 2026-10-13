"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

// Names, descriptions and badges are translated in messages "Social.channels.<key>"
const socialChannels = [
  {
    key: "telegram",
    handle: "@WerjihSociety",
    icon: "✈️",
    link: "https://t.me/+b14galHOAIs3ZmY0",
  },
  {
    key: "youtube",
    handle: "The Werjih Society",
    icon: "▶",
    link: "https://youtube.com/@thewerjih?si=Wg9C1T6k0DpZox-b",
  },
  {
    key: "instagram",
    handle: "@werjih.society",
    icon: "📸",
    link: "#",
  },
  {
    key: "tiktok",
    handle: "@werjih_heritage",
    icon: "🎵",
    link: "#",
  },
];

export default function SocialChannelsWidget() {
  const t = useTranslations("Social");
  const [activeKey, setActiveKey] = useState(socialChannels[0].key);

  const activeSocial = socialChannels.find((c) => c.key === activeKey) ?? socialChannels[0];
  const socialComingSoon = !activeSocial.link || activeSocial.link === "#";
  const channelName = (key: string) => t(`channels.${key}.name`);

  return (
    <section
      id="social-channels"
      className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-14 border-t border-[#d07f05]/25 relative"
    >
      <style>{`
        @keyframes socialIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        .social-in { animation: socialIn .35s ease-out both }
        @media (prefers-reduced-motion: reduce) { .social-in { animation: none } }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] bg-[#d07f05]/10 rounded-full blur-[100px] pointer-events-none" />

      <Reveal direction="zoom">
        <div className="relative text-center mb-7">
          <span className="text-[10px] font-bold text-[#d07f05] uppercase tracking-[0.25em] bg-[#d07f05]/10 px-3 py-1 rounded-full border border-[#d07f05]/20">
            {t("badge")}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-1.5">
            {t.rich("heading", {
              hl: (chunks) => <span className="text-[#d07f05]">{chunks}</span>,
            })}
          </h2>
          <p className="text-gray-400 text-xs">{t("hint")}</p>
        </div>

        <div className="relative rounded-2xl border border-[#d07f05]/30 bg-[#141313]/90 backdrop-blur-md shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d07f05]/50 to-transparent" />

          {/* Icon dock */}
          <div className="flex items-start justify-center gap-3 sm:gap-5 px-4 pt-6 pb-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {socialChannels.map((channel) => {
              const isSelected = activeSocial.key === channel.key;
              return (
                <button
                  key={channel.key}
                  type="button"
                  onClick={() => setActiveKey(channel.key)}
                  aria-pressed={isSelected}
                  aria-label={channelName(channel.key)}
                  className="group shrink-0 flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-[#d07f05] text-black border-[#d07f05] -translate-y-1 shadow-[0_10px_28px_rgba(208,127,5,0.45)]"
                        : "bg-[#1a1919] text-gray-300 border-[#d07f05]/20 group-hover:border-[#d07f05]/60 group-hover:-translate-y-0.5"
                    }`}
                  >
                    {channel.icon}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      isSelected ? "text-[#d07f05]" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {channelName(channel.key)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details strip */}
          <div
            key={activeSocial.key}
            className="social-in border-t border-[#d07f05]/20 bg-[#1a1919]/80 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/30 text-[#d07f05] text-[10px] font-bold uppercase tracking-wider">
                  {t(`channels.${activeSocial.key}.badge`)}
                </span>
                <span className="text-xs font-mono text-gray-400 truncate">
                  {activeSocial.handle}
                </span>
              </div>
              <p className="mt-1.5 text-gray-300 text-xs font-light leading-relaxed line-clamp-2 max-w-md">
                {t(`channels.${activeSocial.key}.description`)}
              </p>
            </div>

            {socialComingSoon ? (
              <span className="shrink-0 px-5 py-2.5 rounded-full border border-dashed border-[#d07f05]/40 text-[#d07f05]/80 text-[11px] font-mono uppercase tracking-widest">
                {t("comingSoon")}
              </span>
            ) : (
              <a
                href={activeSocial.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#d07f05] text-black font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-[#e8921a] transition-all duration-300 shadow-lg"
              >
                {t("join", { name: channelName(activeSocial.key) })}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}