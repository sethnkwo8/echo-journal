// frontend/src/components/auth/AuthGuard.tsx
"use client"

import { refreshToken } from "@/lib/api/auth";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/lib/auth/session";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/queries/auth/useMe";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [sessionReady, setSessionReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        async function bootstrap() {
            try {
                if (getAccessToken() === null) {
                    const accessToken = await refreshToken();
                    if (cancelled) return;
                    setAccessToken(accessToken);
                }

                if (getAccessToken()) {
                    setSessionReady(true);
                } else {
                    clearAccessToken();
                    router.replace("/login");
                }
            } catch {
                if (cancelled) return;
                clearAccessToken();
                router.replace("/login");
            }
        }

        bootstrap();

        return () => {
            cancelled = true;
        };
    }, [router]);

    const { isPending, isError, isSuccess } = useMe({ enabled: sessionReady });

    useEffect(() => {
        if (isError) {
            clearAccessToken();
            router.replace("/login");
        }
    }, [isError, router]);

    if (!sessionReady || isPending || isError) {
        return (
            <div
                className="flex min-h-screen items-center justify-center"
                style={{ background: "#0B0F17" }}
            >
                <p className="text-sm" style={{ color: "#94A3B8" }}>
                    Loading...
                </p>
            </div>
        );
    }

    if (!isSuccess) {
        return null;
    }

    return <>{children}</>;
}