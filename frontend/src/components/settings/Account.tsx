// frontend/src/components/settings/Account.tsx
import { SettingsSection } from "./ui/SettingsSection"
import { SettingsRow } from "./ui/SettingsRow"

interface AccountProps {
    onEdit(): void;
};

export function Account({onEdit}: AccountProps) {
    return (
        <SettingsSection title="Account">
          <SettingsRow
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>}
            label="Edit Profile"
            sub="Update your name, email, and avatar"
            right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--app-text-muted)" }}><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            onClick={onEdit}
          />
          {/* <SettingsRow
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            label="Export Data"
            sub="Download all entries as PDF or Markdown"
            right={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "var(--app-text-muted)" }}><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
          /> */}
        </SettingsSection>

    )
}