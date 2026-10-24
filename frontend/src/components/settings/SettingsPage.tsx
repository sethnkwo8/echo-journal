// frontend/src/components/settings/SettingsPage.tsx
"use client"

import { Account } from "./Account"
import { Appearance } from "./Appearance"
import { LogoutButton } from "./LogoutButton"
import { PrivacyAndSecurity } from "./PrivacyAndSecurity"
import { SettingsHeader } from "./SettingsHeader"
import { useDeleteJournalEntries } from "@/mutations/journals/useDeleteJournalEntries"
import { useRouter } from "next/navigation"

export function SettingsPage() {
    const deleteMutation = useDeleteJournalEntries();
    const router = useRouter()

    function handleDelete() {
        const ok = window.confirm("Delete all entries? This can't be undone.");
        if (!ok) return;

        deleteMutation.reset();

        deleteMutation.mutate(undefined, {
            onSuccess: () => router.push("/journal"),
        });
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            <SettingsHeader />
            <div className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
                <PrivacyAndSecurity 
                    handleDelete={handleDelete} 
                    isPending={deleteMutation.isPending} 
                    deleteError={
                        deleteMutation.isError
                        ? (deleteMutation.error?.message ?? "Couldn't delete all entries. Please try again.")
                        : null
                    }
                />
                <Appearance />
                <Account />
                <LogoutButton />
            </div>
        </div>
    )
}