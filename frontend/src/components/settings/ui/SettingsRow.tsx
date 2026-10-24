// frontend/src/components/settings/ui/SettingsRow.tsx

interface SettingsRowProps {
    icon: React.ReactNode; 
    label: string; 
    sub?: string; 
    right: React.ReactNode
}

export function SettingsRow({icon, label, sub, right}: SettingsRowProps) {
    return (
        <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: "1px solid #2A354D" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8" }}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{label}</p>
                {sub && <p className="text-xs mt-0.5" style={{ color: "#4B5B73" }}>{sub}</p>}
            </div>
            {right}
        </div>
    );
}