'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Child = { label: string; href: string };
type Item = { label: string; href?: string; children?: Child[] };

const LEFT: Item[] = [
  { label: 'Home', href: '/' },
  {
    label: 'History',
    children: [
      { label: 'Origins of the Werji People', href: '/history/origins' },
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname() ?? '';

  // Close mobile drawer seamlessly on route change via transition
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (item: Item): boolean => {
    if (item.href) {
      return item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/');
    }
    return !!item.children?.some((c) => pathname === c.href);
  };

  const childActive = (href: string): boolean => pathname === href;

  const DesktopItem = ({ item }: { item: Item }) => {
    const active = isActive(item);

    const labelContent = (
      <span className="relative inline-flex items-center gap-2 px-3.5 py-2">
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
            active ? 'text-[#fdf6ec]' : 'text-[#c8b79b] group-hover:text-[#fdf6ec]'
          }`}
        >
          {item.label}
        </span>

        {item.children && (
          <svg
            viewBox="0 0 10 6"
            className="h-2 w-2.5 text-[#d07f05] transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1l4 4 4-4" />
          </svg>
        )}

        <span
          aria-hidden
          className={`absolute inset-x-2 -bottom-1 h-0.5 origin-center rounded-full bg-gradient-to-r from-transparent via-[#f0a024] to-transparent transition-all duration-500 ease-out ${
            active
              ? 'scale-x-100 opacity-100 shadow-[0_0_14px_3px_rgba(240,160,36,0.6)]'
              : 'scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-70'
          }`}
        />
      </span>
    );

    return (
      <li className="group relative">
        {item.href ? (
          <Link
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#f0a024]/60"
          >
            {labelContent}
          </Link>
        ) : (
          <>
            <button
              type="button"
              aria-haspopup="menu"
              className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#f0a024]/60"
            >
              {labelContent}
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-3 pt-2 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="relative overflow-hidden rounded-2xl border border-[#d07f05]/30 bg-[#0c0806]/95 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d07f05]/10 blur-2xl pointer-events-none" />
                
                <div className="relative flex flex-col gap-1">
                  {item.children!.map((c) => {
                    const isChildActive = childActive(c.href);
                    return (
                      <Link
                        key={c.href}
                        href={c.href}
                        aria-current={isChildActive ? 'page' : undefined}
                        className={`group/link relative flex items-center justify-between rounded-xl px-4 py-3 text-[13px] tracking-wide transition-all duration-300 ${
                          isChildActive
                            ? 'bg-gradient-to-r from-[#d07f05]/20 to-transparent text-[#fdf6ec] font-medium'
                            : 'text-[#c8b79b] hover:bg-white/[0.04] hover:text-[#fdf6ec] hover:translate-x-1'
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              isChildActive ? 'bg-[#f0a024] shadow-[0_0_8px_#f0a024]' : 'bg-[#d07f05]/40 group-hover/link:bg-[#f0a024]'
                            }`}
                          />
                          {c.label}
                        </span>

                        {isChildActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#f0a024] shadow-[0_0_10px_#f0a024]" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </li>
    );
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5 transition-all duration-500">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Main"
          className={`relative grid grid-cols-[auto_1fr_auto] items-center rounded-2xl border px-4 transition-all duration-500 md:grid-cols-[1fr_auto_1fr] sm:px-8 ${
            scrolled
              ? 'h-16 border-[#d07f05]/35 bg-[#0a0705]/90 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl'
              : 'h-20 border-[#d07f05]/20 bg-[#0d0906]/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl'
          }`}
        >
          <span className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent" />

          <ul className="hidden items-center justify-start gap-1 md:flex lg:gap-2">
            {LEFT.map((i) => (
              <DesktopItem key={i.label} item={i} />
            ))}
          </ul>

          <Link
            href="/"
            className="group col-start-1 text-left leading-none md:col-start-2 md:text-center outline-none focus-visible:ring-2 focus-visible:ring-[#f0a024]/60 rounded-lg p-1"
          >
            <span className="block font-sans text-[9px] uppercase tracking-[0.45em] text-[#d07f05] font-semibold transition-colors group-hover:text-[#f0a024]">
              The Tigri
            </span>
            <span className="mt-1 block font-serif text-base font-bold uppercase tracking-[0.25em] text-[#fdf6ec] transition-all duration-300 group-hover:scale-[1.02] group-hover:text-white">
              Werjihs
            </span>
          </Link>

          <ul className="hidden items-center justify-end gap-1 md:flex lg:gap-2">
            {RIGHT.map((i) => (
              <DesktopItem key={i.label} item={i} />
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-xl border border-[#d07f05]/30 bg-white/[0.02] text-[#d8c5a8] transition-all duration-300 hover:border-[#d07f05]/60 hover:bg-[#d07f05]/10 hover:text-[#fdf6ec] md:hidden outline-none focus-visible:ring-2 focus-visible:ring-[#f0a024]"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileOpen ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  mobileOpen ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>

        <div
          className={`md:hidden grid transition-all duration-300 ease-in-out ${
            mobileOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-[#d07f05]/30 bg-[#0a0705]/95 p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              <div className="flex flex-col gap-1.5">
                {MOBILE_ORDER.map((item) => {
                  const active = isActive(item);
                  const open = openSection === item.label;

                  const baseRowClass = `flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                    active
                      ? 'bg-[#d07f05]/15 text-[#fdf6ec] shadow-inner'
                      : 'text-[#c8b79b] hover:bg-white/[0.04] hover:text-[#fdf6ec]'
                  }`;

                  const indicatorBar = (
                    <span
                      className={`mr-3 h-4 w-1 rounded-full bg-[#f0a024] transition-all duration-300 ${
                        active ? 'opacity-100 shadow-[0_0_10px_#f0a024]' : 'opacity-0'
                      }`}
                    />
                  );

                  if (item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={baseRowClass}
                      >
                        <span className="flex items-center">
                          {indicatorBar}
                          {item.label}
                        </span>
                      </Link>
                    );
                  }

                  return (
                    <div key={item.label} className="overflow-hidden rounded-xl">
                      <button
                        type="button"
                        className={baseRowClass}
                        aria-expanded={open}
                        onClick={() => setOpenSection(open ? null : item.label)}
                      >
                        <span className="flex items-center">
                          {indicatorBar}
                          {item.label}
                        </span>
                        <svg
                          viewBox="0 0 10 6"
                          className={`h-2.5 w-3 text-[#d07f05] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 1l4 4 4-4" />
                        </svg>
                      </button>

                      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] pb-1' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <div className="ml-5 mt-1 flex flex-col gap-1 border-l border-[#d07f05]/25 py-1 pl-3">
                            {item.children!.map((c) => {
                              const isChildActive = childActive(c.href);
                              return (
                                <Link
                                  key={c.href}
                                  href={c.href}
                                  aria-current={isChildActive ? 'page' : undefined}
                                  className={`block rounded-lg px-3 py-2.5 text-[13px] tracking-wide transition-all duration-200 ${
                                    isChildActive
                                      ? 'font-bold text-[#f0a024] bg-[#d07f05]/10 shadow-sm'
                                      : 'text-[#c8b79b] hover:bg-white/[0.03] hover:text-[#fdf6ec]'
                                  }`}
                                >
                                  {c.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}