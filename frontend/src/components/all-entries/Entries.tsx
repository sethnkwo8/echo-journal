// frontend/src/components/all-entries/Entries.tsx

import { JournalEntry } from "@/types/journal";
import { EntryCard } from "../journal/EntryCard";
import { ErrorMessage } from "../new-entry/ErrorMessage";

interface EntriesProps {
    month: string;
    filteredEntries: JournalEntry[];
    visibleEntries: JournalEntry[];
    page: number;
    pageCount: number;
    resultStart: number;
    resultEnd: number;
    setPage(value: number): void;
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}

export function Entries({
    month, filteredEntries, visibleEntries, page, pageCount, resultEnd, resultStart, setPage, isPending, isError, errorMessage
}: EntriesProps) {
    const resultMessage = isPending
  ? "Loading..."
  : isError
    ? ""
    : `${filteredEntries.length} ${filteredEntries.length === 1 ? "result" : "results"}`;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">
                {month === "All months" ? "All entries" : month}
            </p>
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
                {resultMessage}
            </p>
            </div>

            <div className="space-y-3">
                {
                    isPending ? (
                        <div className="space-y-3" aria-busy="true" aria-label="Loading entries">
                            {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-5 animate-pulse"
                                style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}
                            >
                                <div className="h-4 rounded-md mb-3 w-2/3" style={{ background: "var(--app-border)" }} />
                                <div className="h-3 rounded-md mb-2 w-full" style={{ background: "var(--app-surface-high)" }} />
                                <div className="h-3 rounded-md w-4/5" style={{ background: "var(--app-surface-high)" }} />
                            </div>
                            ))}
                            <p className="text-center text-xs pt-2" style={{ color: "var(--app-text-muted)" }}>
                            Loading your entries…
                            </p>
                        </div>
                    )
                    : isError
                    ? (
                        <ErrorMessage message={errorMessage} />
                    )
                    : (
                        <>
                            {visibleEntries.map((entry) => (
                                <EntryCard key={entry.id} entry={entry}/>
                            ))}
                        </>
                    )
                }
            </div>

            {!isPending && !isError && filteredEntries.length === 0 && (
            <div className="rounded-2xl py-14 px-6 text-center" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3" style={{ color: "var(--app-text-muted)" }}>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="text-sm font-semibold text-white">No entries found</p>
                <p className="text-xs mt-1" style={{ color: "var(--app-text-muted)" }}>Try a different search or month.</p>
            </div>
            )}

            {!isPending && filteredEntries.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5" style={{ borderTop: "1px solid var(--app-border)" }}>
                <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>
                Showing {resultStart}–{resultEnd} of {filteredEntries.length}
                </p>
                <div className="flex items-center gap-2">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", color: "#94A3B8" }}
                    aria-label="Previous page"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className="w-9 h-9 rounded-xl text-xs font-semibold transition-colors"
                    style={{
                        background: page === pageNumber ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "var(--app-surface)",
                        border: page === pageNumber ? "1px solid transparent" : "1px solid var(--app-border)",
                        color: page === pageNumber ? "#FFFFFF" : "#94A3B8",
                    }}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={page === pageNumber ? "page" : undefined}
                    >
                    {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => setPage(Math.min(pageCount, page + 1))}
                    disabled={page === pageCount}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)", color: "#94A3B8" }}
                    aria-label="Next page"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                </div>
            </div>
            )}
        </>
    )
}