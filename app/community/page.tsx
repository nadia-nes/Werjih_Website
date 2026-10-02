import Navbar from "@/components/Navbar";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0e] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-amber-500 mb-6">Community & Gatherings</h1>
        <p className="text-gray-300">
          Connect with fellow members, register for global gatherings, and join the movement.
        </p>
      </div>
    </main>
  );
}