// frontend/src/components/settings/ui/SettingsSection.tsx

interface SettingsSectionProps {
    title: string; 
    children: React.ReactNode
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest px-1 mb-3" style={{ color: "#4B5B73" }}>{title}</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#1E2638", border: "1px solid #2A354D" }}>
                {children}
            </div>
        </div>
    )
}