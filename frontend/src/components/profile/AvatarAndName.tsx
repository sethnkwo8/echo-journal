// frontend/src/components/profile/AvatarAndName.tsx

interface AvatarAndNameProps {
    name: string;
    editing: boolean;
    setName(value: string): void;
}

export function AvatarAndName({name, editing, setName}: AvatarAndNameProps) {
    return (
        <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}>
              {name.charAt(0)}
            </div>
            {editing && (
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
                style={{ background: "#6366F1", border: "2px solid var(--app-bg)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}

            {editing ? (
                <div className="w-full max-w-xs space-y-3">
                    <input value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full text-center bg-transparent text-xl font-bold text-white focus:outline-none border-b pb-1"
                        style={{ borderColor: "#6366F1" }} />
                </div>
            ) : (
                <>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{name}</h3>
                </div>
                </>
            )}
        </div>
    )
}