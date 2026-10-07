// components/AncestralTree.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ArrowLeft, ArrowRight, Check, Users } from "lucide-react";
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

type ScoredRecord = AncestralRecord & { score: number };

const clansList = [
  "WERJIH", "ABDILABO", "SHANKOLI", "KEKU", "ALISHITO", "JELDU", "HANBISO",
  "HAJIMOHAMEDO", "AWLIJAN", "KELILO", "AWASO", "ISLAMEDIN", "EMERDIN",
  "SHEKRA", "SIMENE", "WEDEFERE", "ABDELO", "MAMEDASH", "WEKREBI", "SERBO",
  "AKOBI", "ALKEBA", "HAJIALIY", "SHUMREDA", "DINGAYZERO", "ISMAELIYA",
];

const STEPS = ["You", "Father's line", "Mother's line", "Connect"];
const COLLAPSED_CLANS = 10;

const inputCls =
  "w-full bg-[#1b140f] border border-[#d07f05]/30 text-[#f4e8d1] placeholder-[#8a7960] text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#d07f05] font-serif";
const labelCls =
  "block text-[10px] font-mono uppercase tracking-wider text-[#d07f05] mb-1.5";

// Strip characters that would break the database filter text
const clean = (s: string) => s.replace(/[,()%*\\]/g, " ").trim();
const norm = (s?: string) => (s || "").trim().toLowerCase();

function scoreRecord(rec: AncestralRecord, father: string, grandfather: string) {
  let score = 0;
  const f = norm(father);
  const g = norm(grandfather);
  if (f && norm(rec.father_name).includes(f)) score += 1;
  if (g && norm(rec.grandfather_name).includes(g)) score += 1;
  return score;
}

function MatchCard({
  record,
  score,
  highlightRegion,
}: {
  record: AncestralRecord;
  score: number;
  highlightRegion?: string;
}) {
  const strong = score >= 2;
  return (
    <div className="p-3.5 bg-[#140f0a] border border-[#d07f05]/20 rounded-xl text-xs text-[#f4e8d1] flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-serif text-sm text-white">{record.full_name}</p>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider border ${
              strong
                ? "bg-[#d07f05] text-black border-[#d07f05] font-bold"
                : "bg-transparent text-[#d07f05] border-[#d07f05]/40"
            }`}
          >
            {strong ? "Strong match" : "Possible match"}
          </span>
          <span
            className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
              highlightRegion && record.ancestral_region === highlightRegion
                ? "bg-[#d07f05]/20 text-[#d07f05] border border-[#d07f05]/40"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            📍 {record.ancestral_region}
          </span>
        </div>
      </div>
      <p className="text-gray-300">
        <span className="text-[#d07f05]">Lineage:</span> {record.father_name} →{" "}
        {record.grandfather_name} (grandfather)
      </p>
      {record.mother_name && (
        <p className="text-gray-300">
          <span className="text-[#d07f05]">Mother:</span> {record.mother_name}
        </p>
      )}
      {record.clan && (
        <p className="text-gray-300">
          <span className="text-[#d07f05]">Clan:</span> {record.clan}
        </p>
      )}
      {record.contact_info && (
        <a
          href={`https://t.me/${record.contact_info.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 self-start bg-[#d07f05] hover:bg-[#b56b04] text-black font-semibold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition"
        >
          Connect via Telegram ({record.contact_info})
        </a>
      )}
    </div>
  );
}

