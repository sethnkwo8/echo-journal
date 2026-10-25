// frontend/src/components/settings/SettingsHeader.tsx

export function SettingsHeader() {
    return (
        <header className="sticky top-0 z-30 px-5 py-4"
            style={{ background: "var(--app-nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--app-border)" }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Settings</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--app-text-muted)" }}>Manage your preferences and account</p>
        </header>
    )
}