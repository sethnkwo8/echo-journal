// frontend/src/components/profile/ProfileHeader.tsx

interface ProfileHeaderProps {
    editing: boolean;
    setEditing(value: boolean): void;
    handleSave(): void;
}

export function ProfileHeader({editing, setEditing, handleSave}: ProfileHeaderProps) {
    return (
        <header className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between"
            style={{ background: "var(--app-nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(42,53,77,0.5)" }}>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Profile</h2>
            {editing ? (
            <button onClick={handleSave}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                Save
            </button>
            ) : (
            <button onClick={() => setEditing(true)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[var(--app-surface)]"
                style={{ color: "#818CF8", border: "1px solid rgba(99,102,241,0.25)" }}>
                Edit
            </button>
            )}
        </header>
    )
}