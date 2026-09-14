// frontend/src/components/auth/login/LoginPage.tsx
import { LoginForm } from "./LoginForm";

export function LoginPage() {
    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12" 
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, #0B0F17 60%)" }}
        >
            <LoginForm />
        </div>

    )
}