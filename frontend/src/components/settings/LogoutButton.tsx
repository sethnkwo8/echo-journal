// frontend/src/components/settings/LogoutButton.tsx

interface LogoutButtonProps {
    showLogoutConfirm: boolean;
    setShowLogoutConfirm(value: boolean): void;
    onLogout(): void;
    isLoggingOut: boolean;
}

export function LogoutButton({showLogoutConfirm, setShowLogoutConfirm, onLogout, isLoggingOut}: LogoutButtonProps) {
    return (
        <div className="pt-2">
          {!showLogoutConfirm ? (
            <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-[#EF4444] border border-red-500/20 bg-red-500/[0.08] transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/45 active:scale-[0.99]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Log Out
            </button>
          ) : (
            <div className="rounded-2xl p-5" style={{ background: "var(--app-surface)", border: "1px solid rgba(239,68,68,0.3)" }}>
              <p className="text-sm font-semibold text-white mb-1">Log out of Echo?</p>
              <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>
                Your journal stays on your account. You can sign back in anytime.
              </p>
              <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] border border-[var(--app-border)] bg-[var(--app-surface-high)] transition-colors hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={onLogout}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#EF4444] border border-red-500/30 bg-red-500/15 transition-colors hover:bg-red-500/25 disabled:opacity-50 disabled:hover:bg-red-500/15"
                >
                  {isLoggingOut ? "Logging out..." : "Log Out"}
                </button>
              </div>
            </div>
          )}
        </div>
    );
}