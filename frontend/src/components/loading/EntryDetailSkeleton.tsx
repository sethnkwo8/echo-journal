// frontend/src/components/loading/EntryDetailSkeleton.tsx

export function EntryDetailSkeleton() {
    return (
      <div className="flex-1 overflow-y-auto pb-24 md:pb-8" aria-busy="true" aria-label="Loading entry">
        {/* Header placeholder */}
        <div
          className="px-5 py-4 flex items-center gap-3 animate-pulse"
          style={{ borderBottom: "1px solid var(--app-border)" }}
        >
          <div className="w-9 h-9 rounded-xl" style={{ background: "var(--app-surface)" }} />
          <div className="flex-1 h-5 rounded-md max-w-xs" style={{ background: "var(--app-border)" }} />
        </div>
  
        <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
          <div className="h-4 w-32 rounded-md animate-pulse" style={{ background: "var(--app-border)" }} />
          <div
            className="rounded-2xl p-5 space-y-3 animate-pulse"
            style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}
          >
            <div className="h-4 w-24 rounded-md" style={{ background: "var(--app-border)" }} />
            <div className="h-3 w-full rounded-md" style={{ background: "var(--app-surface-high)" }} />
            <div className="h-3 w-full rounded-md" style={{ background: "var(--app-surface-high)" }} />
            <div className="h-3 w-4/5 rounded-md" style={{ background: "var(--app-surface-high)" }} />
          </div>
          <p className="text-center text-xs" style={{ color: "var(--app-text-muted)" }}>
            Loading entry…
          </p>
        </div>
      </div>
    );
  }