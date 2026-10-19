// frontend/src/utils/getUserStreak.ts
import { JournalEntry } from "@/types/journal";
import { getLocaleDateKey } from "./toLocalDateKey";

export function getUserStreak(entries: JournalEntry[]) {
    // Set for streaks
  const streakSet = new Set<string>();

  const date = new Date();
  const todayLocaleDateKey = getLocaleDateKey(date.toISOString());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayLocaleDateKey = getLocaleDateKey(yesterday.toISOString());

  for (const entry of entries) {
    const key = getLocaleDateKey(entry.created_at);
    streakSet.add(key);
  };

  const startDate = streakSet.has(todayLocaleDateKey) ? todayLocaleDateKey : streakSet.has(yesterdayLocaleDateKey) ? yesterdayLocaleDateKey : 0;

  let streakCount = 0;

  if (startDate !== 0) {
    // Tracking date object
    const currentCheckDate = startDate === todayLocaleDateKey ? new Date() : yesterday;

    while (true) {
      // Generate the key for the day we are currently checking
      const checkKey = getLocaleDateKey(currentCheckDate.toISOString());
      
      // If the user did an activity on this day, increment the streak
      if (streakSet.has(checkKey)) {
        streakCount++;
        // Move the date object back by exactly 1 day
        currentCheckDate.setDate(currentCheckDate.getDate() - 1);
      } else {
        // The moment a day is missing from the Set, the streak chain breaks
        break;
      }
    }
  }

  return streakCount
}