// frontend/src/components/settings/Appearance.tsx
import { SettingsSection } from "./ui/SettingsSection";
import type { Theme } from "@/lib/theme";

interface AppearanceProps {
    theme: Theme;
    onThemeChange(value: Theme): void;
}

export function Appearance({theme, onThemeChange}: AppearanceProps) {
    return (
        <SettingsSection title="Appearance">
          <div className="px-5 py-4">
            <p className="text-sm font-medium text-white mb-3">Theme</p>
            <div className="flex gap-3">
              {(["dark", "midnight"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onThemeChange(t)}
                  aria-pressed={theme === t}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-1 justify-center"
                  style={{
                    background: theme === t ? "rgba(99,102,241,0.15)" : "var(--app-bg)",
                    color: theme === t ? "#818CF8" : "var(--app-text-muted)",
                    border: theme === t ? "1px solid rgba(99,102,241,0.3)" : "1px solid var(--app-border)",
                  }}
                >
                  {t === "dark" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20.5 15.1A9 9 0 018.9 3.5 9 9 0 1020.5 15.1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="8.5" fill="currentColor" opacity="0.28" />
                      <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.72" />
                    </svg>
                  )}
                  {t === "dark" ? "Dark" : "Midnight"}
                </button>
              ))}
            </div>
          </div>
        </SettingsSection>
    );
}