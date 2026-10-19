// frontend/src/utils/getEntryCountForCurrentMonth.ts
import { JournalEntry } from "@/types/journal";

export function getEntryCountForCurrentMonth(entries: JournalEntry[]) {
    const date = new Date();

    // Get entries for the month
    const monthEntries = entries.filter((entry) => {
        const created = new Date(entry.created_at);
        return created.getMonth() === date.getMonth() && created.getFullYear() === date.getFullYear()
    }).length;

    return monthEntries;
}