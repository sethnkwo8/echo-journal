// frontend/src/mutations/auth/useChangePassword.ts
import { useMutation } from "@tanstack/react-query";
import { UserChangePassword } from "@/types/auth";
import { changeUserPassword } from "@/lib/api/auth";

export function useChangePassword() {

    const mutation = useMutation<void, Error, UserChangePassword>({
        mutationFn: changeUserPassword,

        onError: (error: Error) => {
            console.error('Something went wrong:', error.message)
        }
    });

    return mutation;
}