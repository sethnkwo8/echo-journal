// frontend/src/components/journal/SearchBar.tsx
"use client"

interface SearchBarProps {
    search: string;
    setSearch(e: string): void
}
export function SearchBar({search, setSearch}: SearchBarProps) {
    return (
        <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--app-text-muted)" }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search text, tags, or feelings…"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-[var(--app-text-muted)] transition-all"
                style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}
                onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                onBlur={(e) => (e.target.style.borderColor = "var(--app-border)")}
            />
        </div>
    )
}