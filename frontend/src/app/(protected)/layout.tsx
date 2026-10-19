// frontend/src/app/(protected)/layout.tsx
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="min-h-screen" style={{ background: "#0B0F17" }}>
                <Sidebar />
                <BottomNav />
                <main className="flex flex-col md:ml-60 min-w-0 min-h-screen">
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}