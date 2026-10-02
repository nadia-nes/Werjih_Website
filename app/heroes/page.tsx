import HeroesContent from "@/components/HeroesContent";

export default function HeroesPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0e] text-white selection:bg-[#d07f05] selection:text-black py-16 px-6 md:px-12">
      <HeroesContent />
    </main>
  );
}