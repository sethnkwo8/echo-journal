// frontend/src/components/profile/AccountInfo.tsx

interface AccountInfoProps {
    email: string;
    date: string;
}

export function AccountInfo({email, date}: AccountInfoProps) {
    return (
      <>
        <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#818CF8", flexShrink: 0 }}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>Email</p>
            <p className="text-sm font-medium text-white truncate">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: "#818CF8", flexShrink: 0 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="flex-1">
            <p className="text-xs" style={{ color: "var(--app-text-muted)" }}>Member since</p>
            <p className="text-sm font-medium text-white">{date}</p>
          </div>
        </div>
      </>
    )
}