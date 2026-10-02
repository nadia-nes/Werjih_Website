import Navbar from "@/components/Navbar";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0e] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-6">Generational History & Lineage</h1>
        <p className="text-gray-300">
          Trace the centuries of leadership, foundational clans, and historical epochs of the Werjih people.
        </p>
      </div>
    </main>
  );
}