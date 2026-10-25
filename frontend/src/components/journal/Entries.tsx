// frontend/src/components/journal/Entries.tsx
import { JournalEntry } from "@/types/journal"
import { EntryCard } from "./EntryCard"
import { ErrorMessage } from "../new-entry/ErrorMessage";

interface EntriesProps {
    title: string;
    entries: JournalEntry[];
    search: string;
    limit?: number;
    showViewAll: boolean;
    onViewAll(): void;
    isPending: boolean;
    isError: boolean;
    errorMessage: string;
}

export function Entries({title, entries, search, limit, showViewAll, onViewAll, isPending, isError, errorMessage}: EntriesProps) {
  return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {
              !isPending && !isError && showViewAll && entries.length > (limit ?? entries.length) && 
              <button
                  onClick={onViewAll}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-indigo-300"
                  style={{ color: "#818CF8" }}
              >
                  View all
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </button>
          }
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
                  {(limit != null ? entries.slice(0, limit) : entries).map((entry) => (
                      <EntryCard key={entry.id} entry={entry} />
                  ))}
                  {entries.length === 0 && (
                    <div className="text-center py-12" style={{ color: "var(--app-text-muted)" }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-40">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <p className="text-sm">{!!search.trim() ? `No entries found for "${search}"` : "No entries yet"}</p>
                    </div>
                  )}
                </>
              )
          }
        </div>
      </div>
  )
}