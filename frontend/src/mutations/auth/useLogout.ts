// frontend/src/mutations/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "@/lib/api/auth";
import { clearAccessToken } from "@/lib/auth/session";
import { useRouter } from "next/navigation";
import { meQueryKey } from "@/queries/auth/useMe";

export function useLogout(){
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: logoutUser,

        onSettled() {
            clearAccessToken();
            queryClient.removeQueries({queryKey: meQueryKey});
            router.replace("/login");
        },

        onError: (error) => {
            console.error('Something went wrong:', error.message)
        }
    })

    return mutation
}