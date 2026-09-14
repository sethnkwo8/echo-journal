// frontend/src/components/landing-page/CTA.tsx
import Link from "next/link"

export function CTA() {
    return (
        <section className="px-6 py-28 relative overflow-hidden" style={{ borderTop: "1px solid #1E2638" }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-75 rounded-full opacity-15"
                style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 70%)", filter: "blur(60px)" }} />
            </div>
            <div className="max-w-2xl mx-auto text-center relative">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "Outfit, sans-serif", lineHeight: 1.1 }}>
                Start your first<br /><span className="gradient-text">entry today.</span>
            </h2>
            <p className="text-base md:text-lg mb-10" style={{ color: "#94A3B8" }}>
                Three minutes a day. That&apos;s all it takes. Echo meets you where you are.
            </p>
            <Link href="/register"
                className="px-10 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 active:scale-100"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 8px 40px rgba(99,102,241,0.45)" }}>
                Create your free account →
            </Link>
            <p className="text-xs mt-5" style={{ color: "#4B5B73" }}>No credit card required</p>
            </div>
      </section>
    )
}