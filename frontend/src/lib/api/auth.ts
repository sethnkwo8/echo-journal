// frontend/src/lib/api/auth.ts
import { RegisterForm } from "@/types/auth";

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
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed")
    }

    return await res.json()
}