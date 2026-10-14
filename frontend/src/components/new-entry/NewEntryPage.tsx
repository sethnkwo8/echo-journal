// frontend/src/components/new-entry/NewEntryPage.tsx
"use client"

import { TopBar } from "./TopBar"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { JournalEntryForm } from "@/types/journal";
import { useCreateJournalEntry } from "@/mutations/journals/useCreateJournalEntry";

export function NewEntryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<JournalEntryForm>({
        title: "",
        content: ""
    });
    const mutation = useCreateJournalEntry();

    const canSave = formData.title.trim().length >= 3 && formData.content.trim().length >= 3;

    function handleSave() {
        const payloadData = {
            title: formData.title.trim(),
            content: formData.content.trim()
        }
        mutation.mutate(payloadData);
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            <TopBar onBack={() => router.back()} handleSave={handleSave} saved={mutation.isSuccess} isSaving={mutation.isPending} canSave={canSave}/>
        </div>
    )
}