// frontend/src/components/loading/EntryDetailSkeleton.tsx

export function EntryDetailSkeleton() {
    return (
      <div className="flex-1 overflow-y-auto pb-24 md:pb-8" aria-busy="true" aria-label="Loading entry">
        {/* Header placeholder */}
        <div
          className="px-5 py-4 flex items-center gap-3 animate-pulse"
          style={{ borderBottom: "1px solid rgba(42,53,77,0.5)" }}
        >
          <div className="w-9 h-9 rounded-xl" style={{ background: "#1E2638" }} />
          <div className="flex-1 h-5 rounded-md max-w-xs" style={{ background: "#2A354D" }} />
        </div>
  
        <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
          <div className="h-4 w-32 rounded-md animate-pulse" style={{ background: "#2A354D" }} />
          <div
            className="rounded-2xl p-5 space-y-3 animate-pulse"
            style={{ background: "#1E2638", border: "1px solid #2A354D" }}
          >
            <div className="h-4 w-24 rounded-md" style={{ background: "#2A354D" }} />
            <div className="h-3 w-full rounded-md" style={{ background: "#252F44" }} />
            <div className="h-3 w-full rounded-md" style={{ background: "#252F44" }} />
            <div className="h-3 w-4/5 rounded-md" style={{ background: "#252F44" }} />
          </div>
          <p className="text-center text-xs" style={{ color: "#4B5B73" }}>
            Loading entry…
          </p>
        </div>
      </div>
    );
  }