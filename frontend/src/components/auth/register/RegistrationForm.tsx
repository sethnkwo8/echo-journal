// frontend/src/components/auth/register/RegistrationForm.tsx

// TODO password validator

"use client"

import Link from "next/link"
import { useState } from "react"
import { RegisterForm } from "@/types/auth"
import { useRegister } from "@/mutations/auth/useRegister"

export function RegistrationForm() {
    const mutation = useRegister();

    const [formData, setFormData] = useState<RegisterForm>({
        name: "",
        email: "",
        password: ""
    });

    // Function to store input changes
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value // matches input name
        }))
    }

    // Function to handle submit
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        mutation.mutate(formData)
    }

    return (
        <>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-12">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
                    <path d="M5 10a7 7 0 0014 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 19v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                </div>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Echo</span>
            </div>
            <div
                className="w-full max-w-sm rounded-2xl p-8 animate-fade-in-up"
                style={{ background: "#1E2638", border: "1px solid #2A354D", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
            >
                <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Start your journey
                </h1>
                <p className="text-sm mb-8" style={{ color: "#94A3B8" }}>
                    Create your secure journaling space
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Full Name</label>
                    <input
                        disabled={mutation.isPending}
                        required
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted transition-all duration-200"
                        style={{
                        background: "#0B0F17",
                        border: "1px solid #2A354D",
                        outline: "none",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                        onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
                    />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Email</label>
                        <input
                        disabled={mutation.isPending}
                        required
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted transition-all duration-200"
                        style={{ background: "#0B0F17", border: "1px solid #2A354D" }}
                        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                        onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Password</label>
                        <input
                        disabled={mutation.isPending}
                        required
                        type="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted transition-all duration-200"
                        style={{ background: "#0B0F17", border: "1px solid #2A354D" }}
                        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
                        onBlur={(e) => (e.target.style.borderColor = "#2A354D")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-2"
                        style={{
                        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                        }}
                    >
                        {mutation.isPending ? 'Creating account...' : 'Create Account'}
                    </button>
                    {mutation.isError && <p style={{ color: 'red' }}>Error: {mutation.error.message}</p>}
                    {mutation.isSuccess && <p style={{ color: 'green' }}>Registration successful!</p>}
                </form>

                <div
                    className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L3 7v7c0 4.5 3.8 8.7 9 10 5.2-1.3 9-5.5 9-10V7L12 2z" stroke="#10B981" strokeWidth="2" fill="none" />
                        <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs font-medium" style={{ color: "#10B981" }}>256-bit encrypted &amp; private</span>
                </div>

                <p className="text-center text-xs mt-5" style={{ color: "#4B5B73" }}>
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium transition-colors hover:opacity-80" style={{ color: "#818CF8" }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    )
}