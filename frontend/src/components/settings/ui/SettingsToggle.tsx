// frontend/src/components/settings/ui/SettingsToggle.tsx

interface SettingsToggleProps {
    value: boolean; 
    onChange(v: boolean): void ;
}
export function SettingsToggle({value, onChange}: SettingsToggleProps) {
    return (
        <button
            onClick={() => onChange(!value)}
            className="relative flex-shrink-0 w-10 h-5.5 rounded-full transition-all duration-200"
            style={{
            background: value ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "var(--app-border)",
            width: 40, height: 22,
            boxShadow: value ? "0 0 12px rgba(99,102,241,0.35)" : "none",
            }}
            role="switch"
            aria-checked={value}
        >
            <span
            className="absolute top-0.5 rounded-full bg-white transition-all duration-200"
            style={{ width: 18, height: 18, left: value ? 20 : 2 }}
            />
        </button>
    )
}