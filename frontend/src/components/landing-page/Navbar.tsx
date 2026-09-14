// frontend/src/components/landing-page/Navbar.tsx

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(11,15,23,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.4)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 14px rgba(99,102,241,0.4)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
              <path d="M5 10a7 7 0 0014 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>Echo</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Pricing"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#94A3B8" }}>{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-sm font-medium transition-colors hover:text-white px-4 py-2"
            style={{ color: "#94A3B8" }}>
            Sign in
          </button>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}>
            Get started free
          </button>
        </div>
      </nav>
    )
}