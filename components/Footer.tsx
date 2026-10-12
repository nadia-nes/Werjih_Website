import Link from "next/link";

const footerExplore = [
  { href: "/", label: "Home" },
  { href: "/#unfold-history", label: "Unfold History" },
  { href: "/#leadership", label: "History & Lineage" },
  { href: "/heroes", label: "Heroes & Figures" },
  { href: "/archive", label: "Digital Archive" },
];

const footerTakePart = [
  { href: "/#community", label: "Find Your Relatives" },
  { href: "/#contribution-portal", label: "Contribute to the Archive" },
  { href: "/#gatherings-events", label: "Annual Gathering" },
];

const FooterItem = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      href={href}
      className="group flex items-center gap-3 py-1.5 text-[#ab9f94] hover:text-white transition-colors"
    >
      <span aria-hidden className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
        <span className="absolute h-2 w-2 rotate-45 border border-[#d07f05]/60 transition-all duration-500 group-hover:h-3 group-hover:w-3 group-hover:rotate-[135deg] group-hover:border-[#d07f05]" />
        <span className="h-1 w-1 rotate-45 bg-[#d07f05]/40 transition-colors duration-300 group-hover:bg-[#d07f05]" />
      </span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        {label}
      </span>
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative mt-16 md:mt-24 overflow-hidden border-t border-[#d07f05]/20 bg-gradient-to-b from-[#080605] to-[#020101] font-serif text-gray-400">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[34rem] h-48 bg-[#d07f05]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Giant outlined watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[28%] text-center font-bold leading-none whitespace-nowrap text-[19vw] md:text-[13rem] text-transparent"
        style={{ WebkitTextStroke: "1px rgba(208,127,5,0.16)" }}
      >
        WERJIH&apos;S
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020101] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-6 space-y-4">
            <span className="inline-flex items-center text-[9px] font-mono tracking-[0.3em] uppercase text-[#d07f05] bg-[#d07f05]/10 px-3.5 py-1 rounded-full border border-[#d07f05]/25">
              ✦ Sanctuary &amp; Legacy ✦
            </span>
            <div className="text-2xl md:text-3xl font-normal text-white tracking-wide leading-tight">
              THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b47525] via-[#d9822b] to-[#915412] font-semibold italic">
                TIGRI WERJIH&apos;S
              </span>
            </div>
            <p className="text-xs font-sans font-light text-[#ab9f94] leading-relaxed max-w-sm">
              Preserving our history, honoring our ancestral trade routes, and uniting our
              global community across generations with enduring pride.
            </p>
          </div>

          {/* Lists */}
          <nav aria-label="Footer" className="md:col-span-6 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05] mb-3">
                Explore
              </h4>
              <ul className="font-sans text-sm">
                {footerExplore.map((item) => (
                  <FooterItem key={item.href} {...item} />
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#d07f05] mb-3">
                Take Part
              </h4>
              <ul className="font-sans text-sm">
                {footerTakePart.map((item) => (
                  <FooterItem key={item.href} {...item} />
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-[#221c17] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-sans text-[#8c7e72]">
          <p>&copy; {new Date().getFullYear()} The Werjih Society. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#d07f05]/80">
            Built with pride, heritage, and lineage.
          </p>
        </div>
      </div>
    </footer>
  );
}