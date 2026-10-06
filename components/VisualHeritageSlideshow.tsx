"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Slide {
  id: string;
  title: string;
  image_url: string;
  description?: string;
}

export default function VisualHeritageSlideshow() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase.from("heritage_slideshow").select("*");

        if (!error && data) {
          const formattedSlides = data.map((item) => {
            let imgPath = item.image_url;

            if (imgPath && !imgPath.startsWith("http")) {
              const { data: publicUrlData } = supabase.storage
                .from("heritage")
                .getPublicUrl(imgPath);
              
              imgPath = publicUrlData.publicUrl;
            }

            return {
              ...item,
              image_url: imgPath || "",
            };
          });
          setSlides(formattedSlides);
        } else if (error) {
          console.error("Supabase error:", error.message);
        }
      } catch (err) {
        console.error("Error loading heritage slides:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);

  // Auto-advance slides every 5 seconds if slides exist
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center bg-[#121212] rounded-2xl border border-[#d07f05]/20 text-xs font-mono text-gray-400">
        Loading Visual Archive...
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-[450px] flex items-center justify-center bg-[#121212] rounded-2xl border border-[#d07f05]/20 text-xs font-mono text-gray-400">
        No visual heritage slides found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full h-[450px] bg-[#121212] rounded-2xl border border-[rgba(214,189,19,0.35)] overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Blurred background atmospheric image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={slides[currentIndex].image_url} 
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-40 scale-110"
        />

        {/* Main uncropped image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={slides[currentIndex].image_url}
          alt={slides[currentIndex].title}
          className="relative z-10 max-h-full max-w-full object-contain shadow-lg"
        />

        {/* Slide Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 z-20 pointer-events-none">
          <span className="text-[10px] font-mono text-[#d07f05] tracking-widest uppercase mb-1">
            Visual Archive ({currentIndex + 1} of {slides.length})
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
            {slides[currentIndex].title}
          </h3>
          {slides[currentIndex].description && (
            <p className="text-gray-300 text-xs md:text-sm font-light line-clamp-2 max-w-2xl">
              {slides[currentIndex].description}
            </p>
          )}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 right-6 flex items-center space-x-1.5 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-6 bg-[#d07f05]" : "w-1.5 bg-white/40 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}