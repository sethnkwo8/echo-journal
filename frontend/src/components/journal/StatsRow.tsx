// frontend/src/components/journal/StatsRow.tsx
import { JournalEntry } from "@/types/journal";
import { getWordCountValue } from "@/utils/getWordCount";
import { getEntryCountForCurrentMonth } from "@/utils/getEntryCountForCurrentMonth";
import { getUserStreak } from "@/utils/getUserStreak";

export function StatsRow({entries}: {entries: JournalEntry[]}) {  
  const streak = getUserStreak(entries);
  
  return (
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Entries", value: getEntryCountForCurrentMonth(entries), sub: "this month" },
          { label: "Streak", value: streak, sub: "days" },
          { label: "Words", value: getWordCountValue(entries), sub: "written" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl p-4 text-center"
            style={{ background: "#1E2638", border: "1px solid #2A354D" }}>
            <p className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{stat.value}</p>
            <p className="text-xs font-medium text-white mt-0.5">{stat.label}</p>
            <p className="text-xs mt-0.5" style={{ color: "#4B5B73" }}>{stat.sub}</p>
          </div>
        ))}
      </div>
  )
}