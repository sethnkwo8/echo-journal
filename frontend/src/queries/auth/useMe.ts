// frontend/src/queries/auth/useMe.ts
import { getMe } from "@/lib/api/auth";
import { AuthUser } from "@/types/auth";
import {useQuery} from "@tanstack/react-query";

export const meQueryKey = ['me'] as const
export function useMe(options?: { enabled?: boolean }) {

    return useQuery<AuthUser>({
        queryKey: meQueryKey,
        queryFn: getMe,
        retry: false,
        enabled: options?.enabled ?? false,
        staleTime: 5 * 60 * 1000
    })

}