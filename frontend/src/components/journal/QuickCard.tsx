// frontend/src/components/journal/QuickCard.tsx
"use client"

import { getWordCount } from "@/utils/getWordCount";

interface QuickCardProps {
  draft: string;
  setDraft(e: string): void
  onNewEntry(draft: string): void;
};

export function QuickCard({draft, setDraft, onNewEntry}: QuickCardProps) {
  const draftWordCount = getWordCount(draft);

    return (
        <div
          className="rounded-2xl p-5 transition-all duration-300"
          style={{
            background: "var(--app-surface)",
            border: "1px solid var(--app-border)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "#818CF8" }}>
                Quick journal
              </p>
              <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>What is on your mind?</p>
            </div>
            <span className="text-xs" style={{ color: "var(--app-text-muted)" }}>{draftWordCount} words</span>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Start writing your thoughts..."
            rows={5}
            className="w-full rounded-xl px-4 py-3 text-sm leading-7 text-white resize-none placeholder-[var(--app-text-muted)] transition-colors"
            style={{ background: "var(--app-input)", border: "1px solid var(--app-border)" }}
            onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
            onBlur={(e) => (e.target.style.borderColor = "var(--app-border)")}
          />
          <div className="flex items-center justify-between gap-4 mt-3">
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>Your draft stays here until you continue.</p>
            <button
              onClick={() => onNewEntry(draft)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              Continue writing
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
    )
}