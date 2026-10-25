// frontend/src/components/settings/ui/SettingsRow.tsx

interface SettingsRowProps {
    icon: React.ReactNode; 
    label: string; 
    sub?: string; 
    right: React.ReactNode
    onClick?(): void
}

export function SettingsRow({ icon, label, sub, right, onClick }: SettingsRowProps) {
    const className =
      "flex w-full items-center gap-4 px-5 py-4 text-left transition-colors";
    const style = { borderBottom: "1px solid var(--app-border)" }; // or your existing border

    const content = (
      <>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(99,102,241,0.12)", color: "#818CF8" }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{label}</p>
          {sub && <p className="text-xs mt-0.5" style={{ color: "var(--app-text-muted)" }}>{sub}</p>}
        </div>
        {right}
      </>
    );

    if (onClick) {
      return (
        <button
          type="button"
          onClick={onClick}
          className={`${className} hover:bg-white/5 cursor-pointer bg-transparent border-0`}
          style={style}
        >
          {content}
        </button>
      );
    }

    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
}