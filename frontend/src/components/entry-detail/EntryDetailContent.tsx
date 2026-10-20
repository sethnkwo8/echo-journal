// frontend/src/components/entry-detail/EntryDetailContent.tsx
"use client"

import { JournalEntry } from "@/types/journal"
import { formatJournalEntryDate } from "@/utils/formatJournalEntryDate";
import { TopBar } from "./TopBar";
import { useState } from "react";

interface EntryDetailContentProps {
    entry: JournalEntry;
    onBack(): void
}

export function EntryDetailContent({entry, onBack}: EntryDetailContentProps) {
    const [title, setTitle] = useState<string>(entry.title);

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
          {/* Top bar */}
          <TopBar onBack={onBack} title={title} setTitle={setTitle}/>
    
          <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
            {/* Date */}
            <p className="text-sm" style={{ color: "#4B5B73" }}>{formatJournalEntryDate(entry.created_at)}</p>
    
            {/* Audio Player */}
            {/* <div className="rounded-2xl p-5" style={{ background: "#1E2638", border: "1px solid #2A354D" }}>
              <div className="flex items-center justify-between mb-5">
                <WaveformBars active={playing} bars={24} />
                <div className="flex items-center gap-2 ml-4">
                  {([1, 1.5, 2] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: speed === s ? "rgba(99,102,241,0.2)" : "transparent",
                        color: speed === s ? "#818CF8" : "#4B5B73",
                        border: speed === s ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div> */}
    
              {/* Progress bar */}
              {/* <div
                className="w-full h-1.5 rounded-full mb-3 cursor-pointer"
                style={{ background: "#0B0F17" }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}
              >
                <div
                  className="h-full rounded-full relative transition-all"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                  }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                <span className="text-xs tabular-nums" style={{ color: "#94A3B8" }}>{formatTime(elapsed)}</span>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                  }}
                >
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                      <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7-11-7z" fill="white" />
                    </svg>
                  )}
                </button>
                <span className="text-xs tabular-nums" style={{ color: "#94A3B8" }}>-{formatTime(totalSeconds - elapsed)}</span>
              </div>
            </div> */}
    
            {/* Tags */}
            {/* <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "#252F44", color: "#94A3B8", border: "1px solid #2A354D" }}>
                  #{tag}
                </span>
              ))}
            </div> */}
    
            {/* Transcript */}
            <div className="rounded-2xl p-5" style={{ background: "#1E2638", border: "1px solid #2A354D" }}>
              <div className="flex items-center gap-2 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "#6366F1" }}>
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h4 className="text-sm font-semibold text-white">Transcript</h4>
              </div>
              <div
                className="text-sm leading-7 focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                style={{ color: "#94A3B8" }}
              >
                {entry.content.split("\n\n").map((p, i) => (
                  <p key={i} className={i > 0 ? "mt-4" : ""}>{p}</p>
                ))}
              </div>
            </div>
    
            {/* AI Insights */}
            {/* <div className="rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.2)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">AI Insights</h4>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8" }}>
                  {entry.mood}
                </span>
              </div> */}
              {/* <ul className="space-y-2.5">
                {entry.insights.map((insight, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#6366F1" }} />
                    {insight}
                  </li>
                ))}
              </ul> */}
            {/* </div> */}
          </div>
        </div>
    )
}