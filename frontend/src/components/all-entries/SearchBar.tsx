// frontend/src/components/all-entries/SearchBar.tsx

interface SearchBarProps {
    search: string;
    setSearch(value: string): void;
    month: string;
    setMonth(value: string): void;
    months: string[];
}

export function SearchBar({search, setSearch, month, setMonth, months}: SearchBarProps) {
    return (
        <div className="rounded-2xl p-4 mb-6" style={{ background: "#1E2638", border: "1px solid #2A354D" }}>
          <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#4B5B73" }}>
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search text, tags, or feelings..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white placeholder-[#4B5B73]"
                    style={{ background: "#121824", border: "1px solid #2A354D" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                    onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
                />
                </div>
                <div className="relative sm:w-48">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ color: "#818CF8" }}>
                    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <select
                name="month"
                    value={month}
                    onChange={(event) => setMonth(event.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                    onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
                    className="w-full appearance-none pl-10 pr-9 py-3 rounded-xl text-sm text-white cursor-pointer outline-0"
                    style={{ background: "#121824", border: "1px solid #2A354D" }}
                    aria-label="Filter by month"
                >
                    <option value="All months">All months</option>
                    {months.map((entryMonth) => <option key={entryMonth}>{entryMonth}</option>)}
                </select>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "#4B5B73" }}>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </div>
            </div>
        </div>
    )
}