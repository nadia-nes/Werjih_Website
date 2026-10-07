// components/WerjihGatheringsBoard.tsx
'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Ticket } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Must match your page background so the ticket notches look cut out.
const PAGE_BG = '#0c0a09';

// Days until the next July 22 (0 = today)
function daysUntilNextJuly22() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(now.getFullYear(), 6, 22);
  if (target < startOfToday) target = new Date(now.getFullYear() + 1, 6, 22);
  return Math.round((target.getTime() - startOfToday.getTime()) / 86400000);
}

// Nothing to subscribe to, the date is read once on the client.
const subscribe = () => () => {};

export default function WerjihGatheringsBoard() {
  const [open, setOpen] = useState(false);

  // null on the server, real number on the client (no setState in an effect)
  const daysLeft = useSyncExternalStore<number | null>(
    subscribe,
    daysUntilNextJuly22,
    () => null
  );

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape + lock page scroll while the popup is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ full_name: fullName, phone_number: phone }]);

      if (error) throw error;
      setIsRegistered(true);
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage(
        (err as Error).message || 'Failed to submit registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsRegistered(false);
    setFullName('');
    setPhone('');
    setErrorMessage('');
  };

  return (
    <section
      id="gatherings-events"
      className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14 relative"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#d07f05]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* COMPACT TICKET */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex rounded-2xl border border-[#d07f05]/40 bg-gradient-to-br from-[#171310] via-[#110f0c] to-[#0a0807] shadow-[0_15px_45px_rgba(0,0,0,0.7)]"
      >
        {/* Stub (date + countdown) */}
        <div className="relative shrink-0 w-24 sm:w-36 flex flex-col items-center justify-center text-center py-4 px-2 border-r border-dashed border-[#d07f05]/40">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
            Jul
          </span>
          <span className="text-4xl sm:text-6xl font-serif leading-none text-[#d07f05]">22</span>
          <span className="mt-2 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-400 min-h-[14px]">
            {daysLeft === null ? '' : daysLeft === 0 ? 'Today' : `${daysLeft} days to go`}
          </span>

          {/* Ticket notches */}
          <span
            aria-hidden
            className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full border border-[#d07f05]/40"
            style={{ background: PAGE_BG }}
          />
          <span
            aria-hidden
            className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full border border-[#d07f05]/40"
            style={{ background: PAGE_BG }}
          />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.25em] text-[#d07f05]">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[#d07f05] animate-ping opacity-70" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[#d07f05]" />
              </span>
              Annual Gathering
            </span>
            <h2 className="text-lg sm:text-2xl font-serif text-white leading-tight mt-1">
              Werjih <span className="text-[#d07f05]">Heritage Day</span>
            </h2>
            <p className="mt-1 text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
              Uniting our community across generations and celebrating our shared legacy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 inline-flex items-center justify-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#d07f05] text-black text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#e8921a] transition-colors cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5" />
            Reserve
          </button>
        </div>
      </motion.div>

      {/* POPUP: story + registration */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Werjih Heritage Day registration"
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#d07f05]/40 bg-gradient-to-br from-[#171310] via-[#110f0c] to-[#0a0807] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d07f05]/50 to-transparent" />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-[#d07f05]/30 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#d07f05]">
                Featured Annual Gathering
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1 pr-8">
                July 22, Werjih Day
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#d07f05]" />
                Global Community Assembly &amp; Cultural Celebration
              </p>

              {/* Story */}
              <div className="mt-5 space-y-3 text-gray-300 text-sm font-light leading-relaxed">
                <p>
                  July 22 is more than just a date on the calendar, it is the heartbeat of the
                  Werjih society. It is the sacred day we honor the resilience of our ancestors,
                  pass down our distinct oral histories to the younger generation, and stand united
                  under our shared identity.
                </p>
                <p className="text-xs text-gray-400 italic border-l-2 border-[#d07f05] pl-4 py-1">
                  &ldquo;Gathering together on July 22 ensures that the fires of our unique
                  culture, heritage, and kinship continue to burn bright for generations to
                  come.&rdquo;
                </p>
              </div>

              {/* Registration */}
              <div className="mt-6 pt-6 border-t border-[#d07f05]/20">
                {isRegistered ? (
                  <div className="p-6 bg-[#0f0b08] border border-[#d07f05]/40 rounded-2xl text-center space-y-3">
                    <span className="text-3xl">🌿</span>
                    <h4 className="text-xl font-serif text-white">Place Reserved Successfully!</h4>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto">
                      Thank you, <span className="text-[#d07f05] font-bold">{fullName}</span>. Your
                      reservation for the July 22 Werjih Gathering has been saved. We will reach out
                      to <span className="text-white font-bold">{phone}</span> with final event
                      details.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-2 px-5 py-2.5 bg-transparent border border-[#d07f05]/40 text-[#d07f05] hover:bg-[#14100c] hover:text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Register Another Guest
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#d07f05]">
                      Reserve Your Place for July 22
                    </h4>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#0f0b08] border border-[#d07f05]/30 rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0f0b08] border border-[#d07f05]/30 rounded-xl px-4 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05]"
                    />
                    {errorMessage && (
                      <p className="text-red-400 text-xs font-mono">{errorMessage}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#d07f05] text-black hover:bg-[#e8921a] disabled:opacity-60 font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Saving to Archive...</span>
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4" />
                          <span>Reserve My Place</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}