// frontend/src/components/new-entry/Feeling.tsx
import { FeelingName } from "@/types/journal"
import { FEELING_COLORS, FEELING_GROUPS, formatFeelingLabel } from "@/lib/feelingColors"

const MAX_FEELINGS = 3;
interface FeelingProps {
  selected: FeelingName[];
  onChange: (next: FeelingName[]) => void;
}
export function Feeling({ selected, onChange }: FeelingProps) {
  function toggle(feeling: FeelingName) {
    if (selected.includes(feeling)) {
      onChange(selected.filter((f) => f !== feeling));
      return;
    }
    if (selected.length >= MAX_FEELINGS) return;
    onChange([...selected, feeling]);
  }
  return (

    <div>
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <p className="text-xs font-semibold text-white">How are you feeling?</p>
            <p className="text-xs tabular-nums shrink-0" style={{ color: "var(--app-text-muted)" }}>
                {selected.length}/{MAX_FEELINGS}
            </p>
          </div>
          <div className="space-y-4 rounded-2xl p-4" style={{ background: "var(--app-bg-alt)", border: "1px solid var(--app-border)" }}>
            {FEELING_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--app-text-muted)" }}>{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.feelings.map((feeling) => {
                    const isSelected = selected.includes(feeling);
                    const color = FEELING_COLORS[feeling];
                    const atMax = selected.length >= MAX_FEELINGS && !isSelected;

                    return (
                      <button
                        key={feeling}
                        type="button"
                        aria-pressed={isSelected}
                        disabled={atMax}
                        onClick={() => toggle(feeling)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background: isSelected ? `${color}20` : "var(--app-surface)",
                          color: isSelected ? color : "#94A3B8",
                          border: isSelected ? `1px solid ${color}55` : "1px solid var(--app-border)",
                          boxShadow: isSelected? `0 0 14px ${color}18` : "none",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
                        {formatFeelingLabel(feeling)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}