"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface BookAdvertItem {
  id: string;
  title: string;
  description: string;
  video_url: string;
}

export default function BookAdvertSection() {
  const [adverts, setAdverts] = useState<BookAdvertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSellers, setShowSellers] = useState(false);

  useEffect(() => {
    async function fetchBookAdverts() {
      try {
        const { data, error } = await supabase
          .from("book-advert")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setAdverts(data);
      } catch (err) {
        console.error("Error fetching book adverts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookAdverts();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-xs font-mono text-[#d07f05]">Loading book movement archives...</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      {adverts.map((item) => (
        <div key={item.id} className="rounded-xl p-6 md:p-8 border border-[#d07f05]/30 bg-[#120e0a] relative shadow-2xl mb-8">
          <h3 className="text-xl font-serif text-[#f4e8d1] mb-2">
            {item.title}
          </h3>
          <p className="text-xs text-gray-300 mb-6 font-light leading-relaxed">
            {item.description}
          </p>

          {/* Dynamic Video Player fed directly from the 'book-advert' table */}
          <div className="relative rounded-lg overflow-hidden border border-[#d07f05]/30 bg-black shadow-inner mb-6">
            <video 
              controls 
              preload="metadata"
              className="w-full h-auto max-h-[400px] object-cover"
            >
              <source src={item.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* 3D Flipping Authorized Sellers Section */}
          <div 
            className="pt-5 border-t border-[#d07f05]/20 perspective-1000 group cursor-pointer"
            onMouseEnter={() => setShowSellers(true)}
            onMouseLeave={() => setShowSellers(false)}
          >
            <div 
              className={`relative w-full transition-transform duration-700 transform-style-3d ${
                showSellers ? "rotate-y-180" : ""
              }`}
            >
              
              {/* FRONT FACE: Call to Action */}
              <div className="w-full bg-[#121110] border border-[#d07f05]/30 rounded-lg p-4 text-center backface-hidden shadow-lg">
                <span className="px-2.5 py-0.5 mb-1.5 text-[9px] font-bold text-black bg-[#d07f05] rounded-full uppercase tracking-wider inline-block">
                  Get Your Copy
                </span>
                <h3 className="text-sm font-bold text-white mb-0.5">Authorized Book Sellers</h3>
                <p className="text-gray-400 text-[11px] mb-3">Distributors across Addis Ababa & surroundings.</p>
                
                <div className="inline-flex items-center space-x-1.5 text-[11px] font-semibold text-[#d07f05] bg-[#d07f05]/10 px-3 py-1.5 rounded-md border border-[#d07f05]/30 animate-pulse">
                  <span>Hover to View 5 Distributor Contacts</span>
                  <span>🔄</span>
                </div>
              </div>

              {/* BACK FACE: Contact List */}
              <div className="absolute inset-0 w-full h-full bg-[#121110] border border-[#d07f05]/40 rounded-lg p-4 backface-hidden rotate-y-180 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#d07f05]/20">
                    <h3 className="text-[11px] font-bold text-[#d07f05] uppercase tracking-wider">Authorized Distributors</h3>
                    <span className="text-[9px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">Scroll to view all</span>
                  </div>

                  <div className="space-y-1.5 text-[11px] max-h-[95px] overflow-y-auto pr-1.5 custom-scrollbar">
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">1. Roza Siraj <span className="text-[#d07f05] text-[9px]">[Bethel]</span></span>
                      <a href="tel:0988022885" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0988022885</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">2. Hamid Hamza <span className="text-[#d07f05] text-[9px]">[Autobis Tera]</span></span>
                      <a href="tel:0911646448" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0911646448</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">3. Ali Usman <span className="text-[#d07f05] text-[9px]">[Jemo Mall]</span></span>
                      <a href="tel:0912008319" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0912008319</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">4. Hussein Ali <span className="text-[#d07f05] text-[9px]">[Daleti]</span></span>
                      <a href="tel:0922158994" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0922158994</a>
                    </div>
                    <div className="flex justify-between items-center bg-[#181615] p-2 rounded border border-white/5">
                      <span className="text-gray-200 font-medium">5. Adam Mohammed <span className="text-[#d07f05] text-[9px]">[Sebeta]</span></span>
                      <a href="tel:0923433183" className="text-[#d07f05] hover:underline font-mono bg-[#d07f05]/10 px-1.5 py-0.5 rounded">0923433183</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      ))}
    </section>
  );
}