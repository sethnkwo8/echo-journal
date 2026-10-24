// frontend/src/components/settings/SettingsHeader.tsx

export function SettingsHeader() {
    return (
        <header className="sticky top-0 z-30 px-5 py-4"
            style={{ background: "rgba(11,15,23,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.5)" }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Settings</h2>
            <p className="text-xs mt-0.5" style={{ color: "#4B5B73" }}>Manage your preferences and account</p>
        </header>
    )
}