// components/ContributionPortal.tsx
'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Archive,
  Check,
  FileText,
  Mic,
  RotateCcw,
  Send,
  Square,
  Upload,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Tab = 'text' | 'voice' | 'media';

const MAX_MB = 25;
const MAX_REC_SECONDS = 300; // 5 minutes

const TABS: { id: Tab; icon: string; title: string; sub: string }[] = [
  { id: 'text', icon: '✍️', title: 'Written story', sub: 'Type a memory or record' },
  { id: 'voice', icon: '🎙️', title: 'Voice note', sub: 'Record or upload audio' },
  { id: 'media', icon: '🖼️', title: 'Photo / document', sub: 'Images or scanned PDFs' },
];

const PROMPTS = [
  'A story my grandparents told me:',
  'Where our family came from:',
  'A tradition I remember:',
  'A person our community should never forget:',
];

const inputCls =
  'w-full bg-black/50 border border-[#d07f05]/30 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05] transition-colors';
const labelCls = 'block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1.5';

const BAR_HEIGHTS = [40, 70, 50, 90, 60, 100, 45, 80, 55, 95, 65, 85, 50, 75, 40, 90, 60, 70, 45, 80];

const CSS = `
  @keyframes vaultSpin { to { transform: rotate(360deg) } }
  @keyframes vaultWave { 0%,100% { transform: scaleY(.25) } 50% { transform: scaleY(1) } }
  @keyframes vaultRing { 0% { transform: scale(1); opacity: .6 } 100% { transform: scale(1.9); opacity: 0 } }
  .vault-spin { animation: vaultSpin 28s linear infinite }
  .vault-bar { transform-origin: center; animation: vaultWave 1s ease-in-out infinite }
  .vault-ring { animation: vaultRing 1.6s ease-out infinite }
  @media (prefers-reduced-motion: reduce) {
    .vault-spin, .vault-bar, .vault-ring { animation: none }
  }
`;

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function isAllowed(tab: Tab, file: File) {
  if (tab === 'voice') return file.type.startsWith('audio/');
  if (tab === 'media') return file.type.startsWith('image/') || file.type === 'application/pdf';
  return true;
}

