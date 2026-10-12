// frontend/src/mutations/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/lib/api/auth";
import { clearAccessToken } from "@/lib/auth/session";
import { useRouter } from "next/navigation";
import { meQueryKey } from "@/queries/auth/useMe";
import { journalEntriesQueryKey } from "@/queries/journals/useJournalEntries";
import { journalEntryKeys } from "@/queries/journals/useJournalEntry";

export function useLogout(){
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: logoutUser,

        onSettled() {
            clearAccessToken();
            queryClient.removeQueries({queryKey: meQueryKey});
            queryClient.removeQueries({queryKey: journalEntriesQueryKey});
            queryClient.removeQueries({queryKey: journalEntryKeys.all});
            router.replace("/login");
        },

        onError: (error) => {
            console.error('Something went wrong:', error.message)
        }
    })

    return mutation
}