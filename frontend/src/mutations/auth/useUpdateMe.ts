// frontend/src/mutations/auth/useUpdateMe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthUser, UserUpdate } from "@/types/auth";
import { updateUserData } from "@/lib/api/auth";
import { meQueryKey } from "@/queries/auth/useMe";

export function useUpdateMe() {
    const queryClient = useQueryClient();

    const mutation = useMutation<AuthUser,Error,UserUpdate>({
        mutationFn: updateUserData,

        onSuccess: (data) => {
            queryClient.setQueryData(meQueryKey, data)
        },

        onError: (error: Error) => {
            console.error('Something went wrong:', error.message)
        }
    });

    return mutation;
}