"use client"

import { getMe } from "@/lib/api/auth";
import { clearAccessToken } from "@/lib/auth/session";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/queries/auth/useMe";
import { isSessionExpiredError } from "@/lib/auth/errors";

function SessionRetryScreen({
  message,
  onRetry,
  isRetrying,
}: {
  message: string;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-4 px-6"
      style={{ background: "var(--app-bg)" }}
    >
      <p className="text-sm text-center max-w-sm" style={{ color: "#94A3B8" }}>
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        disabled={isRetrying}
        className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
      >
        {isRetrying ? "Retrying…" : "Try again"}
      </button>
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [sessionReady, setSessionReady] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [bootstrapError, setBootstrapError] = useState<string | null>(null);
  const router = useRouter();

  const runBootstrap = useCallback(async () => {
    setBootstrapping(true);
    setBootstrapError(null);
    try {
      await getMe();
      setSessionReady(true);
    } catch (e) {
      if (isSessionExpiredError(e)) {
        clearAccessToken();
        router.replace("/login");
        return;
      }
      setBootstrapError(
        e instanceof Error ? e.message : "Couldn't verify your session."
      );
    } finally {
      setBootstrapping(false);
    }
  }, [router]);

  useEffect(() => {
    runBootstrap();
  }, [runBootstrap]);

  const { isPending, isError, isSuccess, error, refetch, isFetching } = useMe({
    enabled: sessionReady,
  });

  useEffect(() => {
    if (isError && isSessionExpiredError(error)) {
      clearAccessToken();
      router.replace("/login");
    }
  }, [isError, error, router]);

  if (bootstrapping) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--app-bg)" }}
      >
        <p className="text-sm" style={{ color: "#94A3B8" }}>Loading...</p>
      </div>
    );
  }

  if (bootstrapError) {
    return (
      <SessionRetryScreen
        message={bootstrapError}
        onRetry={runBootstrap}
        isRetrying={bootstrapping}
      />
    );
  }

  if (!sessionReady) {
    return null;
  }

  if (isPending && !isFetching) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--app-bg)" }}
      >
        <p className="text-sm" style={{ color: "#94A3B8" }}>Loading...</p>
      </div>
    );
  }

  if (isError && !isSessionExpiredError(error)) {
    return (
      <SessionRetryScreen
        message={error?.message ?? "Couldn't load your account."}
        onRetry={() => refetch()}
        isRetrying={isFetching}
      />
    );
  }

  if (isError && isSessionExpiredError(error)) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "var(--app-bg)" }}
      >
        <p className="text-sm" style={{ color: "#94A3B8" }}>Loading...</p>
      </div>
    );
  }

  if (!isSuccess) {
    return null;
  }

  return <>{children}</>;
}