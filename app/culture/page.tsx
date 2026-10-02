import Navbar from "@/components/Navbar";

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-[#0f0e0e] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-6">Culture & Heritage</h1>
        <p className="text-gray-300">
          Explore our traditions, historical slideshows, and the visual heritage of our community.
        </p>
      </div>
    </main>
  );
}