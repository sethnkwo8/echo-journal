// frontend/src/components/providers/query-provider.tsx
"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Providers({children}: {children: React.ReactNode}) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
            staleTime: 60 * 1000, // 1 minute default stale time
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools */}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}