"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Script from "next/script";

type Lang = "en" | "am";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => unknown;
      };
    };
    __domPatched?: boolean;
  }
}

const CHOSEN = "werjih-lang-chosen";

// Browser-only values read through useSyncExternalStore (no setState in effects)
const subscribe = () => () => {};

const getLang = (): Lang =>
  /(?:^|; )googtrans=\/en\/am/.test(document.cookie) ? "am" : "en";

const readChosen = (): boolean => {
  try {
    return !!localStorage.getItem(CHOSEN);
  } catch {
    return true; // storage blocked: don't nag with the popup
  }
};

function applyLang(l: Lang) {
  const host = location.hostname;
  if (l === "am") {
    document.cookie = "googtrans=/en/am; path=/";
    document.cookie = `googtrans=/en/am; path=/; domain=${host}`;
  } else {
    const gone = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = gone;
    document.cookie = `${gone}; domain=${host}`;
  }
  location.reload();
}

// Stops React crashing when Google Translate rewrites text nodes
function patchDom() {
  if (window.__domPatched) return;
  window.__domPatched = true;

  const origRemove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return origRemove.call(this, child) as T;
  } as typeof Node.prototype.removeChild;

  const origInsert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    ref: Node | null
  ): T {
    if (ref && ref.parentNode !== this) return newNode;
    return origInsert.call(this, newNode, ref) as T;
  } as typeof Node.prototype.insertBefore;
}

export default function TranslateToggle() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const lang = useSyncExternalStore(subscribe, getLang, (): Lang => "en");
  const chosenBefore = useSyncExternalStore(subscribe, readChosen, () => true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    patchDom();
    window.googleTranslateElementInit = () => {
      if (!window.google) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,am", autoDisplay: false },
        "google_translate_element"
      );
    };
  }, []);

  const showModal = mounted && !chosenBefore && !dismissed;

  const choose = (l: Lang) => {
    try {
      localStorage.setItem(CHOSEN, "1");
    } catch {}
    setDismissed(true);
    if (l !== lang) applyLang(l);
  };

  const modal = (
    <div
      translate="no"
      className="notranslate fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
    >
      <div className="w-full max-w-sm rounded-2xl border border-[#d07f05]/40 bg-[#121212] p-8 text-center">
        <h2 className="text-2xl text-white mb-1">Choose your language</h2>
        <h2 className="text-2xl text-white mb-6">ቋንቋዎን ይምረጡ</h2>
        <div className="flex gap-3">
          <button
            onClick={() => choose("en")}
            className="flex-1 rounded-full bg-[#d07f05] py-3 font-semibold text-black hover:bg-white transition-colors"
          >
            English
          </button>
          <button
            onClick={() => choose("am")}
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
      <div id="google_translate_element" className="hidden" />
      {mounted && (
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      )}

      {/* Navbar toggle */}
      <button
        type="button"
        translate="no"
        onClick={() => applyLang(lang === "en" ? "am" : "en")}
        className="notranslate rounded-full border border-[#d07f05]/50 px-3 py-2 text-xs font-semibold text-[#d07f05] transition-colors hover:bg-[#d07f05] hover:text-black"
      >
        {lang === "en" ? "አማርኛ" : "English"}
      </button>

      {/* First-visit picker, portaled to <body> so the navbar's blur can't trap it */}
      {showModal && createPortal(modal, document.body)}
    </>
  );
}