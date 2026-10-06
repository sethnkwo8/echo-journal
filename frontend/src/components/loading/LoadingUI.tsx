// frontend/src/components/loading/LoadingUI.tsx
import { useState, useEffect } from "react";

const LOAD_STEPS = [
    "Initialising secure vault...",
    "Loading your journal...",
    "Almost ready...",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [step, setStep] = useState(0);
    const [exiting, setExiting] = useState(false);
  
    useEffect(() => {
      const timers: ReturnType<typeof setTimeout>[] = [];
      timers.push(setTimeout(() => setStep(1), 900));
      timers.push(setTimeout(() => setStep(2), 1700));
      timers.push(setTimeout(() => setExiting(true), 2400));
      timers.push(setTimeout(() => onDone(), 2900));
      return () => timers.forEach(clearTimeout);
    }, [onDone]);
  
    return (
      <div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10"
        style={{
          background: "#0B0F17",
          opacity: exiting ? 0 : 1,
          transition: "opacity 0.5s ease",
          pointerEvents: exiting ? "none" : "auto",
        }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)", filter: "blur(48px)" }} />
        </div>
  
        {/* Ripple rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div key={i} className="absolute rounded-full border"
              style={{
                width: 88, height: 88,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                borderColor: "rgba(99,102,241,0.3)",
                animation: `ripple-out 2.4s ease-out ${i * 0.6}s infinite`,
              }} />
          ))}
        </div>
  
        {/* Logo */}
        <div className="relative flex flex-col items-center gap-5">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              animation: "logo-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both, logo-glow-pulse 2s ease-in-out 0.6s infinite",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
              <path d="M5 10a7 7 0 0014 0" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M12 19v3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
  
          <span
            className="text-4xl font-extrabold text-white"
            style={{
              fontFamily: "Outfit, sans-serif",
              animation: "wordmark-in 0.4s ease 0.3s both",
              letterSpacing: "-0.02em",
            }}
          >
            Echo
          </span>
  
          <p className="text-sm font-medium h-5 transition-all duration-300"
            style={{ color: "#4B5B73", animation: "wordmark-in 0.4s ease 0.5s both" }}>
            {LOAD_STEPS[step]}
          </p>
        </div>
  
        {/* Progress bar */}
        <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "#1E2638" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
              animation: `progress-fill 2.2s cubic-bezier(0.4,0,0.2,1) 0.3s both`,
              boxShadow: "0 0 8px rgba(99,102,241,0.7)",
            }}
          />
        </div>
  
        {/* Waveform flourish */}
        {/* <div style={{ opacity: 0.35 }}>
          <WaveformBars active={true} bars={20} />
        </div> */}
      </div>
    );
  }