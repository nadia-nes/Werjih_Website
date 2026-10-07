// components/RootsSection.tsx
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";

type LeafletLib = typeof import("leaflet");
type ReactLeafletLib = typeof import("react-leaflet");

type Coords = [number, number];

const eventRoots: { id: string; name: string; region: string; coords: Coords }[] = [
  { id: "1", name: "Addis Ababa", region: "Central Hub", coords: [9.03, 38.74] },
  { id: "2", name: "Daleti", region: "Surrounding Area", coords: [8.89, 38.64] },
  { id: "3", name: "Rogge", region: "Historical Area", coords: [8.86, 38.95] },
  { id: "4", name: "Chacha", region: "Northern Route", coords: [9.53, 39.45] },
  { id: "5", name: "Sendafa", region: "Eastern Outskirt", coords: [9.15, 39.02] },
];

const HUB = eventRoots[0];

// Straight-line distance in km between two [lat, lng] points
function distanceKm(a: Coords, b: Coords) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

const pad = (n: number) => String(n).padStart(2, "0");

const MAP_CSS = `
  /* Dark theme applied to the map tiles only (pins and lines stay untouched) */
  .dark-tiles{filter:invert(1) hue-rotate(180deg) brightness(.8) contrast(.9) saturate(.45)}

  .root-pin{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center}
  .root-pin .dot{width:12px;height:12px;border-radius:50%;background:#d07f05;border:2px solid #0c0907;box-shadow:0 0 12px #d07f05;transition:all .3s}
  .root-pin .ring{position:absolute;inset:6px;border-radius:50%;border:1.5px solid #d07f05;opacity:0}
  .root-pin.active .dot{width:18px;height:18px;background:#fff3dc;box-shadow:0 0 20px #d07f05}
  .root-pin.active .ring{animation:rootPulse 2s infinite ease-out}
  @keyframes rootPulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.4);opacity:0}}
  .root-line{stroke-dasharray:6 8;animation:rootDash 1.6s linear infinite}
  @keyframes rootDash{to{stroke-dashoffset:-28}}
  .leaflet-tooltip.root-tip{background:rgba(12,9,7,.85);border:1px solid rgba(208,127,5,.4);color:#f5e6c8;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;box-shadow:none;padding:2px 8px;border-radius:999px}
  .leaflet-tooltip-top.root-tip:before{border-top-color:rgba(208,127,5,.4)}
  .leaflet-container{background:#0c0907;font-family:inherit}
  .leaflet-control-attribution{background:rgba(12,9,7,.7)!important;color:#8a7f72!important;font-size:9px!important}
  .leaflet-control-attribution a{color:#b9863a!important}
  .leaflet-bar a{background:#14100c!important;color:#d07f05!important;border-color:rgba(208,127,5,.3)!important}
  @media (prefers-reduced-motion:reduce){.root-pin .ring,.root-line{animation:none!important}}
`;

