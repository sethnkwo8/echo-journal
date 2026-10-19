// frontend/src/lib/auth/session.ts
let clientAccessToken: string | null = null;

const STORAGE_KEY = "echo_access_token";

function readStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

function writeStoredToken(token: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, token);
}

function removeStoredToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function setAccessToken(token: string) {
    if (!token) return
    clientAccessToken = token;
    writeStoredToken(token);
};

export function getAccessToken(): string | null {
    if (clientAccessToken) return clientAccessToken;
    const stored = readStoredToken();
    if (stored) clientAccessToken = stored; // optional: sync memory from storage
    return stored;
}

export function clearAccessToken() {
    clientAccessToken = null;
    removeStoredToken();
}