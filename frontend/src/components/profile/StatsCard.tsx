// frontend/src/components/profile/StatsCard.tsx

interface StatsCardProps {
    stats: {
        label: string;
        value: string;
    }[]
}
export function StatsCard({stats}: StatsCardProps) {
    return (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest px-1 mb-3" style={{ color: "var(--app-text-muted)" }}>Your Stats</p>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-4" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
    )
}