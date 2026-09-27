// frontend/src/lib/auth/session.ts
let clientAccessToken: string | null = null;

export function setAccessToken(token: string) {
    clientAccessToken = token;
};

export function getAccessToken() {
    return clientAccessToken;
};

export function clearAccessToken() {
    clientAccessToken = null;
}