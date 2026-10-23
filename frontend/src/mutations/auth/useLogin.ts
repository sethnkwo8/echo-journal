// frontend/src/mutations/auth/useLogin.ts
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { setAccessToken } from "@/lib/auth/session";

export function useLogin() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginUser,

        // Redirect to dashboard on success
        onSuccess: async (data: {access_token: string; token_type?: string}) => {
            if (!data?.access_token) return;

            setAccessToken(data.access_token);

            router.replace("/journal");
        },
        onError: (error) => {
            console.error('Something went wrong:', error.message)
        }
    })

    return mutation
}