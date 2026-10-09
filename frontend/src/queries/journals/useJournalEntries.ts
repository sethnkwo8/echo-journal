// frontend/src/queries/journals/useJournalEntries.ts
import { getJournalEntries } from "@/lib/api/journal";
import { JournalEntry } from "@/types/journal";
import { useQuery } from "@tanstack/react-query";

// Query for getting all user journal entries
export const journalEntriesQueryKey = ['journal_entries'] as const;
export function useJournalEntries(options?: { enabled?: boolean }) {
    return useQuery<JournalEntry[]>({
        queryKey: journalEntriesQueryKey,
        queryFn: getJournalEntries,
        enabled: options?.enabled ?? false,
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}