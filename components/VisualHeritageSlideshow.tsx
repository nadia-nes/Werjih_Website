'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SlideItem {
  id: number;
  image_url: string;
  title: string;
  description: string;
  created_at: string;
}

export default function VisualHeritageSlideshow() {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('heritage_slideshow')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase query error:', error);
          setFetchError(error.message || JSON.stringify(error));
        } else if (data) {
          console.log('Fetched slides successfully:', data);
          setSlides(data);
        }
      } catch (err: unknown) {
        console.error('Unexpected catch error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setFetchError(errorMessage);
      } finally {
        setLoading(false); // Ensures loading state turns off after fetch completes
      }
    }

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[450px] bg-[#121212] rounded-2xl border border-[rgba(214,109,19,0.35)] flex items-center justify-center text-gray-400 text-xs font-mono animate-pulse">
        Connecting to Supabase archive...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[450px] bg-[#121212] rounded-2xl border border-red-500/40 flex flex-col items-center justify-center text-red-400 text-xs font-mono p-6 text-center">
        <p className="font-bold mb-2">Database Connection Error:</p>
        <p>{fetchError}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[450px] bg-[#121212] rounded-2xl border border-[rgba(214,109,19,0.35)] flex items-center justify-center text-gray-400 text-xs font-mono">
        No records found in the heritage_slideshow table.
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full h-[450px] bg-[#121212] rounded-2xl border border-[rgba(214,109,19,0.35)] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center">
        
        {/* Blurred background backdrop to fill aspect ratio gaps seamlessly */}
        <img 
          src={slides[currentIndex].image_url} 
          alt="" 
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-40 scale-110" 
        />

        {/* Main uncropped image */}
        <img 
          src={slides[currentIndex].image_url} 
          alt={slides[currentIndex].title}
          className="relative z-10 max-h-full max-w-full object-contain shadow-lg" 
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none z-20">
          <span className="text-[10px] font-mono text-[#D66D13] tracking-widest uppercase mb-1">
            Visual Archive {currentIndex + 1} of {slides.length}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
            {currentSlide.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-300 font-light max-w-2xl">
            {currentSlide.description}
          </p>
        </div>
      </div>
    </div>
  );
}