// frontend/src/app/(auth)/register/page.tsx
import { RegistrationPage } from "@/components/auth/register/RegistrationPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an Echo account to start capturing your thoughts and voice journals securely.",
};

export default function Page() {
    return (
        <RegistrationPage />
    )
}