// frontend/src/mutations/journals/useUpdateJournalEntry.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJournalEntry } from "@/lib/api/journal";
import { JournalEntry, JournalEntryUpdateForm } from "@/types/journal";
import { journalEntriesQueryKey } from "@/queries/journals/useJournalEntries";
import { journalEntryKeys } from "@/queries/journals/useJournalEntry";

export function useUpdateJournalEntry(id: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation<JournalEntry, Error, JournalEntryUpdateForm>({
        mutationFn: (formData) => updateJournalEntry(id, formData),

        onSuccess: async (data) => {
            // Refetch entries list
            await queryClient.invalidateQueries({queryKey: journalEntriesQueryKey})
            // Set query data for entry
            queryClient.setQueryData<JournalEntry>(journalEntryKeys.detail(id), data)
        },

        onError: (error) => {
            console.error("Something went wrong", error.message)
        }
    });

    return mutation;
}