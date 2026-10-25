// frontend/src/components/entry-detail/AudioPlayer.tsx

export function AudioPlayer() {
    return (
        <div className="rounded-2xl p-5" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}>
            <div className="flex items-center justify-between mb-5">
                {/* <WaveformBars active={playing} bars={24} /> */}
                <div className="flex items-center gap-2 ml-4">
                    {([1, 1.5, 2] as const).map((s) => (
                    <button
                        key={s}
                        // onClick={() => setSpeed(s)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                        style={{
                        // background: speed === s ? "rgba(99,102,241,0.2)" : "transparent",
                        // color: speed === s ? "#818CF8" : "var(--app-text-muted)",
                        // border: speed === s ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                        }}
                    >
                        {s}x
                    </button>
                    ))}
                </div>
            </div>
            
            {/* Progress bar */}
            <div
                className="w-full h-1.5 rounded-full mb-3 cursor-pointer"
                style={{ background: "var(--app-bg)" }}
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    // setProgress(((e.clientX - rect.left) / rect.width) * 100);
                }}
            >
                <div
                    className="h-full rounded-full relative transition-all"
                    style={{
                    // width: `${progress}%`,
                    background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                    }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                {/* <span className="text-xs tabular-nums" style={{ color: "#94A3B8" }}>{formatTime(elapsed)}</span> */}
                <button
                    // onClick={togglePlay}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{
                    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                    boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
                    }}
                >
                    {/* {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
                        <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
                    </svg>
                    ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7-11-7z" fill="white" />
                    </svg>
                    )} */}
                </button>
                {/* <span className="text-xs tabular-nums" style={{ color: "#94A3B8" }}>-{formatTime(totalSeconds - elapsed)}</span> */}
            </div>
        </div>
    )
}