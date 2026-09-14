// frontend/src/app/(auth)/login/page.tsx
import { LoginPage } from "@/components/auth/login/LoginPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Echo account to access your private voice journals and daily entries.",
};

export default function Page() {
    return (
        <LoginPage />
    )
}