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

  useEffect(() => {
    async function fetchBookAdverts() {
      try {
        const { data, error } = await supabase
          .from("book-advert")
          .select("*")
          // 2. Change .order("id", ...) to .order("created_at", ...) here:
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
          <div className="relative rounded-lg overflow-hidden border border-[#d07f05]/30 bg-black shadow-inner">
            <video 
              controls 
              preload="metadata"
              className="w-full h-auto max-h-[400px] object-cover"
            >
              <source src={item.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ))}
    </section>
  );
}



