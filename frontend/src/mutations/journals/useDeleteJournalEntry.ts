// frontend/src/mutations/journals/useDeleteJournalEntry.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournalEntry } from "@/lib/api/journal";
import { journalEntryKeys } from "@/queries/journals/useJournalEntry";
import { journalEntriesQueryKey } from "@/queries/journals/useJournalEntries";

export function useDeleteJournalEntry(id: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, void>({
        mutationFn: () => deleteJournalEntry(id),

        onSuccess: async (_data) => {
            // Force refetch the list so the entry drops off the screen
            await queryClient.invalidateQueries({queryKey: journalEntriesQueryKey});
            // Completely wipe out individual detail cache for this specific ID
            queryClient.removeQueries({queryKey: journalEntryKeys.detail(id)})
        },

        onError: (error) => {
            console.error("Something went wrong", error.message)
        }
    });

    return mutation;
}