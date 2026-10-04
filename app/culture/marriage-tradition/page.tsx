'use client';

import Link from 'next/link';

export default function MarriageTraditionPage() {
  const steps = [
    {
      num: "01",
      title: "The Sending of Elders",
      amharic: "የሽማግሌዎች ምልልስ",
      content: `The groom's family carefully assesses the prospective bride's character and family background. Once certain, female elders are sent to propose. The bride's family traditionally delays the response through three polite visits to thoroughly verify the young man's background, conduct, and financial independence. Upon approval, male elders return. During these visits, the groom's elders traditionally consume nothing from the house until agreement is reached. On the final day, they kiss the bride's father's forehead in deep respect. Chechebsa bread and coffee are served, a prayer (Dua) is offered, and the date for the meeting of fathers is set.`,
      verse: null
    },
    {
      num: "02",
      title: "The Meeting of the Two Fathers",
      amharic: "የሁለት አባት መገናኛ",
      content: `The bride's family prepares an intimate feast, welcoming close relatives, uncles, and aunts. The groom's father or a designated paternal representative—arrives alongside key elders. They are received with deep hospitality, sharing traditional Anebabero bread with Deka sauce and coffee, formally cementing family ties before setting the engagement ring date.`,
      verse: null
    },
    {
      num: "03",
      title: "The Ring Ceremony",
      amharic: "ቀለበት",
      content: `A festive celebration hosted by the bride's family. The groom's family presents meaningful gifts: blankets, shawls, and caps for the father, alongside traditional attire and a money pouch (Mekremya) for the mother. The Nikah (marriage contract) or formal engagement is finalized, the ring and belt are presented to the bride, and future wedding milestones are charted. From this day forward, the groom continuously gifts full outfits to the bride every four months until the wedding.`,
      verse: null
    },
    {
      num: "04",
      title: "Malt Breaking Ritual",
      amharic: "ብቅል ሰበራ",
      content: `Held one week before the wedding, female relatives, neighbors, and friends gather to break the malt (prepared from barley or wheat for traditional beverages). Guests bring contributions, songs rise into the air, and a respected elder woman breaks the malt over the bride's shoulder or head amidst joyful ululations.`,
      verse: "«ብቅል ሰበራው ዛሬ ነው ዝምታው ምድነው»"
    },
    {
      num: "05",
      title: "Eve of the Wedding & Nail Cutting",
      amharic: "ዘመድ ማደሪያ / ቀሳ ሙራ",
      content: `On the Saturday before the wedding, close friends and relatives gather. The groom sends attire through his best men (Mize). During Qesa Mura, the bride sits at the center, shielded by a traditional Netela shawl held at its four corners by her Mize friends. Surrounded by family poetry, her fingernails are traditionally trimmed. Guests then present their wedding gifts, ranging from gold heirlooms to household goods.`,
      verse: "«እንሾሽላ ቅጠሌ ዛሬ ነው ዛሬ: የጓሮዬ ጤና አዳም አብቢ በጣም»"
    },
    {
      num: "06",
      title: "The Groom's House Preparation",
      amharic: "የሙሽራው ቤት ስነስርዓት",
      content: `At the groom's household, female relatives known as Kuli (sisters and aunts) prepare traditional dishes like Chuko and injera, arriving with joyous songs and ululations. The groom undergoes his own preparation and nail cutting ritual while surrounded by his groomsmen and family.`,
      verse: "«እልል በይ ወፌ እልል በይ አሞራ ከእከለሊት... ኦ ኡስኮባይ እከሊት ዘበናይ»"
    },
    {
      num: "07",
      title: "The Wedding Day",
      amharic: "የሰርጉ ዕለት",
      content: `The groom, adorned in traditional attire and a cape (Kaba) and blessed by elders with milk and honey, travels to the bride's home. The bride wears stunning traditional garments, jewelry, and a veil. She is handed over alongside a rich array of household gifts. As they depart, the community chants sacred nasheeds and blessing poetry, marching toward the groom's house for evening traditional dancing and the entering of the bridal chamber (Chagula).`,
      verse: `«ላኢላሀ ኢለላህ ላኢላሀ ኢለላህ ሙሀመደን ረሱሉላህ»\n«አላሁ አክበር አላሁ አክበር»\n\n«እንዳለሽ ፍርፋሪ, እንዳለሽ ፍራፋሪ, ደግመሽ ደጋግመሽ ዳሪ»`
    },
    {
      num: "08",
      title: "The Day After the Wedding",
      amharic: "የሰርጉ ማግስት",
      content: `Groomsmen visit the bride's family early in the morning to celebrate and collect tokens of gold and money to present to the bride. Roasted meats (Lada), butter, and traditional dishes prepared from the wedding cattle are distributed among family members, neighbors, and participating Kuli groups.`,
      verse: null
    },
    {
      num: "09",
      title: "Mels / Return Visit",
      amharic: "መልስ",
      content: `On Tuesday, the groom, accompanied by his groomsmen and elders, visits the bride's family bearing gifts of sheep, bread, and traditional dishes, paying respect to her parents. A playful tradition occurs where young girls hide the groomsmen's shoes and sing satirical teasing poetry. The groomsmen negotiate their release with sweets or gifts, followed by celebratory dancing.`,
      verse: `«ሚዜ አቦሬ ሚዜ አቦሬ, ጉድህ ፈላ ዛሬ\nሚዜ ተላላ ሚዜ ተላላ, ተጋተር አተላ\nከሌለ ብሩ, ከእኛ ተበደሩ\nጎትት ጎትት ድመቴ, እሬሳ ወድቋል ከቤቴ»`
    },
    {
      num: "10",
      title: "Bareta",
      amharic: "ባሬታ",
      content: `During the wedding week, young girls and peers visit the newlywed bride, bringing tokens of affection like sweets, biscuits, and fruits to keep her company and celebrate her transition into community life.`,
      verse: null
    },
    {
      num: "11",
      title: "Walcha / Post-Wedding Visit",
      amharic: "ዋልቻ",
      content: `Within a month after the wedding, the bride's friends and Mize visit her new home bearing traditional dishes like Doro Wat, Chuko, and fresh fruits. The groom's family hosts them warmly, further cementing generational bonds between both extended families.`,
      verse: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-[#c5c5c5] selection:bg-[#D66D13] selection:text-black font-sans">
      
      {/* ATMOSPHERIC BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D66D13]/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">
        
        {/* EDITORIAL HEADER */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121212] border border-[#D66D13]/20 text-[#D66D13] text-[11px] font-mono tracking-[0.2em] uppercase mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D66D13] animate-pulse" />
             • Ancestral Customs & Ceremonies
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-white tracking-tight leading-[1.15] mb-8">
            The Traditional Marriage Ceremony <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#e68a33] via-[#D66D13] to-[#a34b07]">
              of the Werjih People
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto border-t border-b border-[#222] py-6 my-6">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              An immersive chronicle through sacred ancestral milestones—from the initial steps of sending elders and the meeting of fathers, to sacred rituals, community celebrations, and post-wedding unions (<span className="text-[#D66D13] italic">Walcha</span>).
            </p>
          </div>
        </header>

        {/* TIMELESS CHRONICLE TIMELINE */}
        <div className="relative border-l border-[#222] ml-4 md:ml-8 pl-6 md:pl-10 space-y-20">
          
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              
              {/* TIMELINE NODE MARKER */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#070707] border-2 border-[#D66D13] group-hover:bg-[#D66D13] transition-all duration-300 shadow-[0_0_10px_rgba(214,109,19,0.3)]" />

              {/* STEP CARD CONTENT */}
              <div className="space-y-4">
                
                {/* META INFO */}
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-[#D66D13] font-mono text-xs tracking-widest">{step.num}</span>
                  <h2 className="text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
                    {step.title}
                  </h2>
                  <span className="text-xs text-gray-500 font-serif italic">({step.amharic})</span>
                </div>

                {/* NARRATIVE TEXT */}
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">
                  {step.content}
                </p>

                {/* TRADITIONAL VERSE / CHANT BLOCK (IF AVAILABLE) */}
                {step.verse && (
                  <div className="my-5 p-4 md:p-5 rounded-r-xl bg-[#111] border-l-2 border-[#D66D13] text-gray-200 font-serif text-sm italic leading-relaxed whitespace-pre-line shadow-inner">
                    {step.verse}
                  </div>
                )}

                {/* INTEGRATED MEDIA SLOT */}
                <div className="pt-2">
                  <div className="bg-[#101010] hover:bg-[#141414] transition-colors rounded-xl p-5 border border-[#222] hover:border-[#D66D13]/30 flex items-center justify-between group/slot cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-xl opacity-70 group-hover/slot:opacity-100 transition-opacity">🎬</span>
                      <span className="text-xs font-mono text-gray-400">Visual & Audio Archive — Step {step.num}</span>
                    </div>
                    <span className="text-xs font-mono text-[#D66D13] opacity-0 group-hover/slot:opacity-100 transition-opacity">
                      Load Media +
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* FOOTER NAVIGATION */}
        <footer className="mt-28 text-center pt-10 border-t border-[#222]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-gray-300 text-xs font-mono tracking-widest uppercase border border-[#333] bg-[#111] hover:bg-[#D66D13] hover:text-black hover:border-[#D66D13] transition-all duration-300 cursor-pointer no-underline shadow-lg"
          >
            <span>←</span> Return to Home Chronicle
          </Link>
        </footer>

      </div>
    </div>
  );
}