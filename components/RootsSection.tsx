"use client";

import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type * as ReactLeaflet from "react-leaflet";
import type L from "leaflet";

const eventRoots = [
  { id: "1", name: "Addis Ababa", region: "Central Hub", coords: [9.03, 38.74] as [number, number] },
  { id: "2", name: "Daleti", region: "Surrounding Area", coords: [8.89, 38.64] as [number, number] },
  { id: "3", name: "Rogge", region: "Historical Area", coords: [8.86, 38.95] as [number, number] },
  { id: "4", name: "Chacha", region: "Northern Route", coords: [9.53, 39.45] as [number, number] },
  { id: "5", name: "Sendafa", region: "Eastern Outskirt", coords: [9.15, 39.02] as [number, number] },
];

export default function RootsSection() {
  const [activeRoot, setActiveRoot] = useState(eventRoots[0]);
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof ReactLeaflet.MapContainer;
    TileLayer: typeof ReactLeaflet.TileLayer;
    Marker: typeof ReactLeaflet.Marker;
    Popup: typeof ReactLeaflet.Popup;
  } | null>(null);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    Promise.all([
      import("react-leaflet"),
      import("leaflet")
    ]).then(([RL, L]) => {
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      setCustomIcon(icon);
      setMapComponents({
        MapContainer: RL.MapContainer,
        TileLayer: RL.TileLayer,
        Marker: RL.Marker,
        Popup: RL.Popup,
      });
    });
  }, []);

  return (
    <section className="relative py-20 px-6 bg-[#0c0907] border-t border-[#d07f05]/20">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#d07f05] px-3 py-1 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5">
          Ancestral Geography &amp; Legacy
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white mt-4 mb-3">
          Roots &amp; Homeland Map
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
          Tracing our dispersal and historical trade routes across Addis Ababa and its surroundings.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#141210] border border-[#d07f05]/30 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {eventRoots.map((item) => {
            const isSelected = activeRoot.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoot(item)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#d07f05] text-black border-[#d07f05] shadow-[0_0_15px_rgba(208,127,5,0.4)]"
                    : "bg-[#1c1815] text-gray-300 border-[#d07f05]/20 hover:border-[#d07f05]/50"
                }`}
              >
                {item.name} <span className="opacity-75">({item.region})</span>
              </button>
            );
          })}
        </div>

        {/* CSS inverted filter transforms standard tiles into a clean dark mode theme */}
        <div className="w-full h-96 rounded-xl overflow-hidden border border-[#d07f05]/30 shadow-2xl relative z-10 filter invert hue-rotate-180 contrast-125">
          {MapComponents && customIcon ? (
            <MapComponents.MapContainer 
              key={`${activeRoot.coords[0]}-${activeRoot.coords[1]}`}
              center={activeRoot.coords} 
              zoom={10} 
              scrollWheelZoom={false} 
              style={{ width: "100%", height: "100%" }}
            >
              <MapComponents.TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapComponents.Marker position={activeRoot.coords} icon={customIcon}>
                <MapComponents.Popup>
                  <div className="text-black font-sans">
                    <strong className="block text-sm font-bold">{activeRoot.name}</strong>
                    <span className="text-xs text-gray-600">Classification: {activeRoot.region}</span>
                  </div>
                </MapComponents.Popup>
              </MapComponents.Marker>
            </MapComponents.MapContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#141210] text-gray-400 font-mono text-sm">
              Loading Map...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}