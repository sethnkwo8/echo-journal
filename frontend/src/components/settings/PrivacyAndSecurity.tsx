// frontend/src/components/settings/PrivacyAndSecurity.tsx
import { SettingsSection } from "./ui/SettingsSection";
import { SettingsRow } from "./ui/SettingsRow";
import { ErrorMessage } from "../new-entry/ErrorMessage";

interface PrivacyAndSecurityProps {
    handleDelete(): void;
    isPending: boolean;
    deleteError: string | null;
}

export function PrivacyAndSecurity({handleDelete, isPending, deleteError}: PrivacyAndSecurityProps) {
    return (
        <SettingsSection title="Privacy & Security">
          <SettingsRow
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v7c0 4.5 3.8 8.7 9 10 5.2-1.3 9-5.5 9-10V7L12 2z" stroke="currentColor" strokeWidth="1.5" /></svg>}
            label="Secure connection"
            sub="Your data is sent over an encrypted connection (HTTPS)."
            right={<span className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>Active</span>}
          />
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.5" /><path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "#EF4444" }}>Delete All Entries</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--app-text-muted)" }}>Permanently erase your journal data</p>
            </div>
            <button
              disabled={isPending}
              onClick={handleDelete}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:bg-red-950/30"
              style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}>
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
          {deleteError && (
            <div className="px-5 pb-4">
                <ErrorMessage message={deleteError} />
            </div>
           )}
        </SettingsSection>
    );
}