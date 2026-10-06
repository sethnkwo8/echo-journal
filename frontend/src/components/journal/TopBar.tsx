// frontend/src/components/journal/TopBar.tsx
"use client"

import { AuthUser } from "@/types/auth"

interface TopBarProps {
    user: AuthUser
    onNewEntryClick(): void
}

export function TopBar({user, onNewEntryClick}: TopBarProps) {

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const firstName = user.name.split(" ")[0];

    return (
        <header className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between"
            style={{ background: "rgba(11,15,23,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.5)" }}>
            <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: "#4B5B73" }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                {greeting}, <span className="gradient-text">{firstName}</span>
            </h2>
            </div>
            <div className="flex items-center gap-3">
            <button
                onClick={onNewEntryClick}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                New Entry
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                {firstName.charAt(0)}
            </div>
            </div>
        </header>
    )
}