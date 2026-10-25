// frontend/src/components/new-entry/Content.tsx
"use client"

import React from "react";
import { getWordCount } from "@/utils/getWordCount";

interface ContentProps {
    headerText: string;
    content: string;
    onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export function Content({headerText, content, onChange}: ContentProps) {

    const wordCount = getWordCount(content);
    
    return (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}>
          <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--app-border)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "#6366F1" }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold text-white">{headerText}</span>
            <span className="ml-auto text-xs" style={{ color: "var(--app-text-muted)" }}>{wordCount} words</span>
          </div>
          <textarea
            value={content}
            name="content"
            onChange={onChange}
            placeholder="Write freely. Capture what happened, how you feel, or anything you want to remember..."
            rows={12}
            className="w-full px-5 py-4 bg-transparent text-sm leading-7 resize-y focus:outline-none placeholder-[var(--app-text-muted)]"
            style={{ color: "#FFFFFF", minHeight: 280 }}
          />
        </div>
    )
}