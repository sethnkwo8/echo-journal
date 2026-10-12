// frontend/src/queries/journals/useJournalEntry.ts
import { useQuery } from "@tanstack/react-query";
import { getJournalEntry } from "@/lib/api/journal";
import { JournalEntry } from "@/types/journal";

export const journalEntryKeys = {
    all: ['journal_entry'] as const,
    detail: (id: string) => ['journal_entry', id] as const,
}

export function useJournalEntry(id: string, options?: { enabled?: boolean }) {
    return useQuery<JournalEntry>({
        queryKey: journalEntryKeys.detail(id),
        queryFn: () => getJournalEntry(id),
        enabled: (Boolean(id) && options?.enabled) ?? false,
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}