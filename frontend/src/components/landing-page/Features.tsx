// frontend/src/components/landing-page/Features.tsx
import { FEATURES } from "@/lib/landing-page/features"

export function Features() {
  return (
      <section className="px-6 py-24" style={{ borderTop: "1px solid #1E2638" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6366F1" }}>What Echo does</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
            Built for how you<br />actually think
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl p-7 group transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "#1E2638",
                border: "1px solid #2A354D",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${f.color}18`, color: f.color, border: `1px solid ${f.color}30` }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}