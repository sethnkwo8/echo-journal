// frontend/src/components/journal/SearchBar.tsx
"use client"

export function SearchBar() {
    return (
        <div className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
            <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#4B5B73" }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
                type="text"
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                placeholder="Search entries, tags, or transcripts..."
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-[#4B5B73] transition-all"
                style={{ background: "#1E2638", border: "1px solid #2A354D" }}
                onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
            />
            </div>
        </div>
    )
}