'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';

/*
  Calm palette (matches the hero)
  #080604 ink · #0d0a07 surface · #f1e9d8 ivory · #cfc6b3 stone
  #e6cfa6 champagne · #d9a05a soft amber · #c98a3c antique bronze
*/

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const sans = Inter({ subsets: ['latin'], display: 'swap' });

type Child = { label: string; href: string };
type Item = { label: string; href?: string; children?: Child[] };

const LEFT: Item[] = [
  { label: 'Home', href: '/' },
  {
    label: 'History',
    children: [
      { label: 'Origins of the Werjih People', href: '/history/origins' },
      { label: 'Migration History', href: '/history/migration' },
      { label: 'Historical Timeline', href: '/history/timeline' },
    ],
  },
  {
    label: 'Culture',
    children: [
      { label: 'Traditional Clothing', href: '/culture/clothing' },
      { label: 'Food & Cuisine', href: '/culture/cuisine' },
      { label: 'Music & Heritage', href: '/culture/music' },
      { label: 'Marriage Tradition', href: '/culture/marriage-tradition' },
    ],
  },
];

const RIGHT: Item[] = [
  {
    label: 'Community',
    children: [
      { label: 'Programs & Events', href: '/community/programs-and-events' },
      { label: 'Vanguard of Islam', href: '/community/vanguard-of-islam' },
    ],
  },
  { label: 'Memorial', href: '/memorial' },
  { label: 'Archive', href: '/archive' },
];

const MOBILE_ORDER = [...LEFT, ...RIGHT];
const EASE = [0.22, 1, 0.36, 1] as const;

