"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface JourneyCardProps {
  id: string;
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

function JourneyCard({ title, description, isOpen, setIsOpen, children }: JourneyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track when the card leaves the visible viewport to auto-collapse
  const isInView = useInView(ref, { margin: "-80px 0px -80px 0px" });

  useEffect(() => {
    if (!isInView && isOpen) {
      setIsOpen(false);
    }
  }, [isInView, isOpen, setIsOpen]);

  return (
    <div 
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className="bg-[#121110] border border-[#3a332d] rounded-xl p-8 shadow-xl cursor-pointer hover:border-[#d07f05]/60 transition-all font-sans"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-normal text-[#f4efe6]">{title}</h3>
        <span className={`text-[#d07f05] transform transition-transform duration-300 text-xs font-mono ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      
      <p className="text-[#a3978c] text-sm leading-relaxed mb-4 font-light">
        {description}
      </p>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-[#3a332d] text-[#c5bbb2] text-sm leading-relaxed space-y-4 font-light"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default function BeginJourneySection() {
  const [openCard1, setOpenCard1] = useState(true);
  const [openCard2, setOpenCard2] = useState(false);

  return (
    <section id="notice" className="max-w-5xl mx-auto px-6 sm:px-12 py-20 font-serif">
      <div className="space-y-3 mb-12 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05]">
          • The Heritage Archive • Prologue
        </div>
        <h2 className="text-3xl sm:text-4xl font-normal text-[#f4efe6] tracking-tight">
          Begin The Journey
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Card 1 */}
        <JourneyCard 
          id="card1"
          title="🌍 Before We Become a Memory"
          description="Click to read about the ancestral roots, ancient trade routes, and geographical dispersion of the Werji people."
          isOpen={openCard1}
          setIsOpen={setOpenCard1}
        >
          <p><strong className="text-[#d07f05] font-normal">Heads Up:</strong> A Call to the Werjih. For the youth, for the elders, for what remains.</p>
          <p>There was a time when the name Werji did not need explaining. It meant a family whose word was worth more than gold, merchants who carried honesty as far as they carried goods, a people who built their own future out of trade, faith, and family.</p>
          <p>And then it was taken. In the Derg years, generations of wealth were confiscated almost overnight, and families were forced to start again from zero.</p>
          <p>But that is not the only reason we are diminishing today. Pride has kept us apart, small disagreements hardening into permanent distance, while our numbers shrink and our children grow up as strangers to each other. A king could take our land; only we can give away our unity.</p>
          <p>Meanwhile, &quot;Daleti&quot; the home that has carried the Werjih name longer than almost anywhere else is not guaranteed to stay ours. And our history, if we don&apos;t write it ourselves, will be told by others, and pieces of it will quietly stop being ours at all.</p>
          <p>This is not a call to blame. It&apos;s a call to wake up. Learn our history before it&apos;s lost. Ask your elders while they&apos;re still here. Let go of old grievances. We survived exile, assassination, confiscation we will not survive our own ego, unless we choose, together, to drop it.</p>
        </JourneyCard>

        {/* Card 2 */}
        <JourneyCard 
          id="card2"
          title="📜 Legacy Worth Preserving"
          description="Click to read about the linguistic heritage, customary laws, and communal daily practices."
          isOpen={openCard2}
          setIsOpen={setOpenCard2}
        >
          <p><strong className="text-[#d07f05] font-normal">From Our Roots to Our Future:</strong> On what we&apos;ve already lost, and the gathering that could stop us losing the rest.</p>
          <p>There was a time when a Werji household was rich in more than trade, rich in the proverbs a mother spoke before bed, in a rhythm of marriage, prayer, mourning, and celebration no one had to explain because we lived inside it. That was never written in a ledger, but it was wealth all the same.</p>
          <p>And piece by piece, we let it go. We already lost our language, not overnight, but slowly, generation by generation, until the languages we borrowed to trade with the world became the only ones our children would speak. We told ourselves it didn&apos;t matter, because we still had our name, our stories, each other.</p>
          <p>But now even that isn&apos;t certain. Our identity as a people is thinning with every year that passes—our young growing up further from Daleti, from the names Turio Wario and Sheikh Muhammed Danu, scattered across cities and continents, many never having met each other. How do you stay one people when you&apos;ve never stood in the same room?</p>
          <p>We already lost the language. We are not going to lose the rest.</p>
          <p><strong className="text-[#d07f05] font-normal">A Gathering, Every June:</strong> So here is what we&apos;re proposing: once a year, every June, no matter where we&apos;ve scattered Addis Ababa, Daleti, the diaspora—we come back together. Not out of obligation, but out of the stubborn refusal to let distance finish what history started.</p>
          <p>Let it  become the season the Werji renew themselves, together one gathering, one people, every year, until it becomes something we simply do, the way our ancestors simply traded, simply prayed, simply endured.</p>
          <p>Bring your children. Bring your grandparents. Bring the language you remember and the one you never learned. Bring your pride and leave your ego at the door.</p>
          <p>We were gold once. Let this be the year we remind ourselves what gold looks like when it chooses, on its own, to come back together.</p>
        </JourneyCard>

      </div>
    </section>
  );
}