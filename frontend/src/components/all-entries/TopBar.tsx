// frontend/src/components/all-entries/TopBar.tsx

interface TopBarProps {
    onBack(): void;
    entriesLength: number;
    onNewEntry(): void;
}

export function TopBar({onBack, entriesLength, onNewEntry}: TopBarProps) {
    return (
        <header
        className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3"
        style={{ background: "rgba(11,15,23,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.5)" }}
      >
        <button onClick={onBack} className="p-2 rounded-xl transition-colors hover:bg-[#1E2638]" style={{ color: "#94A3B8" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>All entries</h2>
          <p className="text-xs mt-0.5" style={{ color: "#4B5B73" }}>{entriesLength <= 1 ? `${entriesLength} journal entry` : `${entriesLength} journal entries`}</p>
        </div>
        <button
          onClick={onNewEntry}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Entry
        </button>
    </header>
    )
}