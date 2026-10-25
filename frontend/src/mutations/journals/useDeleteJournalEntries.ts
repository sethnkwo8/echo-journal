// frontend/src/mutations/journals/useDeleteJournalEntries.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJournalEntries } from "@/lib/api/journal";
import { journalEntriesQueryKey } from "@/queries/journals/useJournalEntries";
import { journalEntryKeys } from "@/queries/journals/useJournalEntry";

export function useDeleteJournalEntries() {
    const queryClient = useQueryClient();

    const mutation = useMutation<string, Error, void>({
        mutationFn: deleteJournalEntries,

        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: journalEntriesQueryKey});
            
            queryClient.removeQueries({queryKey: journalEntryKeys.all});
        },

        onError: (error) => {
            console.error("Something went wrong", error.message)
        }
    })

    return mutation;
}