const isItemActive = (item: Item, pathname: string): boolean => {
  if (item.href) {
    return item.href === '/'
      ? pathname === '/'
      : pathname === item.href || pathname.startsWith(item.href + '/');
  }
  return !!item.children?.some((c) => pathname === c.href);
};

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className={`h-2.5 w-3 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

/* Defined outside Navbar so it never remounts on scroll */
function DesktopItem({
  item,
  pathname,
  open,
  setOpen,
  reduce,
}: {
  item: Item;
  pathname: string;
  open: boolean;
  setOpen: (label: string | null) => void;
  reduce: boolean;
}) {
  const active = isItemActive(item, pathname);
  const menuId = `menu-${item.label.toLowerCase()}`;

  const label = (
    <span className="relative inline-flex items-center gap-1.5 px-3 py-2.5">
      <span
        className={`text-[16px] font-medium tracking-[0.005em] transition-colors duration-300 ${
          active || open ? 'text-[#f1e9d8]' : 'text-[#cfc6b3] group-hover:text-[#f1e9d8]'
        }`}
      >
        {item.label}
      </span>

      {item.children && (
        <Chevron
          className={`text-[#c98a3c] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      )}

      {/* A quiet dot glides to the active page */}
      {active && (
        <motion.span
          layoutId="nav-dot"
          aria-hidden
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 34 }}
          className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c98a3c]"
        />
      )}
    </span>
  );

  return (
    <li
      className="group relative"
      onMouseEnter={() => item.children && setOpen(item.label)}
      onMouseLeave={() => item.children && setOpen(null)}
      onBlur={(e) => {
        if (item.children && !e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(null);
      }}
    >
      {item.href ? (
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70"
        >
          {label}
        </Link>
      ) : (
        <>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(open ? null : item.label)}
            className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70"
          >
            {label}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                id={menuId}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : 4 }}
                transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
                className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0a07]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
                  <div className="flex flex-col">
                    {item.children!.map((c) => {
                      const childActive = pathname === c.href;
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          aria-current={childActive ? 'page' : undefined}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[16px] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70 ${
                            childActive
                              ? 'bg-[#c98a3c]/[0.12] text-[#f1e9d8]'
                              : 'text-[#cfc6b3] hover:bg-white/[0.05] hover:text-[#f1e9d8]'
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              childActive ? 'bg-[#c98a3c]' : 'bg-[#c98a3c]/40'
                            }`}
                          />
                          {c.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </li>
  );
}

export default function Navbar() {
  const reduce = useReducedMotion() ?? false;
  const pathname = usePathname() ?? '';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Close menus when the route changes (during render, no effect needed)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20));

  // Close on outside tap / Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // Close the mobile menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={`${sans.className} sticky top-0 z-50 px-3 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4`}
    >
      {/* Dim backdrop behind the open mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 -z-10 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Main"
          className={`relative grid grid-cols-[auto_1fr_auto] items-center rounded-full border px-4 backdrop-blur-xl transition-all duration-500 sm:px-7 lg:grid-cols-[1fr_auto_1fr] ${
            scrolled
              ? 'h-16 border-[#c98a3c]/25 bg-[#080604]/90 shadow-[0_14px_40px_rgba(0,0,0,0.6)] lg:h-[68px]'
              : 'h-[68px] border-white/[0.08] bg-[#080604]/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] lg:h-20'
          }`}
        >
          {/* Left links */}
          <ul className="hidden items-center justify-start gap-0.5 lg:flex xl:gap-1.5">
            {LEFT.map((i) => (
              <DesktopItem
                key={i.label}
                item={i}
                pathname={pathname}
                open={openMenu === i.label}
                setOpen={setOpenMenu}
                reduce={reduce}
              />
            ))}
          </ul>

          {/* Wordmark only: no tile, no icon */}
          <Link
            href="/"
            aria-label="The Tigri Werjih's, home"
            className="group col-start-1 flex flex-col items-start justify-self-start rounded-xl px-1 py-1 leading-none outline-none focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70 lg:col-start-2 lg:items-center lg:justify-self-center"
          >
            <span
              className={`${display.className} text-[15px] font-medium italic tracking-[0.08em] text-[#c98a3c] sm:text-base`}
            >
              The Tigri
            </span>
            <span
              className={`${display.className} mt-1 text-2xl font-semibold tracking-[0.18em] text-[#f1e9d8] transition-colors duration-300 group-hover:text-[#e6cfa6] sm:text-[1.7rem] lg:text-3xl`}
            >
              WERJIH&apos;S
            </span>
          </Link>

          {/* Right links */}
          <ul className="hidden items-center justify-end gap-0.5 lg:flex xl:gap-1.5">
            {RIGHT.map((i) => (
              <DesktopItem
                key={i.label}
                item={i}
                pathname={pathname}
                open={openMenu === i.label}
                setOpen={setOpenMenu}
                reduce={reduce}
              />
            ))}
          </ul>

          {/* Mobile toggle (48px touch target) */}
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="col-start-3 flex h-12 w-12 items-center justify-center justify-self-end rounded-full border border-white/15 text-[#f1e9d8] outline-none transition-colors duration-300 hover:border-[#c98a3c]/60 hover:bg-[#c98a3c]/10 focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70 lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'top-[7px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: reduce ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0.01 : 0.25, ease: EASE }}
              className="mt-3 lg:hidden"
            >
              <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-[#0d0a07]/97 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                <ul className="flex flex-col gap-0.5">
                  {MOBILE_ORDER.map((item) => {
                    const active = isItemActive(item, pathname);
                    const open = mobileSection === item.label;
                    const rowClass = `flex min-h-[54px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[18px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70 ${
                      active
                        ? 'bg-[#c98a3c]/[0.12] text-[#f1e9d8]'
                        : 'text-[#cfc6b3] hover:bg-white/[0.05] hover:text-[#f1e9d8] active:bg-white/[0.08]'
                    }`;
                    const dot = (
                      <span
                        aria-hidden
                        className={`mr-3 h-2 w-2 rounded-full bg-[#c98a3c] transition-opacity duration-300 ${
                          active ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    );

                    if (item.href) {
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={rowClass}
                          >
                            <span className="flex items-center">
                              {dot}
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          className={rowClass}
                          aria-expanded={open}
                          onClick={() => setMobileSection(open ? null : item.label)}
                        >
                          <span className="flex items-center">
                            {dot}
                            {item.label}
                          </span>
                          <Chevron
                            className={`text-[#c98a3c] transition-transform duration-300 ${
                              open ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduce ? 0.01 : 0.28, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="ml-7 mt-1 flex flex-col gap-0.5 border-l border-[#c98a3c]/30 py-1 pl-3">
                                {item.children!.map((c) => {
                                  const childActive = pathname === c.href;
                                  return (
                                    <Link
                                      key={c.href}
                                      href={c.href}
                                      aria-current={childActive ? 'page' : undefined}
                                      className={`flex min-h-[48px] items-center rounded-xl px-3 py-2.5 text-[17px] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#e6cfa6]/70 ${
                                        childActive
                                          ? 'bg-[#c98a3c]/[0.12] text-[#e6cfa6]'
                                          : 'text-[#cfc6b3] hover:bg-white/[0.05] hover:text-[#f1e9d8] active:bg-white/[0.08]'
                                      }`}
                                    >
                                      {c.label}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}