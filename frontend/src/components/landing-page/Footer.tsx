// frontend/src/components/landing-page/Footer.tsx

export function Footer() {
    return (
        <footer className="px-6 py-10" style={{ borderTop: "1px solid #1E2638" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
                <path d="M5 10a7 7 0 0014 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-white font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Echo</span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security", "Blog"].map((item) => (
              <a key={item} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#4B5B73" }}>{item}</a>
            ))}
          </div>
          <p className="text-xs" style={{ color: "#4B5B73" }}>© 2026 Echo. Made with care.</p>
        </div>
      </footer>
    )
}