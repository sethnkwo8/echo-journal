// frontend/src/lib/api/auth.ts
import { LoginFormType, RegisterForm, Token, AuthUser, UserUpdate, UserChangePassword } from "@/types/auth";
import { parseApiError, type FastApiValidationError } from "./parseApiError";
import { authenticatedFetch } from "./authenticatedFetch";
import { SessionExpiredError } from "../auth/errors";

const apiURL = process.env.NEXT_PUBLIC_APP_URL

// POST fetch function to create a user
export async function registerUser(formData: RegisterForm) {

    const res = await fetch(`${apiURL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Registration failed")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Registration failed"))
    }

    return await res.json()
}

// POST fetch function to login a user
export async function loginUser(formData: LoginFormType) {
    const res = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Login failed")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Login failed"))
    }

    return await res.json()
}

// Fetch call to refresh access token
export async function refreshToken() {

    const res = await fetch(`${apiURL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Token refresh failed")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Token refresh failed"))
    }

    const tokenData: Token = await res.json();

    if (!tokenData.access_token?.trim()) throw new SessionExpiredError()

    return tokenData.access_token;
}

// Fetch function to get current user
export async function getMe() {

    const res = await authenticatedFetch(`${apiURL}/auth/me`, {
        method: "GET",
    })
    
    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to get user")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to get user"))
    }

    const user: AuthUser = await res.json()

    return user
}

// POST fetch call to logout user
export async function logoutUser() {
    const res = await fetch(`${apiURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to logout user")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to logout user"))
    }

    return await res.json()
}

// PATCH fetch call to update user data
export async function updateUserData(data: UserUpdate) {
    const res = await authenticatedFetch(`${apiURL}/auth/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to update user details")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to update user details"))
    }

    const user: AuthUser = await res.json()

    return user
}

// POST fetch call to change user password
export async function changeUserPassword(data:UserChangePassword) {
    const res = await authenticatedFetch(`${apiURL}/auth/change-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to change user password")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to change user password"))
    }

    const message = await res.json()
}