export default function RootsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [Lf, setLf] = useState<LeafletLib | null>(null);
  const [RL, setRL] = useState<ReactLeafletLib | null>(null);

  const mapRef = useRef<import("leaflet").Map | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, l]) => {
      setRL(rl);
      setLf(l);
    });
  }, []);

  // Fly the camera to the selected place (skip the very first render)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const root = eventRoots[activeIndex];
    mapRef.current?.flyTo(root.coords, 11, { duration: 1.6 });
  }, [activeIndex]);

  // Custom glowing pins; the active one pulses
  const icons = useMemo(() => {
    if (!Lf) return null;
    return eventRoots.map((_, i) =>
      Lf.divIcon({
        className: "",
        html: `<div class="root-pin ${
          i === activeIndex ? "active" : ""
        }"><span class="ring"></span><span class="dot"></span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })
    );
  }, [Lf, activeIndex]);

  const active = eventRoots[activeIndex];
  const total = eventRoots.length;
  const km = distanceKm(HUB.coords, active.coords);

  const step = (dir: number) => setActiveIndex((i) => (i + dir + total) % total);
  const showAll = () => {
    if (!Lf || !mapRef.current) return;
    mapRef.current.flyToBounds(Lf.latLngBounds(eventRoots.map((r) => r.coords)), {
      padding: [40, 40],
      duration: 1.4,
    });
  };

  return (
    <section className="relative py-14 md:py-20 px-4 md:px-6 bg-[#0c0907] border-t border-[#d07f05]/20 overflow-hidden">
      <style>{MAP_CSS}</style>

      <div className="max-w-5xl mx-auto text-center mb-8 md:mb-10">
        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#d07f05] px-3 py-1 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5">
          Ancestral Geography &amp; Legacy
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white mt-4 mb-3">
          Roots &amp; <span className="italic text-[#d07f05]">Homeland</span> Map
        </h2>
        <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
          Follow the threads from Addis Ababa out to the places that shaped us. Pick a root to fly
          there.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* MAP (isolate keeps Leaflet's high z-index layers from covering your header/popups) */}
        <div className="relative isolate h-[420px] md:h-[540px] rounded-3xl overflow-hidden border border-[#d07f05]/40 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
          {RL && Lf && icons ? (
            <RL.MapContainer
              ref={mapRef}
              bounds={Lf.latLngBounds(eventRoots.map((r) => r.coords))}
              boundsOptions={{ padding: [50, 50] }}
              scrollWheelZoom={false}
              dragging={!Lf.Browser.mobile}
              style={{ width: "100%", height: "100%" }}
            >
              <RL.TileLayer
                className="dark-tiles"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Root lines from the hub */}
              {eventRoots.slice(1).map((root, i) => {
                const isActive = activeIndex === i + 1;
                return (
                  <RL.Polyline
                    key={root.id}
                    positions={[HUB.coords, root.coords]}
                    pathOptions={{
                      color: "#d07f05",
                      weight: isActive ? 3 : 1.5,
                      opacity: isActive ? 0.95 : 0.35,
                      className: "root-line",
                    }}
                  />
                );
              })}

              {/* Pins */}
              {eventRoots.map((root, i) => (
                <RL.Marker
                  key={root.id}
                  position={root.coords}
                  icon={icons[i]}
                  zIndexOffset={i === activeIndex ? 1000 : 0}
                  eventHandlers={{ click: () => setActiveIndex(i) }}
                >
                  <RL.Tooltip permanent direction="top" offset={[0, -16]} className="root-tip">
                    {root.name}
                  </RL.Tooltip>
                </RL.Marker>
              ))}
            </RL.MapContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0c0907] text-gray-500 font-mono text-xs tracking-widest uppercase">
              Charting the roots...
            </div>
          )}

          {/* Floating info card */}
          <div className="absolute left-3 bottom-8 z-[1000] w-[220px] sm:w-[280px] rounded-2xl border border-[#d07f05]/40 bg-[#0c0907]/85 backdrop-blur-md p-3.5 sm:p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#d07f05]">
                Root {pad(activeIndex + 1)} / {pad(total)}
              </span>
              <button
                type="button"
                onClick={showAll}
                aria-label="Show all roots"
                title="Show all"
                className="w-6 h-6 rounded-full border border-[#d07f05]/30 text-[#d07f05] flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-serif text-white mt-1 leading-tight">
              {active.name}
            </h3>
            <p className="text-[11px] text-gray-400 font-light">{active.region}</p>
            <p className="mt-2 text-[10px] font-mono tracking-wider text-[#d07f05]/90">
              {km === 0 ? "The center of it all" : `≈ ${km} km from ${HUB.name}`}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous place"
                className="w-8 h-8 rounded-full border border-[#d07f05]/40 text-[#d07f05] flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next place"
                className="w-8 h-8 rounded-full border border-[#d07f05]/40 text-[#d07f05] flex items-center justify-center hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PLACE CHIPS (scrolls sideways on small screens) */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {eventRoots.map((item, i) => {
            const isSelected = activeIndex === i;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-mono transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? "bg-[#d07f05] text-black border-[#d07f05] shadow-[0_0_15px_rgba(208,127,5,0.4)]"
                    : "bg-[#14100c] text-gray-300 border-[#d07f05]/20 hover:border-[#d07f05]/50"
                }`}
              >
                <span className={isSelected ? "opacity-70" : "text-[#d07f05]"}>{pad(i + 1)}</span>
                {item.name}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-center text-[10px] font-mono tracking-widest uppercase text-gray-600">
          Lines show straight-line distance from the hub, not roads
        </p>
      </div>
    </section>
  );
}