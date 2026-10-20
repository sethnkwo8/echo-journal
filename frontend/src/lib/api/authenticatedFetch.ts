// frontend/src/lib/api/authenticatedFetch.ts
import { clearAccessToken, getAccessToken, setAccessToken } from "../auth/session";
import { refreshToken } from "./auth";
import { isSessionExpiredError, SessionExpiredError } from "../auth/errors";

export async function authenticatedFetch(input: RequestInfo, init?: RequestInit):Promise<Response> {
    const headers = new Headers(init?.headers);
    const token = getAccessToken();
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    };

    let res = await fetch(input, {
        ...init,
        credentials: "include",
        headers
    }) ;

    if (res.status !== 401) return res;

    try {
        // Attempt to get a fresh access token
        const newAccessToken = await refreshToken();
        if (!newAccessToken?.trim()) {
            clearAccessToken();
            throw new SessionExpiredError();
        }
        setAccessToken(newAccessToken);
    
        // Update headers with the brand new token
        headers.set('Authorization', `Bearer ${newAccessToken}`);
    
        //  Retry the exact same request with the new token and return its response
        res = await fetch(input, {
          ...init,
          credentials: "include",
          headers
        });

        if (res.status === 401) {
            clearAccessToken();
            throw new SessionExpiredError();
        }
    
        return res;
    
      } catch (refreshError) {
        if (isSessionExpiredError(refreshError)) {
            clearAccessToken()
            throw refreshError
        }

        clearAccessToken();
        throw new SessionExpiredError();
      }
}