export default function AncestralTree() {
  // Clans
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClan, setSelectedClan] = useState<string | null>(null);
  const [showAllClans, setShowAllClans] = useState(false);

  // Tabs + wizard
  const [tab, setTab] = useState<"scan" | "radar">("scan");
  const [step, setStep] = useState(0);
  const [formError, setFormError] = useState("");

  // Lineage fields
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandfatherName, setGrandfatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherFatherName, setMotherFatherName] = useState("");
  const [clan, setClan] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Addis Ababa");

  // Scan state
  const [isSearchingRelative, setIsSearchingRelative] = useState(false);
  const [matchResults, setMatchResults] = useState<ScoredRecord[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  const [recordSaved, setRecordSaved] = useState(false);

  // Radar state
  const [radarHandle, setRadarHandle] = useState("");
  const [isCheckingRadar, setIsCheckingRadar] = useState(false);
  const [radarChecked, setRadarChecked] = useState(false);
  const [radarMatches, setRadarMatches] = useState<ScoredRecord[]>([]);
  const [radarMessage, setRadarMessage] = useState("");

  // Registry count
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);

  useEffect(() => {
    async function fetchRegistryStats() {
      try {
        const { count, error } = await supabase
          .from("ancestral_records")
          .select("*", { count: "exact", head: true });
        if (!error && count !== null) setTotalRecordsCount(count);
      } catch (err) {
        console.error("Error fetching registry stats:", err);
      }
    }
    fetchRegistryStats();
  }, []);

  const filteredClans = clansList
    .map((name, index) => ({ name, originalIndex: index + 1 }))
    .filter(({ name }) => name.toLowerCase().includes(searchQuery.toLowerCase()));

  const expanded = showAllClans || searchQuery.trim() !== "";
  const visibleClans = expanded ? filteredClans : filteredClans.slice(0, COLLAPSED_CLANS);

  // ---------- Wizard navigation ----------
  const goNext = () => {
    if (step === 1 && (!fatherName.trim() || !grandfatherName.trim())) {
      setFormError("Please enter your father's and grandfather's names.");
      return;
    }
    if (step === 2 && !motherName.trim()) {
      setFormError("Please enter your mother's name.");
      return;
    }
    setFormError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setFormError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleFindRelatives = async (e: React.FormEvent) => {
    e.preventDefault();

    // Enter key on an earlier step just moves forward
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }

    if (!fatherName.trim() || !grandfatherName.trim() || !motherName.trim()) {
      setFormError("Father, grandfather and mother names are required.");
      return;
    }

    setIsSearchingRelative(true);
    setSearchPerformed(false);
    setAlertSaved(false);
    setRecordSaved(false);
    setFormError("");

    try {
      // 1. Save the user's own entry
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
        setTotalRecordsCount((prev) => prev + 1);
      }

      // 2. Look for matching father or grandfather names across all regions
      const f = clean(fatherName);
      const g = clean(grandfatherName);
      const { data, error } = await supabase
        .from("ancestral_records")
        .select("*")
        .or(`father_name.ilike.%${f}%,grandfather_name.ilike.%${g}%`);

      if (error) throw error;

      // 3. Remove the user's own record
      const others = (data || []).filter(
        (record: AncestralRecord) =>
          record.full_name?.toLowerCase() !== fullName.toLowerCase() ||
          record.contact_info !== contactInfo
      );

      // 4. Score, then sort: strongest first, then preferred region
      const scored: ScoredRecord[] = others
        .map((record: AncestralRecord) => ({
          ...record,
          score: scoreRecord(record, fatherName, grandfatherName),
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          const aR = a.ancestral_region === selectedRegion ? 0 : 1;
          const bR = b.ancestral_region === selectedRegion ? 0 : 1;
          return aR - bR;
        });

      setMatchResults(scored);
      setSearchPerformed(true);
    } catch (err: unknown) {
      console.error("Kinship scan error:", err);
      setFormError((err as Error).message || "Failed to scan records. Please try again.");
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
      setFormError("Failed to save alert: " + ((err as Error).message || "Unknown error"));
    }
  };

  const handleCheckRadar = async (e: React.FormEvent) => {
    e.preventDefault();
    const handle = clean(radarHandle);
    if (!handle) return;

    setIsCheckingRadar(true);
    setRadarChecked(false);
    setRadarMessage("");

    try {
      const { data: alertData, error: alertError } = await supabase
        .from("future_alerts")
        .select("*")
        .or(`telegram_handle.ilike.%${handle}%,full_name.ilike.%${handle}%`)
        .limit(1);

      if (alertError) throw alertError;

      if (!alertData || alertData.length === 0) {
        setRadarMessage(
          "No active radar found with that handle or name. Try running a new scan first!"
        );
        return;
      }

      const saved = alertData[0];
      const f = clean(saved.father_name || "");
      const g = clean(saved.grandfather_name || "");

      const { data: matchData, error: matchError } = await supabase
        .from("ancestral_records")
        .select("*")
        .or(`father_name.ilike.%${f}%,grandfather_name.ilike.%${g}%`);

      if (matchError) throw matchError;

      const scored: ScoredRecord[] = (matchData || [])
        .map((record: AncestralRecord) => ({
          ...record,
          score: scoreRecord(record, saved.father_name, saved.grandfather_name),
        }))
        .sort((a: ScoredRecord, b: ScoredRecord) => b.score - a.score);

      setRadarMatches(scored);
      setRadarChecked(true);
    } catch (err: unknown) {
      console.error("Error checking radar:", err);
      setRadarMessage("Failed to check radar status. Please try again.");
    } finally {
      setIsCheckingRadar(false);
    }
  };

  const restartScan = () => {
    setSearchPerformed(false);
    setRecordSaved(false);
    setAlertSaved(false);
    setStep(0);
  };

  return (
    <section id="community" className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16 relative">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d07f05] px-3 py-1 rounded-full border border-[#d07f05]/30 bg-[#d07f05]/5 inline-block mb-3">
          Heritage &amp; Lineage Archives
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight mb-2">
          Family Clans &amp; <span className="italic text-[#d07f05]">Ancestral Roots</span>
        </h2>
        <p className="text-gray-300 text-xs md:text-sm font-light max-w-lg mx-auto">
          Explore the 26 foundational ancestral branches and trace your family lineage.
        </p>
      </div>

      {/* Slim live registry line */}
      <div className="mb-6 flex items-center justify-center gap-2 text-xs font-serif text-[#f4e8d1]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d07f05] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d07f05]"></span>
        </span>
        <span>
          <strong className="text-[#d07f05]">{totalRecordsCount}</strong> lineages indexed in the
          living registry
        </span>
      </div>

      {/* CLANS (compact) */}
      <div
        className="relative rounded-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden border border-[#d07f05]/50 bg-[#14100c]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(48, 35, 22, 0.9) 0%, rgba(15, 11, 8, 0.98) 100%)`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2c2013] via-[#d07f05]/50 to-[#2c2013]" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base md:text-lg font-serif text-[#f4e8d1] flex items-center gap-2">
            <span>📜</span> Core Societal Clans{" "}
            <span className="text-xs font-mono text-[#d07f05]">({clansList.length})</span>
          </h3>
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#d07f05]/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c150f] border border-[#d07f05]/40 text-[#f4e8d1] placeholder-[#a89880] text-xs pl-8 pr-3 py-2 rounded-full focus:outline-none focus:border-[#d07f05] font-serif"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleClans.map(({ name, originalIndex }) => {
            const isSelected = selectedClan === name;
            return (
              <motion.button
                key={name}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedClan(isSelected ? null : name)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-serif tracking-wide transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-[#382815] border-[#d07f05] text-[#fcecd0] shadow-[0_0_12px_rgba(208,127,5,0.3)]"
                    : "bg-[#1b140f]/80 border-[#d07f05]/20 text-[#d8c5a8] hover:border-[#d07f05]/60 hover:text-[#f4e8d1]"
                }`}
              >
                <span className="text-[9px] font-mono text-[#d07f05]/70">{originalIndex}</span>
                <span>{name}</span>
              </motion.button>
            );
          })}
          {filteredClans.length === 0 && (
            <p className="text-xs text-gray-400 font-serif">No clan matches that search.</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[11px] text-gray-400 font-serif min-h-[16px]">
            {selectedClan ? (
              <>
                Selected: <span className="text-[#d07f05]">{selectedClan}</span> (used in your scan
                below)
              </>
            ) : (
              "Tap a clan to use it in your scan."
            )}
          </p>
          {searchQuery.trim() === "" && filteredClans.length > COLLAPSED_CLANS && (
            <button
              type="button"
              onClick={() => setShowAllClans((v) => !v)}
              className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#d07f05] hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {showAllClans ? "Show less" : `Show all ${clansList.length}`}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showAllClans ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      {/* KINSHIP RADAR CARD (tabs) */}
      <div className="mt-8 rounded-2xl border border-[#d07f05]/30 bg-[#120e0a] shadow-2xl relative">
        {/* Tabs */}
        <div className="flex border-b border-[#d07f05]/20">
          {[
            { id: "scan" as const, label: "Find Relatives" },
            { id: "radar" as const, label: "Check My Radar" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3.5 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer ${
                tab === t.id
                  ? "text-[#d07f05] bg-[#1a130d] border-b-2 border-[#d07f05]"
                  : "text-gray-500 hover:text-gray-300 border-b-2 border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 md:p-8">
          {tab === "scan" ? (
            <>
              {/* Lineage trail */}
              <div className="relative max-w-md mx-auto mb-7">
                <div className="absolute top-3.5 left-[12.5%] right-[12.5%] h-px bg-[#d07f05]/20" />
                <motion.div
                  className="absolute top-3.5 left-[12.5%] h-px bg-[#d07f05] shadow-[0_0_8px_#d07f05]"
                  animate={{ width: `${(step / (STEPS.length - 1)) * 75}%` }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative grid grid-cols-4">
                  {STEPS.map((label, i) => {
                    const done = i < step;
                    const current = i === step;
                    return (
                      <button
                        key={label}
                        type="button"
                        disabled={i > step}
                        onClick={() => {
                          setFormError("");
                          setStep(i);
                        }}
                        className="flex flex-col items-center gap-1.5 disabled:cursor-default cursor-pointer"
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono border transition-all ${
                            current
                              ? "bg-[#d07f05] text-black border-[#d07f05] shadow-[0_0_14px_rgba(208,127,5,0.5)]"
                              : done
                              ? "bg-[#382815] text-[#d07f05] border-[#d07f05]"
                              : "bg-[#14100c] text-gray-500 border-[#d07f05]/20"
                          }`}
                        >
                          {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                        </span>
                        <span
                          className={`text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-center ${
                            current ? "text-[#d07f05]" : "text-gray-500"
                          }`}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleFindRelatives} className="max-w-md mx-auto">
                <div className="min-h-[150px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      {step === 0 && (
                        <>
                          <div>
                            <label className={labelCls}>Your Full Name (Optional)</label>
                            <input
                              type="text"
                              placeholder="Registers you in the archive"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Clan / Lineage Branch</label>
                            <input
                              type="text"
                              list="clan-options"
                              placeholder={selectedClan ? selectedClan : "e.g. Werjih Sub-clan"}
                              value={clan}
                              onChange={(e) => setClan(e.target.value)}
                              className={inputCls}
                            />
                            <datalist id="clan-options">
                              {clansList.map((c) => (
                                <option key={c} value={c} />
                              ))}
                            </datalist>
                          </div>
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <div>
                            <label className={labelCls}>Father&apos;s Name *</label>
                            <input
                              type="text"
                              placeholder="e.g. Kedir"
                              value={fatherName}
                              onChange={(e) => setFatherName(e.target.value)}
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Grandfather&apos;s Name *</label>
                            <input
                              type="text"
                              placeholder="e.g. Ahmed"
                              value={grandfatherName}
                              onChange={(e) => setGrandfatherName(e.target.value)}
                              className={inputCls}
                            />
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div>
                            <label className={labelCls}>Mother&apos;s Full Name *</label>
                            <input
                              type="text"
                              placeholder="e.g. Amina"
                              value={motherName}
                              onChange={(e) => setMotherName(e.target.value)}
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Mother&apos;s Father Name (Optional)</label>
                            <input
                              type="text"
                              placeholder="Maternal grandfather"
                              value={motherFatherName}
                              onChange={(e) => setMotherFatherName(e.target.value)}
                              className={inputCls}
                            />
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div>
                            <label className={labelCls}>Telegram Username (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. @username"
                              value={contactInfo}
                              onChange={(e) => setContactInfo(e.target.value)}
                              className={inputCls}
                            />
                            <p className="mt-1.5 text-[10px] text-gray-500 font-serif">
                              If you add this, matching relatives will see it and can message you.
                            </p>
                          </div>
                          <div>
                            <label className={labelCls}>Preferred Region (Prioritized)</label>
                            <select
                              value={selectedRegion}
                              onChange={(e) => setSelectedRegion(e.target.value)}
                              className={inputCls}
                            >
                              <option value="Addis Ababa">Addis Ababa</option>
                              <option value="Harar / Dire Dawa">Harar / Dire Dawa</option>
                              <option value="Oromia Region">Oromia Region</option>
                              <option value="Other Diaspora">Other Regions</option>
                            </select>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {formError && (
                  <p className="mt-3 text-red-400 text-xs font-mono text-center">{formError}</p>
                )}

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#d07f05]/30 text-[#d07f05] text-[11px] font-mono uppercase tracking-wider hover:bg-[#1f160e] transition disabled:opacity-30 disabled:cursor-default cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#d07f05] hover:bg-[#b56b04] text-black font-bold text-[11px] font-mono uppercase tracking-wider transition cursor-pointer"
                    >
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSearchingRelative}
                      className="px-5 py-2.5 rounded-full bg-[#d07f05] hover:bg-[#b56b04] text-black font-serif font-bold text-[11px] uppercase tracking-widest transition shadow-[0_0_15px_rgba(208,127,5,0.3)] disabled:opacity-50 cursor-pointer"
                    >
                      {isSearchingRelative ? "Scanning Chronicles..." : "Scan & Match Relatives"}
                    </button>
                  )}
                </div>
              </form>

              {/* Results */}
              <AnimatePresence>
                {searchPerformed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-8 pt-6 border-t border-[#d07f05]/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-[#d07f05] uppercase tracking-[0.2em]">
                        ✨ Kinship Scan Results
                      </span>
                      <button
                        type="button"
                        onClick={restartScan}
                        className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-white transition cursor-pointer"
                      >
                        New scan
                      </button>
                    </div>

                    {recordSaved && (
                      <div className="mb-3 p-2.5 bg-[#140f0a] border border-emerald-500/40 rounded-lg text-xs text-emerald-400 font-mono">
                        ✓ Your profile ({fullName.trim() ? fullName : "Anonymous"}) has been
                        recorded in the archive.
                      </div>
                    )}

                    {matchResults.length > 0 ? (
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        <p className="flex items-center gap-1.5 text-xs text-gray-300 font-serif">
                          <Users className="w-3.5 h-3.5 text-[#d07f05]" />
                          {matchResults.length} possible relative
                          {matchResults.length === 1 ? "" : "s"} found
                        </p>
                        {matchResults.map((record, idx) => (
                          <MatchCard
                            key={idx}
                            record={record}
                            score={record.score}
                            highlightRegion={selectedRegion}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 text-center">
                        <p className="text-xs text-[#f4e8d1] font-serif">
                          No matches found across any region yet for these lineage names.
                        </p>
                        {!alertSaved ? (
                          <div className="p-4 bg-[#140f0a] border border-[#d07f05]/30 rounded-xl">
                            <p className="text-[11px] text-gray-300 mb-3 font-serif">
                              Want us to hold your lineage radar? Save your search so you can be
                              connected when a relative registers later.
                            </p>
                            <button
                              type="button"
                              onClick={handleSaveAlert}
                              className="px-4 py-2 bg-[#d07f05]/20 hover:bg-[#d07f05] text-[#d07f05] hover:text-black border border-[#d07f05] text-[10px] uppercase font-mono tracking-widest rounded-full transition cursor-pointer"
                            >
                              Activate Future Match Radar
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-emerald-400 font-mono">
                            ✓ Radar activated! Your lineage is saved for future family matches.
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* ---------- RADAR TAB ---------- */
            <div className="max-w-md mx-auto text-center">
              <h4 className="text-base font-serif text-[#f4e8d1] mb-2">
                🔍 Already Activated Your Radar?
              </h4>
              <p className="text-xs text-gray-400 mb-5 font-serif">
                Enter your Telegram username or saved name to check if new relatives have
                registered since your last visit.
              </p>

              <form onSubmit={handleCheckRadar} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. @username or Full Name"
                  value={radarHandle}
                  onChange={(e) => setRadarHandle(e.target.value)}
                  className={`${inputCls} flex-1`}
                />
                <button
                  type="submit"
                  disabled={isCheckingRadar}
                  className="px-5 py-2.5 bg-[#d07f05] hover:bg-[#b56b04] text-black text-[11px] font-bold uppercase font-mono tracking-wider rounded-lg transition disabled:opacity-50 cursor-pointer"
                >
                  {isCheckingRadar ? "Scanning..." : "Check Radar"}
                </button>
              </form>

              {radarMessage && (
                <p className="mt-4 text-xs text-gray-300 font-serif">{radarMessage}</p>
              )}

              <AnimatePresence>
                {radarChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 text-left"
                  >
                    <span className="text-[10px] font-mono text-[#d07f05] uppercase tracking-[0.2em] block mb-3 text-center">
                      📡 Radar Status Results
                    </span>
                    {radarMatches.length > 0 ? (
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        <p className="text-emerald-400 font-mono text-center text-xs">
                          🎉 Matching relative(s) found!
                        </p>
                        {radarMatches.map((rec, i) => (
                          <MatchCard key={i} record={rec} score={rec.score} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-300 text-center font-serif text-xs py-2">
                        No new relatives have registered under your lineage yet. Check back soon!
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}