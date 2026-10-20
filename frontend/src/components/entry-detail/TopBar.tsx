// frontend/src/components/entry-detail/TopBar.tsx
"use client"

interface TopBarProps {
    onBack(): void;
    title: string;
    setTitle(title: string): void;
}
export function TopBar({onBack, title, setTitle}: TopBarProps) {
    return (
        <header className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3"
            style={{ background: "rgba(11,15,23,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.5)" }}>
            <button onClick={onBack} className="p-2 rounded-xl transition-colors hover:bg-[#1E2638]" style={{ color: "#94A3B8" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-transparent text-base font-semibold text-white focus:outline-none min-w-0"
            />
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#10B981" }} />
              <span className="text-xs font-medium" style={{ color: "#10B981" }}>Saved</span>
            </div>
            <button className="p-2 rounded-xl transition-colors hover:bg-red-900/20" style={{ color: "#4B5B73" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
        </header>
    )
}