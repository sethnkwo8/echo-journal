// frontend/src/components/journal/EntryCard.tsx
"use client"

import { JournalEntry } from "@/types/journal";
import { formatJournalEntryDate } from "@/utils/formatJournalEntryDate";
import { useState } from "react";

interface EntryCardProps {
    entry: JournalEntry;
    onClick(): void;
}

export function EntryCard({entry, onClick}: EntryCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div
            className="rounded-2xl p-5 cursor-pointer group transition-all duration-200 hover:scale-[1.01] animate-fade-in-up"
            style={{
                background: "#1E2638",
                border: "1px solid #2A354D",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
            onClick={onClick}
            >
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold text-white leading-snug flex-1 group-hover:text-indigo-300 transition-colors">
                {entry.title}
                </h3>
                <div className="relative flex-shrink-0">
                <button
                    className="p-1.5 rounded-lg transition-colors"
                    style={{ color: "#4B5B73" }}
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                    </svg>
                </button>
                {menuOpen && (
                    <div
                    className="absolute right-0 top-8 z-10 rounded-xl overflow-hidden shadow-2xl"
                    style={{ background: "#252F44", border: "1px solid #2A354D", minWidth: 140 }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <button className="w-full px-4 py-2.5 text-sm text-left text-white hover:bg-[#2A354D] transition-colors flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        Edit
                    </button>
                    <button className="w-full px-4 py-2.5 text-sm text-left hover:bg-[#2A354D] transition-colors flex items-center gap-2" style={{ color: "#EF4444" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.5" /><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        Delete
                    </button>
                    </div>
                )}
                </div>
            </div>

            <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "#94A3B8" }}>
                {entry.content.replace(/\s+/g, " ").trim()}
            </p>

            <div className="flex items-center justify-between">
                {/* <div className="flex items-center gap-2 flex-wrap"> */}
                {/* Voice note badge */}
                {/* <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
                    <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg> */}
                    {/* {entry.duration} */}
                {/* </span> */}
                {/* AI Summary badge */}
                {/* <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
                    </svg>
                    AI Summary
                </span> */}
                {/* Mood */}
                {/* <span className="px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: `${moodColor}15`, color: moodColor, border: `1px solid ${moodColor}30` }}>
                    {entry.mood}
                </span> */}
                {/* </div> */}
                <span className="text-xs flex-shrink-0" style={{ color: "#4B5B73" }}>
                {formatJournalEntryDate(entry.created_at)}
                </span>
            </div>
        </div>
    );
}