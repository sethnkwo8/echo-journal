// frontend/src/mutations/journals/useCreateJournalEntry.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJournalEntry } from "@/lib/api/journal";
import { journalEntriesQueryKey } from "@/queries/journals/useJournalEntries";
import { useRouter } from "next/navigation";
import { JournalEntry, JournalEntryForm } from "@/types/journal";

export function useCreateJournalEntry() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation<JournalEntry, Error, JournalEntryForm>({
        mutationFn: createJournalEntry,

        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: journalEntriesQueryKey}); // refetch journal entries list
            router.replace('/journal')
        },

        onError: (error: Error) => {
            console.error('Something went wrong:', error.message)
        }
    })

    return mutation;
}