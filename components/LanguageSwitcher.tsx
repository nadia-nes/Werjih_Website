"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Locale = "en" | "am";

const subscribe = () => () => {};
const hasChosen = () => document.cookie.includes("NEXT_LOCALE=");

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [, startTransition] = useTransition();

  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const chosen = useSyncExternalStore(subscribe, hasChosen, () => true);
  const [dismissed, setDismissed] = useState(false);

  const setLocale = (l: Locale) => {
    document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
    setDismissed(true);
    startTransition(() => router.refresh());
  };

  const showModal = mounted && !chosen && !dismissed;

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#d07f05]/40 bg-[#121212] p-8 text-center">
        <h2 className="text-2xl text-white mb-1">Choose your language</h2>
        <h2 className="text-2xl text-white mb-6">ቋንቋዎን ይምረጡ</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setLocale("en")}
            className="flex-1 rounded-full bg-[#d07f05] py-3 font-semibold text-black hover:bg-white transition-colors"
          >
            English
          </button>
          <button
            onClick={() => setLocale("am")}
            className="flex-1 rounded-full bg-[#d07f05] py-3 font-semibold text-black hover:bg-white transition-colors"
          >
            አማርኛ
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setLocale(locale === "en" ? "am" : "en")}
        className="rounded-full border border-[#d07f05]/50 px-3 py-2 text-xs font-semibold text-[#d07f05] transition-colors hover:bg-[#d07f05] hover:text-black"
      >
        {locale === "en" ? "አማርኛ" : "English"}
      </button>
      {showModal && createPortal(modal, document.body)}
    </>
  );
}