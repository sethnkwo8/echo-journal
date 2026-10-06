// frontend/src/mutations/auth/useRegister.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export function useRegister() {
    const queryClient = useQueryClient();
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: registerUser,

        // Redirect to login page on success
        onSuccess: () => {
            router.push("/login");
        },
        onError: (error) => {
            console.error('Something went wrong:', error.message)
        }

    })

    return mutation
}

