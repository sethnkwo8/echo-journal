// frontend/src/components/profile/SavedBar.tsx

export function SavedBar() {
    return (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl animate-fade-in-up"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "#10B981" }}>
            <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-medium" style={{ color: "#10B981" }}>Profile updated</span>
        </div>
    )
}