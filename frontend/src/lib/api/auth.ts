// frontend/src/lib/api/auth.ts
import { RegisterForm } from "@/types/auth";
import { parseApiError, type FastApiValidationError } from "./parseApiError";

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