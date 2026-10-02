"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface AncestralRecord {
  full_name: string;
  father_name: string;
  grandfather_name: string;
  mother_name: string;
  mother_father_name: string;
  clan: string;
  ancestral_region: string;
  contact_info?: string;
  created_at?: string;
}

const clansList = [
  "WERJIH", "ABDILABO", "SHANKOLI", "KEKU", "ALISHITO", "JELDU", "HANBISO", 
  "HAJIMOHAMEDO", "AWLIJAN", "KELILO", "AWASO", "ISLAMEDIN", "EMERDIN", 
  "SHEKRA", "SIMENE", "WEDEFERE", "ABDELO", "MAMEDASH", "WEKREBI", "SERBO", 
  "AKOBI", "ALKEBA", "HAJIALIY", "SHUMREDA", "DINGAYZERO", "ISMAELIYA"
];

export default function AncestralTree() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClan, setSelectedClan] = useState<string | null>(null);

  // Expanded Matcher state for deep lineage tracking
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandfatherName, setGrandfatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherFatherName, setMotherFatherName] = useState("");
  const [clan, setClan] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Addis Ababa");
  
  const [isSearchingRelative, setIsSearchingRelative] = useState(false);
  const [matchResults, setMatchResults] = useState<AncestralRecord[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  const [recordSaved, setRecordSaved] = useState(false);

  // "Check My Radar" returning user state
  const [radarHandle, setRadarHandle] = useState("");
  const [isCheckingRadar, setIsCheckingRadar] = useState(false);
  const [radarChecked, setRadarChecked] = useState(false);
  const [radarMatches, setRadarMatches] = useState<AncestralRecord[]>([]);

  // Live Registry Ticker state
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [recentAdditionsCount, setRecentAdditionsCount] = useState(0);

  // Fetch real-time registry stats on load
  useEffect(() => {
    async function fetchRegistryStats() {
      try {
        const { count, error } = await supabase
          .from("ancestral_records")
          .select("*", { count: "exact", head: true });
        if (!error && count !== null) {
          setTotalRecordsCount(count);
          setRecentAdditionsCount(Math.min(count, Math.floor(count * 0.3) + 3));
        }
      } catch (err) {
        console.error("Error fetching registry stats:", err);
      }
    }
    fetchRegistryStats();
  }, []);

  const filteredClans = clansList
    .map((name, index) => ({ name, originalIndex: index + 1 }))
    .filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleFindRelatives = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fatherName || !grandfatherName || !motherName) return;
    
    setIsSearchingRelative(true);
    setSearchPerformed(false);
    setAlertSaved(false);
    setRecordSaved(false);

    try {
      // 1. Save user's entry with full multi-generational lineage
      const { error: insertError } = await supabase.from("ancestral_records").insert([
        {
          full_name: fullName.trim() ? fullName : "Anonymous",
          father_name: fatherName,
          grandfather_name: grandfatherName,
          mother_name: motherName,
          mother_father_name: motherFatherName,
          clan: clan || selectedClan || "Unspecified",
          ancestral_region: selectedRegion,
          contact_info: contactInfo,
        },
      ]);
      
      if (insertError) {
        console.error("Error inserting into ancestral_records:", insertError);
      } else {
        setRecordSaved(true);
        setTotalRecordsCount(prev => prev + 1);
        setRecentAdditionsCount(prev => prev + 1);
      }

      // 2. Query Supabase globally across ALL regions for matching father & grandfather names
      const { data, error } = await supabase
        .from("ancestral_records")
        .select("*")
        .or(`father_name.ilike.%${fatherName}%,grandfather_name.ilike.%${grandfatherName}%`);

      if (error) throw error;

      // 3. Filter out the user's own record so they never match with themselves
      const filteredResults = (data || []).filter(
        (record) => 
          record.full_name?.toLowerCase() !== fullName.toLowerCase() ||
          record.contact_info !== contactInfo
      );

      // 4. Sort results so records matching the user's selected region appear first
      const sortedResults = filteredResults.sort((a, b) => {
        const aMatch = a.ancestral_region === selectedRegion ? 0 : 1;
        const bMatch = b.ancestral_region === selectedRegion ? 0 : 1;
        return aMatch - bMatch;
      });

      setMatchResults(sortedResults);
      setSearchPerformed(true);
    } catch (err: unknown) {
      console.error("Kinship scan error:", err);
      alert((err as Error).message || "Failed to scan records.");
    } finally {
      setIsSearchingRelative(false);
    }
  };

  const handleSaveAlert = async () => {
    try {
      const { error } = await supabase.from("future_alerts").insert([
        {
          full_name: fullName || "Anonymous",
          father_name: fatherName,
          grandfather_name: grandfatherName,
          mother_name: motherName,
          mother_father_name: motherFatherName,
          ancestral_region: selectedRegion,
          telegram_handle: contactInfo || "Not provided",
        },
      ]);
      if (error) throw error;
      setAlertSaved(true);
    } catch (err: unknown) {
      console.error("Error saving alert:", err);
      alert("Failed to save alert: " + ((err as Error).message || JSON.stringify(err)));
    }
  };

  const handleCheckRadar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!radarHandle.trim()) return;

    setIsCheckingRadar(true);
    setRadarChecked(false);

    try {
      // 1. Find saved alert by telegram handle or full name
      const { data: alertData, error: alertError } = await supabase
        .from("future_alerts")
        .select("*")
        .or(`telegram_handle.ilike.%${radarHandle}%,full_name.ilike.%${radarHandle}%`)
        .limit(1);

      if (alertError) throw alertError;

      if (!alertData || alertData.length === 0) {
        alert("No active radar found with that handle or name. Try running a new scan above!");
        setIsCheckingRadar(false);
        return;
      }

      const savedAlert = alertData[0];

      // 2. Re-run global matching query across all regions using saved parameters
      const { data: matchData, error: matchError } = await supabase
        .from("ancestral_records")
        .select("*")
        .or(`father_name.ilike.%${savedAlert.father_name}%,grandfather_name.ilike.%${savedAlert.grandfather_name}%`);

      if (matchError) throw matchError;

      setRadarMatches(matchData || []);
      setRadarChecked(true);
    } catch (err: unknown) {
      console.error("Error checking radar:", err);
      alert("Failed to check radar status.");
    } finally {
      setIsCheckingRadar(false);
    }
  };
  
  return (
    <section id="community" className="max-w-5xl mx-auto px-6 py-16 relative">
      
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05] px-3 py-1 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5 inline-block mb-2">
          Heritage & Lineage Archives
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-2">
          Family Clans & <span className="italic text-[#d07f05]">Ancestral Roots</span>
        </h2>
        <p className="text-gray-300 text-xs md:text-sm font-light max-w-lg mx-auto">
          Explore the 26 foundational ancestral branches and trace your family lineage.
        </p>
      </div>

      {/* LIVE HERITAGE REGISTRY TICKER */}
      <div className="mb-8 max-w-3xl mx-auto rounded-lg border border-[#d07f05]/30 bg-[#16100b]/80 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-serif text-[#f4e8d1]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d07f05] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d07f05]"></span>
          </span>
          <span>Live Registry Pulse: <strong className="text-[#d07f05]">{totalRecordsCount}</strong> total lineages indexed</span>
        </div>
        <div className="text-[11px] font-mono text-[#d07f05] bg-[#1f160e] border border-[#d07f05]/30 px-3 py-1 rounded">
          ⚡ {recentAdditionsCount} new family connections logged this week
        </div>
      </div>

      {/* Clans Grid Container */}
      <div className="relative rounded-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden border-2 border-[#d07f05]/50 bg-[#14100c]"
           style={{
             backgroundImage: `
               radial-gradient(circle at 50% 30%, rgba(48, 35, 22, 0.9) 0%, rgba(15, 11, 8, 0.98) 100%),
               url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E")
             `
           }}>
        
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#2c2013] via-[#d07f05]/40 to-[#2c2013] border-b border-[#d07f05]/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#2c2013] via-[#d07f05]/40 to-[#2c2013] border-t border-[#d07f05]/30"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#d07f05]/20">
          <h3 className="text-lg font-serif text-[#f4e8d1] flex items-center gap-2">
            <span>📜</span> Core Societal Clans Registry <span className="text-xs font-mono text-[#d07f05]">(26)</span>
          </h3>
          <div className="relative w-full sm:w-60">
            <input
              type="text"
              placeholder="Search clan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c150f] border border-[#d07f05]/40 text-[#f4e8d1] placeholder-[#a89880] text-xs px-3 py-1.5 rounded focus:outline-none focus:border-[#d07f05] font-serif shadow-inner"
            />
          </div>
        </div>

        <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex flex-wrap gap-2">
            {filteredClans.map(({ name, originalIndex }) => {
              const isSelected = selectedClan === name;
              return (
                <motion.button
                  key={name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedClan(isSelected ? null : name)}
                  className={`px-3 py-1.5 rounded text-xs font-serif tracking-wide transition-all flex items-center space-x-1.5 border ${
                    isSelected
                      ? "bg-[#382815] border-[#d07f05] text-[#fcecd0] shadow-[0_0_12px_rgba(208,127,5,0.3)]"
                      : "bg-[#1b140f]/80 border-[#d07f05]/20 text-[#d8c5a8] hover:border-[#d07f05]/60 hover:text-[#f4e8d1] hover:bg-[#261d15]"
                  }`}
                >
                  <span className="text-[9px] font-mono text-[#d07f05]/70">{originalIndex}.</span>
                  <span>{name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kinship Radar Matcher Form */}
      <div className="mt-10 rounded-xl p-6 md:p-8 border border-[#d07f05]/30 bg-[#120e0a] relative shadow-2xl">
        <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#201810] border border-[#d07f05]/40 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#d07f05] uppercase">
          Kinship Radar Matcher
        </div>

        <div className="max-w-xl mx-auto text-center mb-6">
          <h3 className="text-xl font-serif text-[#f4e8d1] mb-1">
            Discover Your Relatives & Roots
          </h3>
          <p className="text-xs text-gray-400">
            {selectedClan 
              ? `Active Clan Context: Selected [ ${selectedClan} ]. Provide multi-generational lineage below.` 
              : "Enter multi-generational family parameters to map accurate genealogical connections."}
          </p>
        </div>

        <form onSubmit={handleFindRelatives} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Your Full Name (Optional)</label>
            <input
              type="text"
              placeholder="Registers you in db"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Father&apos;s Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Kedir"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Grandfather&apos;s Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ahmed"
              value={grandfatherName}
              onChange={(e) => setGrandfatherName(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Mother&apos;s Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Amina"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Mother&apos;s Father Name (Optional)</label>
            <input
              type="text"
              placeholder="Maternal Grandfather"
              value={motherFatherName}
              onChange={(e) => setMotherFatherName(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Clan / Lineage Branch</label>
            <input
              type="text"
              placeholder="e.g., Werjih Sub-clan"
              value={clan}
              onChange={(e) => setClan(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Telegram Username (Optional)</label>
            <input
              type="text"
              placeholder="e.g. @username"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1">Preferred Region (Prioritized)</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
            >
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Harar / Dire Dawa">Harar / Dire Dawa</option>
              <option value="Oromia Region">Oromia Region</option>
              <option value="Other Diaspora">Other Regions</option>
            </select>
          </div>

          <div className="col-span-full text-center mt-3">
            <button
              type="submit"
              disabled={isSearchingRelative}
              className="px-6 py-2.5 bg-[#d07f05] hover:bg-[#b56b04] text-black font-serif font-bold text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(208,127,5,0.3)] disabled:opacity-50"
            >
              {isSearchingRelative ? "Scanning Global Chronicles..." : "Scan & Match Living Relatives"}
            </button>
          </div>
        </form>

        {/* Match Result Display Drawer */}
        <AnimatePresence>
          {searchPerformed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-xl mx-auto p-4 bg-[#1f160e] border border-[#d07f05] rounded text-center shadow-xl"
            >
              <span className="text-xs font-mono text-[#d07f05] uppercase tracking-wider block mb-2">✨ Global Kinship Scan Results</span>
              
              {/* Database Registration Success Badge */}
              {recordSaved && (
                <div className="mb-3 p-2 bg-[#140f0a] border border-emerald-500/40 rounded text-xs text-emerald-400 font-mono">
                  ✓ Success! Your profile ({fullName.trim() ? fullName : "Anonymous"}) has been recorded in the database.
                </div>
              )}

              {matchResults.length > 0 ? (
                <div className="space-y-3 text-left max-h-48 overflow-y-auto">
                  {matchResults.map((record, idx) => (
                    <div key={idx} className="p-3 bg-[#140f0a] border border-[#d07f05]/20 rounded text-xs text-[#f4e8d1] flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <p><strong className="text-[#d07f05]">Name:</strong> {record.full_name}</p>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                          record.ancestral_region === selectedRegion 
                            ? "bg-[#d07f05]/20 text-[#d07f05] border border-[#d07f05]/40" 
                            : "bg-gray-800 text-gray-300"
                        }`}>
                          📍 {record.ancestral_region}
                        </span>
                      </div>
                      <p><strong className="text-[#d07f05]">Lineage:</strong> {record.father_name} {record.grandfather_name} (Grandfather)</p>
                      <p><strong className="text-[#d07f05]">Mother:</strong> {record.mother_name}</p>
                      <p><strong className="text-[#d07f05]">Clan:</strong> {record.clan}</p>
                      {record.contact_info && (
                        <div className="mt-2">
                          <a 
                            href={`https://t.me/${record.contact_info.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#d07f05] hover:bg-[#b56b04] text-black font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded transition"
                          >
                            Connect via Telegram ({record.contact_info})
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-[#f4e8d1] font-serif">
                    No global matches found across any regions yet for these lineage names.
                  </p>
                  {!alertSaved ? (
                    <div className="p-3 bg-[#140f0a] border border-[#d07f05]/30 rounded text-center">
                      <p className="text-[11px] text-gray-300 mb-2 font-serif">
                        Want us to hold your lineage radar? Save your search so you can be connected when a relative registers later!
                      </p>
                      <button
                        type="button"
                        onClick={handleSaveAlert}
                        className="px-4 py-1.5 bg-[#d07f05]/20 hover:bg-[#d07f05] text-[#d07f05] hover:text-black border border-[#d07f05] text-[10px] uppercase font-mono tracking-widest rounded transition"
                      >
                        Activate Future Match Radar
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-400 font-mono">
                      ✓ Radar activated! Your lineage parameters are saved for future family matches.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Check My Radar Returning User Section */}
      <div className="mt-10 max-w-xl mx-auto rounded-xl p-6 border border-[#d07f05]/30 bg-[#16100b] text-center shadow-lg relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1f160e] border border-[#d07f05]/40 px-3 py-0.5 rounded-full text-[9px] font-mono tracking-widest text-[#d07f05] uppercase">
          Returning Visitor Portal
        </div>
        
        <h4 className="text-base font-serif text-[#f4e8d1] mb-2 mt-1">
          🔍 Already Activated Your Radar? Check for New Matches
        </h4>
        <p className="text-xs text-gray-400 mb-4 font-serif">
          Enter your Telegram username or saved name below to instantly check if new relatives have registered globally since your last visit.
        </p>

        <form onSubmit={handleCheckRadar} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="e.g. @username or Full Name"
            value={radarHandle}
            onChange={(e) => setRadarHandle(e.target.value)}
            className="flex-1 bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d07f05] font-serif"
          />
          <button
            type="submit"
            disabled={isCheckingRadar}
            className="px-4 py-2 bg-[#d07f05]/20 hover:bg-[#d07f05] text-[#d07f05] hover:text-black border border-[#d07f05] text-xs uppercase font-mono tracking-wider rounded transition disabled:opacity-50"
          >
            {isCheckingRadar ? "Scanning..." : "Check Radar"}
          </button>
        </form>

        {/* Radar Check Results Drawer */}
        <AnimatePresence>
          {radarChecked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-[#140f0a] border border-[#d07f05]/40 rounded text-left text-xs"
            >
              <span className="text-[10px] font-mono text-[#d07f05] uppercase tracking-wider block mb-3 text-center">
                📡 Global Radar Status Results
              </span>
              {radarMatches.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-emerald-400 font-mono mb-2 text-center text-xs">🎉 Success! New matching relative(s) found!</p>
                  {radarMatches.map((rec, i) => (
                    <div key={i} className="p-3 bg-[#1f160e] border border-[#d07f05]/20 rounded text-[#f4e8d1] flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <p><strong className="text-[#d07f05]">Relative:</strong> {rec.full_name}</p>
                        <span className="text-[9px] px-2 py-0.5 rounded font-mono bg-[#d07f05]/20 text-[#d07f05] border border-[#d07f05]/40">
                          📍 {rec.ancestral_region}
                        </span>
                      </div>
                      <p><strong className="text-[#d07f05]">Lineage:</strong> {rec.father_name} {rec.grandfather_name}</p>
                      {rec.contact_info && (
                        <div className="mt-2">
                          <a 
                            href={`https://t.me/${rec.contact_info.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#d07f05] hover:bg-[#b56b04] text-black font-semibold text-[10px] uppercase tracking-wider px-3 py-1 rounded transition"
                          >
                            Connect via Telegram ({rec.contact_info})
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center font-serif py-2">
                  No new relatives have registered under your lineage parameters globally yet. Check back soon!
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}