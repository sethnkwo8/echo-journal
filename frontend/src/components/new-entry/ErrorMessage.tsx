// frontend/src/components/new-entry/ErrorMessage.tsx

export function ErrorMessage({message}: {message: string}) {
    return (
        <div
            role="alert"
            className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
            style={{
            background: "rgba(248, 113, 113, 0.08)",
            border: "1px solid rgba(248, 113, 113, 0.25)",
            color: "#F87171",
            }}
        >
            <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 mt-0.5"
            aria-hidden
            >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-xs leading-relaxed">{message}</p>
        </div>
    )
}