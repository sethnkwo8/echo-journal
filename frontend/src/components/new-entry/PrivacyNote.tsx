// frontend/src/components/new-entry/PrivacyNote.tsx

export function PrivacyNote() {
    return (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: "#10B981", flexShrink: 0 }}>
            <path d="M12 2L3 7v7c0 4.5 3.8 8.7 9 10 5.2-1.3 9-5.5 9-10V7L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs" style={{ color: "#10B981" }}>Your entry is end-to-end encrypted and visible only to you.</p>
        </div>
    )
}