// frontend/src/components/new-entry/TopBar.tsx

interface TopBarProps {
    onBack(): void;
    handleSave(): void;
    saved: boolean;
    isSaving: boolean;
    canSave: boolean;
}

export function TopBar({onBack, handleSave, saved, isSaving, canSave}: TopBarProps) {
    const saveMessage = isSaving ?
        "Saving..."
        : saved 
        ? "Saved"
        : "Save";

    return (
        <header className="sticky top-0 z-30 px-5 py-4 flex items-center gap-3"
            style={{ background: "var(--app-nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--app-border)" }}>
            <button onClick={onBack} className="p-2 rounded-xl transition-colors hover:bg-[var(--app-surface)]" style={{ color: "#94A3B8" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </button>
            <span className="flex-1 text-base font-semibold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>New Entry</span>
            <button
            onClick={handleSave}
            disabled={!canSave || isSaving}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-30"
            style={{
                background: saved ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #6366F1, #8B5CF6)",
                color: saved ? "#10B981" : "white",
                border: saved ? "1px solid rgba(16,185,129,0.3)" : "none",
                boxShadow: saved ? "none" : "0 4px 12px rgba(99,102,241,0.3)",
            }}
            >
            {saveMessage}
            </button>
        </header>
    );
}