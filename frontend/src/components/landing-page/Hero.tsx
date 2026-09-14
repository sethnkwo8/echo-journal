// frontend/src/components/landing-page/Hero.tsx
"use client"

import { useState } from "react";
import Link from "next/link";

export function Hero() {
    const scrollingPhrases = [
        "Speak your mind.", "Find your patterns.", "Know yourself better."
    ];
    const [visibleSection, setVisibleSection] = useState(0);

    return (
        <section className="relative px-6 pt-24 pb-20 flex flex-col items-center text-center overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #6366F1 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #EC4899 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6 max-w-3xl animate-fade-in-up"
          style={{ fontFamily: "Outfit, sans-serif", animationDelay: "0.05s" }}>
          Your journal.<br />
          <span className="gradient-text">Your voice.</span>
        </h1>

        {/* Rotating sub-headline */}
        <div className="h-8 mb-6 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {scrollingPhrases.map((phrase, i) => (
            <p key={phrase}
              className="text-xl font-medium transition-all duration-700"
              style={{
                color: "#94A3B8",
                transform: `translateY(${(i - visibleSection) * 32}px)`,
                opacity: i === visibleSection ? 1 : 0,
                position: i === visibleSection ? "relative" : "absolute",
              }}>
              {phrase}
            </p>
          ))}
        </div>

        <p className="text-base md:text-lg max-w-xl mb-10 leading-relaxed animate-fade-in-up"
          style={{ color: "#94A3B8", animationDelay: "0.15s" }}>
          Echo turns your spoken thoughts into a beautifully organized, AI-powered journal. No typing, no friction — just press record and reflect.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/register"
            className="group relative px-8 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105 active:scale-100"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}>
            Start journaling free
            <span className="ml-2">→</span>
          </Link>
          <Link href="/login"
            className="px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:bg-surface"
            style={{ color: "#94A3B8", border: "1px solid #2A354D" }}>
            Sign in to Echo
          </Link>
        </div>

        {/* Live Demo Card
        <div className="w-full max-w-sm animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <p className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: "#4B5B73" }}>Try it right now</p>
          <div
            className="rounded-2xl p-6 transition-all duration-500"
            style={{
              background: demoActive ? "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.1))" : "#1E2638",
              border: demoActive ? "1px solid rgba(99,102,241,0.4)" : "1px solid #2A354D",
              boxShadow: demoActive ? "0 8px 48px rgba(99,102,241,0.25)" : "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <WaveformBars active={demoActive} bars={28} />
              <MicButton recording={demoActive} onClick={toggleDemo} />
              {demoActive ? (
                <div className="text-center">
                  <p className="text-2xl font-bold tabular-nums" style={{ color: "#818CF8", fontFamily: "Outfit, sans-serif" }}>{fmt(demoTime)}</p>
                  <p className="text-xs mt-1" style={{ color: "#4B5B73" }}>Tap to stop — we'll transcribe instantly</p>
                </div>
              ) : (
                <p className="text-sm text-center" style={{ color: "#4B5B73" }}>
                  {demoTime > 0 ? "✨ Entry ready to save" : "Tap the mic to demo Echo"}
                </p>
              )}
            </div>
          </div>
        </div> */}

        {/* Trust strip */}
        <div className="flex items-center gap-6 mt-14 flex-wrap justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {[
            { icon: "🔒", label: "End-to-end encrypted" },
            { icon: "⚡", label: "Instant transcription" },
            { icon: "🌍", label: "Works in 40+ languages" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-medium" style={{ color: "#4B5B73" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    )
}