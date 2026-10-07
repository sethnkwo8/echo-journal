// frontend/src/mutations/auth/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginUser } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { setAccessToken } from "@/lib/auth/session";
import { meQueryKey } from "@/queries/auth/useMe";

export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,

        // Redirect to dashboard on success
        onSuccess: async (data: {access_token: string; token_type?: string}) => {
            setAccessToken(data.access_token);
            await queryClient.invalidateQueries({ queryKey: meQueryKey }); // to refetch user on login with new token so previous stale data removes
            router.replace("/journal");
        },
        onError: (error) => {
            console.error('Something went wrong:', error.message)
        }
    })

    return mutation
}