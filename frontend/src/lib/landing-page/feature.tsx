// frontend/src/lib/landing-page/feature.tsx

export const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" />
          <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 19v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
      color: "#6366F1",
      title: "Voice-First Journaling",
      desc: "Speak your thoughts naturally. No typing required. Echo captures your voice and turns it into a beautiful journal entry in seconds.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
      color: "#8B5CF6",
      title: "Instant Transcription",
      desc: "Your words become text in real time. Edit, refine, and search your full journal history — every word, always findable.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
      ),
      color: "#EC4899",
      title: "AI Insights",
      desc: "Discover patterns in your thinking. Echo surfaces mood trends, recurring themes, and gentle reflections to help you grow.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v7c0 4.5 3.8 8.7 9 10 5.2-1.3 9-5.5 9-10V7L12 2z" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "#10B981",
      title: "Private by Design",
      desc: "End-to-end encrypted from day one. Your innermost thoughts are yours alone — we can't read them, and neither can anyone else.",
    },
  ];