'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function WerjihGatheringsBoard() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ full_name: fullName, phone_number: phone }]);

      if (error) {
        throw error;
      }

      setIsRegistered(true);
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage((err as Error).message || 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="gatherings-events" className="max-w-7xl mx-auto px-6 py-28 border-t border-[#d07f05]/20 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d07f05]/5 rounded-full blur-[180px] pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#14100c] border border-[#d07f05]/30 text-[#d07f05] text-[10px] font-mono tracking-[0.2em] uppercase backdrop-blur-xl shadow-2xl mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d07f05]"></span>
          <span>Gatherings & Events Board</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight mb-6">
          The Annual <span className="text-[#d07f05]">Werjih Heritage Day</span>
        </h2>
        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
          Uniting our community across generations, preserving our independent heritage, and celebrating our shared legacy.
        </p>
      </div>

      {/* FEATURED EVENT CARD */}
      <div className="max-w-4xl mx-auto relative z-10 mb-16">
        <div className="bg-[#14100c] border border-[#d07f05]/30 rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          {/* Top Subtle Border Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d07f05]/40 to-transparent" />

          {/* Top Date Badge Ribbon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#d07f05]/20">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d07f05] bg-[#0f0b08] px-3 py-1 rounded-full border border-[#d07f05]/30">
                Featured Annual Gathering
              </span>
              <h3 className="text-3xl font-serif text-white mt-3">July 22, Werjih Day</h3>
              <p className="text-xs text-gray-400 mt-1">📍 Global Community Assembly & Cultural Celebration</p>
            </div>
            <div className="bg-[#0f0b08] border border-[#d07f05]/30 px-6 py-4 rounded-xl text-center shadow-inner">
              <span className="block text-2xl font-serif text-[#d07f05]">JUL 22</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Mark Your Calendar</span>
            </div>
          </div>

          {/* Emotional Narrative Description */}
          <div className="py-8 space-y-4 text-gray-300 text-sm md:text-base font-light leading-relaxed">
            <p>
              July 22 is more than just a date on the calendar it is the heartbeat of the Werjih society. It is the sacred day we honor the resilience of our ancestors, pass down our distinct oral histories to the younger generation, and stand united under our shared identity.
            </p>
            <p className="text-xs text-gray-400 italic border-l-2 border-[#d07f05] pl-4 py-1">
              &ldquo;Gathering together on July 22 ensures that the fires of our unique culture, heritage, and kinship continue to burn bright for generations to come.&rdquo;
            </p>
          </div>

          {/* Registration Form / Place Reservation */}
          <div className="pt-6 border-t border-[#d07f05]/20">
            {isRegistered ? (
              <div className="p-8 bg-[#0f0b08] border border-[#d07f05]/40 rounded-xl text-center space-y-3 shadow-xl">
                <span className="text-3xl">🌿</span>
                <h4 className="text-xl font-serif text-white">Place Reserved Successfully!</h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <span className="text-[#d07f05] font-bold">{fullName}</span>. Your reservation for the July 22 Werjih Gathering has been successfully saved to the archive database. We will reach out to <span className="text-white font-bold">{phone}</span> with final event details.
                </p>
                <button
                  onClick={() => {
                    setIsRegistered(false);
                    setFullName('');
                    setPhone('');
                  }}
                  className="mt-4 px-5 py-2.5 bg-transparent border border-[#d07f05]/40 text-[#d07f05] hover:bg-[#14100c] hover:text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Register Another Guest
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#d07f05] mb-2">
                  Reserve Your Place for July 22
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#0f0b08] border border-[#d07f05]/30 rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-[#0f0b08] border border-[#d07f05]/30 rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05]"
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-400 text-xs font-mono">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-4 bg-[#0f0b08] border border-[#d07f05]/40 text-[#d07f05] hover:bg-[#14100c] hover:text-white font-serif font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#d07f05] border-t-transparent rounded-full animate-spin"></span>
                      <span>Saving to Archive...</span>
                    </>
                  ) : (
                    <>
                      <span>🎟️</span>
                      <span>Reserve My Place for July 22</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </section>
  );
}