export default function ContributionPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('text');

  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [storyRecord, setStoryRecord] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preview link for the chosen file (audio player / image thumbnail)
  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile]
  );
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const stopRecording = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') rec.stop();
  }, []);

  // Recording timer + auto stop
  useEffect(() => {
    if (!isRecording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isRecording]);

  useEffect(() => {
    if (isRecording && seconds >= MAX_REC_SECONDS) stopRecording();
  }, [isRecording, seconds, stopRecording]);

  // Release the microphone if the component goes away
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startRecording = async () => {
    setErrorMsg('');

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setErrorMsg('Recording is not supported in this browser. Please upload an audio file instead.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find((m) =>
        MediaRecorder.isTypeSupported(m)
      );
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);

      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const type = rec.mimeType || mime || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        const ext = type.includes('mp4') ? 'm4a' : 'webm';
        setSelectedFile(new File([blob], `voice-note-${Date.now()}.${ext}`, { type }));
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setIsRecording(false);
      };

      recorderRef.current = rec;
      setSeconds(0);
      rec.start();
      setIsRecording(true);
    } catch {
      setErrorMsg('Microphone access was blocked. Allow it in your browser, or upload an audio file instead.');
    }
  };

  const switchTab = (tab: Tab) => {
    if (tab === activeTab || isRecording) return;
    setActiveTab(tab);
    setSelectedFile(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const acceptFile = (file: File | undefined | null) => {
    if (!file) return;
    if (!isAllowed(activeTab, file)) {
      setErrorMsg(
        activeTab === 'voice'
          ? 'Please choose an audio file (MP3, WAV or M4A).'
          : 'Please choose an image or a PDF.'
      );
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrorMsg(`That file is too large. The limit is ${MAX_MB} MB.`);
      return;
    }
    setErrorMsg('');
    setSelectedFile(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addPrompt = (prompt: string) => {
    setStoryRecord((prev) => (prev.trim() ? `${prev.trimEnd()}\n\n${prompt} ` : `${prompt} `));
  };

  const resetAll = () => {
    setSubmittedName(null);
    setFullName('');
    setRegion('');
    setStoryRecord('');
    setErrorMsg('');
    clearFile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (activeTab !== 'text' && !selectedFile) {
      setErrorMsg(
        activeTab === 'voice'
          ? 'Please record or attach your voice note first.'
          : 'Please attach a photo or document first.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl: string | null = null;

      // 1. Upload the file (if any)
      if (selectedFile) {
        const ext = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('archive_files') // This bucket must exist and be public
          .upload(fileName, selectedFile, {
            contentType: selectedFile.type.split(';')[0] || undefined,
          });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from('archive_files').getPublicUrl(fileName);
        fileUrl = urlData.publicUrl;
      }

      // 2. Save the submission
      const { error: insertError } = await supabase.from('archive_contributions').insert([
        {
          contribution_type: activeTab.toUpperCase(),
          full_name: fullName,
          region: region,
          story_record:
            activeTab === 'text'
              ? storyRecord
              : `[Attached File/Media: ${selectedFile?.name || 'Voice Note'}]`,
          file_url: fileUrl,
        },
      ]);

      if (insertError) throw new Error(`Database save failed: ${insertError.message}`);

      setSubmittedName(fullName);
    } catch (err) {
      console.error(err);
      setErrorMsg((err as Error).message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAudio = !!selectedFile?.type.startsWith('audio/');
  const isImage = !!selectedFile?.type.startsWith('image/');

  return (
    <section
      id="contribution-portal"
      className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14 relative"
    >
      <style>{CSS}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-72 bg-[#d07f05]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 overflow-hidden rounded-3xl border border-[#d07f05]/40 bg-[#141414]/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* ---------- LEFT: THE VAULT ---------- */}
        <div className="md:col-span-2 relative p-5 md:p-7 bg-gradient-to-br from-[#1d1509] via-[#120e0a] to-[#0a0807] border-b md:border-b-0 md:border-r border-[#d07f05]/20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d07f05]/60 to-transparent" />

          {/* Vault emblem (desktop) */}
          <div className="relative hidden md:flex w-24 h-24 items-center justify-center mb-5">
            <span className="vault-spin absolute inset-0 rounded-full border border-dashed border-[#d07f05]/50" />
            <span className="absolute inset-3 rounded-full border border-[#d07f05]/30" />
            <span className="relative w-14 h-14 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/50 flex items-center justify-center text-[#d07f05] shadow-[0_0_30px_rgba(208,127,5,0.3)]">
              <Archive className="w-6 h-6" />
            </span>
          </div>

          <span className="inline-block text-[10px] font-bold text-[#d07f05] uppercase tracking-[0.25em] bg-[#d07f05]/10 px-3 py-1 rounded-full border border-[#d07f05]/30">
            Digital Heritage Vault
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-1.5 leading-tight">
            Contribute to the <span className="text-[#d07f05]">Archive</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
            Share oral histories, ancestral accounts, photos or documents to preserve our lineage.
          </p>

          {/* Type selector */}
          <div
            role="tablist"
            aria-label="Contribution type"
            className="mt-5 grid grid-cols-3 md:grid-cols-1 gap-2"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  disabled={isRecording && !active}
                  onClick={() => switchTab(tab.id)}
                  className={`flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-3 rounded-xl border px-2 py-2.5 md:px-3.5 md:py-3 text-center md:text-left transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    active
                      ? 'bg-[#d07f05] border-[#d07f05] text-black shadow-lg shadow-[#d07f05]/25'
                      : 'bg-black/40 border-[#d07f05]/20 text-gray-300 hover:border-[#d07f05]/60 hover:bg-[#d07f05]/5'
                  }`}
                >
                  <span className="text-xl md:text-2xl" aria-hidden>
                    {tab.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] md:text-sm font-bold uppercase md:normal-case tracking-wider md:tracking-normal">
                      {tab.title}
                    </span>
                    <span
                      className={`hidden md:block text-[11px] ${
                        active ? 'text-black/70' : 'text-gray-500'
                      }`}
                    >
                      {tab.sub}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="hidden md:block mt-5 text-[11px] text-gray-500 font-serif leading-relaxed">
            Every contribution is reviewed before it joins the archive.
          </p>
        </div>

        {/* ---------- RIGHT: THE FORM ---------- */}
        <div className="md:col-span-3 p-5 md:p-7">
          <AnimatePresence mode="wait" initial={false}>
            {submittedName !== null ? (
              /* ---------- SUCCESS ---------- */
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-full min-h-[320px] flex flex-col items-center justify-center text-center gap-4"
                role="status"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <span className="vault-ring absolute inset-0 rounded-full border border-[#d07f05]" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="relative w-16 h-16 rounded-full bg-[#d07f05] text-black flex items-center justify-center shadow-[0_0_35px_rgba(208,127,5,0.5)]"
                  >
                    <Check className="w-8 h-8" strokeWidth={3} />
                  </motion.span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sealed in the vault</h3>
                  <p className="mt-1 text-sm text-gray-300 font-light max-w-xs mx-auto">
                    Thank you{submittedName ? `, ${submittedName}` : ''}. Your contribution was
                    submitted for review and archival.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAll}
                  className="mt-1 px-5 py-2.5 rounded-full border border-[#d07f05]/50 text-[#d07f05] text-[11px] font-mono uppercase tracking-widest hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
                >
                  Add another contribution
                </button>
              </motion.div>
            ) : (
              /* ---------- FORM ---------- */
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Your Name / Lineage</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Ahmed Werjih"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Region / Settlement</label>
                    <input
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="e.g., Addis Ababa / Jimma"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Dynamic area */}
                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* ----- WRITTEN STORY ----- */}
                      {activeTab === 'text' && (
                        <div>
                          <div className="flex items-end justify-between">
                            <label className={labelCls}>Your Story or Historical Record</label>
                            <span className="mb-1.5 text-[10px] font-mono text-gray-500">
                              {storyRecord.length} chars
                            </span>
                          </div>
                          <textarea
                            rows={5}
                            required
                            value={storyRecord}
                            onChange={(e) => setStoryRecord(e.target.value)}
                            placeholder="Describe historical events, family migration accounts, or traditional customs..."
                            className={`${inputCls} resize-none`}
                          />
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
                              Need a start?
                            </span>
                            {PROMPTS.map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => addPrompt(p)}
                                className="px-2.5 py-1 rounded-full border border-[#d07f05]/25 bg-[#d07f05]/5 text-[10px] text-[#d8c5a8] hover:border-[#d07f05] hover:text-white transition-colors cursor-pointer"
                              >
                                + {p.replace(':', '')}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* ----- VOICE NOTE ----- */}
                      {activeTab === 'voice' && (
                        <div>
                          <label className={labelCls}>Your Voice Note</label>

                          <div className="rounded-2xl border border-[#d07f05]/30 bg-black/40 p-4">
                            {selectedFile && isAudio && previewUrl ? (
                              /* Recorded / uploaded */
                              <div className="space-y-3">
                                <audio controls src={previewUrl} className="w-full h-10" />
                                <div className="flex items-center justify-between gap-3">
                                  <p className="min-w-0 truncate text-[11px] font-mono text-[#d07f05]">
                                    {selectedFile.name} · {formatSize(selectedFile.size)}
                                  </p>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        clearFile();
                                        startRecording();
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d07f05]/40 text-[#d07f05] text-[10px] font-mono uppercase tracking-wider hover:bg-[#d07f05] hover:text-black transition-colors cursor-pointer"
                                    >
                                      <RotateCcw className="w-3 h-3" /> Re-record
                                    </button>
                                    <button
                                      type="button"
                                      onClick={clearFile}
                                      aria-label="Remove recording"
                                      className="w-7 h-7 rounded-full border border-[#d07f05]/30 text-gray-400 hover:text-white hover:border-[#d07f05] flex items-center justify-center transition-colors cursor-pointer"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Record button */
                              <div className="flex flex-col items-center gap-3 py-1">
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                  {isRecording && (
                                    <span className="vault-ring absolute inset-0 rounded-full border border-red-400" />
                                  )}
                                  <button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                      isRecording
                                        ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]'
                                        : 'bg-[#d07f05] text-black shadow-[0_0_30px_rgba(208,127,5,0.4)] hover:scale-105'
                                    }`}
                                  >
                                    {isRecording ? (
                                      <Square className="w-6 h-6 fill-current" />
                                    ) : (
                                      <Mic className="w-7 h-7" />
                                    )}
                                  </button>
                                </div>

                                {isRecording ? (
                                  <>
                                    <div className="flex items-center gap-[3px] h-7" aria-hidden>
                                      {BAR_HEIGHTS.map((h, i) => (
                                        <span
                                          key={i}
                                          className="vault-bar w-[3px] rounded-full bg-[#d07f05]"
                                          style={{
                                            height: `${h}%`,
                                            animationDelay: `${i * 0.06}s`,
                                          }}
                                        />
                                      ))}
                                    </div>
                                    <p className="text-sm font-mono text-white">
                                      {formatTime(seconds)}
                                      <span className="text-gray-500">
                                        {' '}
                                        / {formatTime(MAX_REC_SECONDS)}
                                      </span>
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                      Recording... tap the square to finish.
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-semibold text-white">
                                      Tap to record your memory
                                    </p>
                                    <p className="text-[11px] text-gray-400">
                                      Speak freely, up to {MAX_REC_SECONDS / 60} minutes.
                                    </p>
                                  </>
                                )}
                              </div>
                            )}

                            {/* Upload option */}
                            {!selectedFile && !isRecording && (
                              <div className="mt-3 pt-3 border-t border-white/5 text-center">
                                <input
                                  ref={fileInputRef}
                                  id="voice-file"
                                  type="file"
                                  accept="audio/*"
                                  onChange={(e) => acceptFile(e.target.files?.[0])}
                                  className="sr-only"
                                />
                                <label
                                  htmlFor="voice-file"
                                  className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-[#d07f05] transition-colors cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  or upload an audio file (MP3, WAV, M4A)
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ----- PHOTO / DOCUMENT ----- */}
                      {activeTab === 'media' && (
                        <div>
                          <label className={labelCls}>Your Photo or Document</label>

                          <input
                            ref={fileInputRef}
                            id="media-file"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => acceptFile(e.target.files?.[0])}
                            className="sr-only"
                          />

                          {selectedFile ? (
                            <div className="flex items-center gap-3 rounded-2xl border border-[#d07f05]/40 bg-[#d07f05]/5 p-3">
                              <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#d07f05]/30 bg-black/60 flex items-center justify-center">
                                {isImage && previewUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={previewUrl}
                                    alt="Selected file preview"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <FileText className="w-6 h-6 text-[#d07f05]" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm text-white">{selectedFile.name}</p>
                                <p className="text-[10px] font-mono text-[#d07f05]">
                                  {formatSize(selectedFile.size)} · ready to upload
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={clearFile}
                                aria-label="Remove file"
                                className="shrink-0 w-8 h-8 rounded-full border border-[#d07f05]/30 text-gray-400 hover:text-white hover:border-[#d07f05] flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label
                              htmlFor="media-file"
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                              }}
                              onDragLeave={() => setDragging(false)}
                              onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                acceptFile(e.dataTransfer.files?.[0]);
                              }}
                              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 text-center cursor-pointer transition-colors ${
                                dragging
                                  ? 'border-[#d07f05] bg-[#d07f05]/10'
                                  : 'border-[#d07f05]/40 bg-black/40 hover:border-[#d07f05]/70'
                              }`}
                            >
                              <span className="w-12 h-12 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/40 flex items-center justify-center text-[#d07f05]">
                                <Upload className="w-5 h-5" />
                              </span>
                              <span className="text-sm font-semibold text-white">
                                Drop a photo or document here
                              </span>
                              <span className="text-[11px] text-gray-400">
                                or tap to browse · JPG, PNG or scanned PDF · max {MAX_MB} MB
                              </span>
                            </label>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Messages */}
                {errorMsg && (
                  <p className="text-red-400 text-xs font-mono text-center" role="alert">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || isRecording}
                  className="w-full py-3.5 bg-gradient-to-r from-[#d07f05] to-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>
                    {isSubmitting
                      ? 'Saving to the vault...'
                      : isRecording
                      ? 'Finish recording first'
                      : 'Submit to the Vault'}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}