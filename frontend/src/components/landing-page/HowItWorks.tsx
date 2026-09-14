// frontend/src/components/landing-page/HowItWorks.tsx
import { STEPS } from "@/lib/landing-page/howItWorksSteps"

export function HowItWorks() {
    return (
        <section className="px-6 py-24" style={{ background: "#0D1220", borderTop: "1px solid #1E2638", borderBottom: "1px solid #1E2638" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#6366F1" }}>How it works</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              Three steps to clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                    color: step.color,
                    fontFamily: "Outfit, sans-serif",
                  }}>
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}