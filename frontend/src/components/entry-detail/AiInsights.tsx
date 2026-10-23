// frontend/src/components/entry-detail/AiInsights.tsx

export function AiInsights() {
    return (
        <div className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.06))", border: "1px solid rgba(99,102,241,0.2)" }}>
            <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" />
                </svg>
            </div>
            <h4 className="text-sm font-semibold text-white">AI Insights</h4>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8" }}>
                {/* {entry.mood} */}
            </span>
            </div>
            <ul className="space-y-2.5">
                {/* {entry.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#6366F1" }} />
                    {insight}
                    </li>
                ))} */}
            </ul> 
        </div>
    )
}