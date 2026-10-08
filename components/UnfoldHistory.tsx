"use client";

import { motion } from "framer-motion";

type Chapter = {
  era: string;
  title: string;
  text: string;
};

const chapters: Chapter[] = [
  {
    era: "1128",
    title: "A name in the record",
    text:
      "Our story begins with a single line in an old Arabic chronicle. In the year 1128, the Wärğiḥ are named as a people who stood on their own land and held it, turning back armies that pushed south from the north. Before there were cities, before there were kings in Shewa, we were already remembered by name.",
  },
  {
    era: "1332",
    title: "Keepers of camels, defenders of home",
    text:
      "Two centuries later, the chronicles of King Amdä Ṣəyon describe us as herdsmen, keepers of camels, and strong in battle. We were a people of the open lowlands, guarding our herds and our freedom, and our neighbours knew us as fighters who did not give up their ground easily.",
  },
  {
    era: "The 16th century",
    title: "When the roads called us",
    text:
      "Then came an age of upheaval. Kingdoms fell, peoples moved across the highlands, and old ways of life could no longer hold. Our elders remember that it was in this season that we left our herds behind and took to the caravan roads, carrying salt, cloth and coffee, and settling beside the markets. They remember the first village, Abdällo, near Šäno, where the story of the highland Werji begins.",
  },
  {
    era: "1813 – 1840",
    title: "A refuge and a gift of land",
    text:
      "In the days of King Śahlä Śəlase of Shewa, our traders became trusted friends of the court. Oral tradition tells of Abdure-Lottu, who found refuge with the king and received a wide land at Ṭoṭose. There he founded a village that became a home for generations. Our merchants carried goods, and they also carried news of the lands beyond the king's reach.",
  },
  {
    era: "1865 – 1889",
    title: "\u201CDo not touch their lands\u201D",
    text:
      "When a governor tried to move the people of Tigri Teracha from their homes, the elders walked to the court of King Menilek and made their appeal. The king answered that the Wärğəḥ paid a yearly tax of one thaler for every mule, and he ordered the governor to leave their land alone. Because of those words, the village still stands today.",
  },
  {
    era: "1879 E.C.",
    title: "A new capital, a new home",
    text:
      "When Addis Ababa rose as the new capital, the great market of Rogge, where our traders had gathered, fell silent as the road moved away. Our chief, Ture-Waryo, went to Menilek and asked for new land, and the king settled our people at Daleti, which is today a major part of Sebeta. In 1881 Empress Taytu invited us to Enṭoṭṭo to help trade grow there.",
  },
  {
    era: "1896",
    title: "Adwa: a gift remembered",
    text:
      "When the nation rose to defend itself against Italy, the people of Daleti remember that a wealthy Werji man lent twelve thousand thalers to Emperor Menilek II. It was one gift among many, and it tells how fully our community saw its own fate bound to Ethiopia's freedom.",
  },
];

export default function UnfoldHistory() {
  return (
    <section
      id="unfold-history"
      className="scroll-mt-20 bg-[#0b0a09] px-5 py-16 text-[#f1e9d8] sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#d07f05] sm:text-xs">
            The Werji Story
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl">
            Unfold History
          </h2>
          <p className="mt-5 font-[family-name:var(--font-cormorant)] text-base italic leading-relaxed text-[#cfc6b3] sm:text-xl">
            Gather close, and let the elders&rsquo; memory and the old chronicles
            tell it to you.
          </p>
        </motion.div>

        <div className="relative mt-12 space-y-12 border-l border-[#d07f05]/40 pl-6 sm:mt-16 sm:space-y-16 sm:pl-10">
          {chapters.map((c) => (
            <motion.article
              key={c.era}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-[#d07f05] sm:-left-[47px]" />
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#d07f05] sm:text-sm">
                {c.era}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl leading-tight sm:text-4xl">
                {c.title}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-cormorant)] text-[15px] leading-[1.75] text-[#e4dac4] sm:text-xl sm:leading-[1.8]">
                {c.text}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-14 border-t border-[#d07f05]/20 pt-6 font-sans text-[11px] leading-relaxed text-[#f1e9d8]/50 sm:text-xs">
          This telling draws on Deresse Ayenachew&rsquo;s study,{" "}
          <em>
            &ldquo;A historical overview of the W&auml;r&#287;&#601;&#7717; Muslim
            community in the Christian highland of &Scaron;&auml;wa&rdquo;
          </em>{" "}
          (Afriques, 2016, doi:10.4000/afriques.1944), together with the oral
          traditions of our villages.
        </p>
      </div>
    </section>
  );
}