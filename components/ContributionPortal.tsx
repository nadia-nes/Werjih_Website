'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize your Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContributionPortal() {
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'media'>('text');
  
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [region, setRegion] = useState('');
  const [storyRecord, setStoryRecord] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = null;

      // 1. If a file or voice recording is selected, upload it to Supabase Storage first
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('archive_files') // Make sure this bucket exists and is public
          .upload(fileName, selectedFile);

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Get the public URL for the stored file
        const { data: urlData } = supabase.storage
          .from('archive_files')
          .getPublicUrl(fileName);
          
        fileUrl = urlData.publicUrl;
      }

      // 2. Insert the submission data into your Supabase table
      const { error: insertError } = await supabase
        .from('archive_contributions')
        .insert([
          {
            contribution_type: activeTab.toUpperCase(),
            full_name: fullName,
            region: region,
            story_record: activeTab === 'text' ? storyRecord : `[Attached File/Media: ${selectedFile?.name || 'Voice Note'}]`,
            file_url: fileUrl,
          },
        ]);

      if (insertError) {
        throw new Error(`Database save failed: ${insertError.message}`);
      }

      // Success cleanup
      setIsSubmitting(false);
      setSuccessMsg(true);
      setFullName('');
      setRegion('');
      setStoryRecord('');
      setSelectedFile(null);

      setTimeout(() => setSuccessMsg(false), 5000);
    } catch (err) {
      console.error(err);
      alert((err as Error).message || 'An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contribution-portal" className="max-w-6xl mx-auto px-8 py-20 border-t border-[#d07f05]/20 relative">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d07f05]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <span className="text-xs font-bold text-[#d07f05] uppercase tracking-widest bg-[#d07f05]/10 px-3 py-1 rounded-full border border-[#d07f05]/30">
          Digital Heritage Vault
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-3">
          Contribute to the <span className="text-[#d07f05]">Archive</span>
        </h2>
        <p className="text-gray-300 text-sm md:text-base font-light">
          Share oral histories, ancestral accounts, historical photos, or documents to preserve our collective lineage.
        </p>
      </div>

      {/* 3D Glassmorphism Container */}
      <div className="max-w-3xl mx-auto bg-[#141414]/90 border border-[#d07f05]/40 rounded-3xl p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl relative z-10">
        
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-black/60 border border-white/5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'text'
                ? 'bg-[#d07f05] text-black shadow-lg shadow-[#d07f05]/20 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>✍️</span>
            <span className="hidden sm:inline">Written Story</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('voice')}
            className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'voice'
                ? 'bg-[#d07f05] text-black shadow-lg shadow-[#d07f05]/20 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎙️</span>
            <span className="hidden sm:inline">Voice Note</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === 'media'
                ? 'bg-[#d07f05] text-black shadow-lg shadow-[#d07f05]/20 scale-[1.02]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🖼️</span>
            <span className="hidden sm:inline">Photo / Doc</span>
          </button>
        </div>

        {/* Contribution Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Contributor Metadata Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Your Name / Lineage</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Ahmed Werjih"
                className="w-full bg-black/50 border border-[#d07f05]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider mb-2">Region / Settlement Node</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g., Addis Ababa / Jimma"
                className="w-full bg-black/50 border border-[#d07f05]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05] transition-colors"
              />
            </div>
          </div>

          {/* Dynamic Input Modes */}
          {activeTab === 'text' && (
            <div className="space-y-2 animate-fadeIn">
              <label className="block text-xs uppercase font-bold text-gray-400 tracking-wider">Your Story or Historical Record</label>
              <textarea
                rows={5}
                required
                value={storyRecord}
                onChange={(e) => setStoryRecord(e.target.value)}
                placeholder="Describe historical events, family migration accounts, or traditional customs..."
                className="w-full bg-black/50 border border-[#d07f05]/30 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#d07f05] transition-colors resize-none"
              ></textarea>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="p-8 border-2 border-dashed border-[#d07f05]/40 rounded-2xl bg-black/40 text-center flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/40 flex items-center justify-center text-2xl text-[#d07f05]">
                🎙️
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Upload Audio Note</p>
                <p className="text-xs text-gray-400 mt-1">Select an audio file (MP3, WAV, M4A) to upload your voice memory.</p>
              </div>
              <input 
                type="file" 
                accept="audio/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#d07f05] file:text-black hover:file:bg-amber-400 cursor-pointer"
              />
              {selectedFile && <p className="text-xs text-amber-400">Selected: {selectedFile.name}</p>}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="p-8 border-2 border-dashed border-[#d07f05]/40 rounded-2xl bg-black/40 text-center flex flex-col items-center justify-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#d07f05]/10 border border-[#d07f05]/40 flex items-center justify-center text-2xl text-[#d07f05]">
                📁
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Upload Historical Image or Document</p>
                <p className="text-xs text-gray-400 mt-1">Supports high-res JPG, PNG, or scanned archival PDFs.</p>
              </div>
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#d07f05] file:text-black hover:file:bg-amber-400 cursor-pointer"
              />
              {selectedFile && <p className="text-xs text-amber-400">Selected: {selectedFile.name}</p>}
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#d07f05] to-amber-500 text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-95 transition-all shadow-xl hover:scale-[1.01] flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              <span>🚀</span>
            )}
            <span>{isSubmitting ? 'Encrypting & Storing in Vault...' : 'Submit Contribution to Vault'}</span>
          </button>

          {/* Success Banner */}
          {successMsg && (
            <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center text-emerald-300 text-xs font-semibold animate-fadeIn">
              ✨ Thank you! Your contribution has been securely submitted for review and archival.
            </div>
          )}

        </form>
      </div>
    </section>
  );
}