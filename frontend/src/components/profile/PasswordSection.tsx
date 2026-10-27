// frontend/src/components/profile/PasswordSection.tsx

interface PasswordSectionProps {
    setChangingPassword: React.Dispatch<React.SetStateAction<boolean>>;
    setPasswordError: React.Dispatch<React.SetStateAction<string>>;
    setPasswordChanged: React.Dispatch<React.SetStateAction<boolean>>;
    changingPassword: boolean;
    passwordChanged: boolean;
    handlePasswordChange: React.FormEventHandler<HTMLFormElement>;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    resetPasswordForm(): void;
    passwordError: string;
    isPending: boolean;
}

export function PasswordSection({
    setChangingPassword,
    setPasswordChanged,
    setPasswordError,
    changingPassword,
    passwordChanged,
    handlePasswordChange,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    resetPasswordForm,
    passwordError,
    isPending
}: PasswordSectionProps) {
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setChangingPassword(!changingPassword);
                    setPasswordError("");
                    setPasswordChanged(false);
                }}
                className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--app-surface-high)]"
                aria-expanded={changingPassword}
                aria-controls="change-password-form"
                >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#818CF8", flexShrink: 0 }}>
                    <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 10V7a4 4 0 018 0v3M12 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="flex-1">
                    <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>Password</p>
                    <p className="text-sm font-medium text-white">
                    {passwordChanged ? "Password changed successfully" : "Change your password"}
                    </p>
                </div>
                {passwordChanged ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#10B981" }} aria-hidden="true">
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "var(--app-text-muted)", transform: changingPassword ? "rotate(90deg)" : "none", transition: "transform 200ms" }}
                    aria-hidden="true"
                    >
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )}
            </button>

            {changingPassword && (
            <form
                id="change-password-form"
                onSubmit={handlePasswordChange}
                className="px-5 py-5 space-y-4"
                style={{ background: "var(--app-bg-alt)", borderTop: "1px solid var(--app-border)" }}
            >
                <div>
                <label htmlFor="current-password" className="block text-xs font-medium text-white mb-2">Current password</label>
                <input
                    id="current-password"
                    type="password"
                    autoComplete="current-password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[var(--app-text-muted)]"
                    style={{ background: "var(--app-input)", border: "1px solid var(--app-border)" }}
                    placeholder="Enter current password"
                />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="new-password" className="block text-xs font-medium text-white mb-2">New password</label>
                    <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[var(--app-text-muted)]"
                    style={{ background: "var(--app-input)", border: "1px solid var(--app-border)" }}
                    placeholder="At least 8 characters"
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block text-xs font-medium text-white mb-2">Confirm password</label>
                    <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[var(--app-text-muted)]"
                    style={{ background: "var(--app-input)", border: "1px solid var(--app-border)" }}
                    placeholder="Repeat new password"
                    />
                </div>
                </div>

                {passwordError && (
                <p className="text-xs" style={{ color: "#F87171" }} role="alert">{passwordError}</p>
                )}

                <div className="flex gap-3 pt-1">
                <button
                    type="button"
                    onClick={resetPasswordForm}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-[var(--app-border)]"
                    style={{ background: "var(--app-surface)", color: "#94A3B8", border: "1px solid var(--app-border)" }}
                >
                    Cancel
                </button>
                <button
                    disabled={isPending}
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
                >
                    {isPending ? "Update password" : "Updating"}
                </button>
                </div>
            </form>
            )}
        </>
    )
}