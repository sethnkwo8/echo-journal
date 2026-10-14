// frontend/src/components/new-entry/NewEntryPage.tsx
"use client"

import { TopBar } from "./TopBar"
import { useRouter } from "next/navigation"
import { useState } from "react";
import { JournalEntryForm } from "@/types/journal";
import { useCreateJournalEntry } from "@/mutations/journals/useCreateJournalEntry";
import { Title } from "./Title";
import { PrivacyNote } from "./PrivacyNote";
import { Content } from "./Content";
import { ErrorMessage } from "./ErrorMessage";

export function NewEntryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<JournalEntryForm>({
        title: "",
        content: ""
    });
    const mutation = useCreateJournalEntry();

    const canSave = formData.title.trim().length >= 3 && formData.content.trim().length >= 3;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (mutation.isError) mutation.reset();
        
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value // matches input name
        }))
    }

    function handleSave() {
        const payloadData = {
            title: formData.title.trim(),
            content: formData.content.trim()
        }
        mutation.mutate(payloadData);
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            {/* TopBar */}
            <TopBar onBack={() => router.back()} handleSave={handleSave} saved={mutation.isSuccess} isSaving={mutation.isPending} canSave={canSave}/>
            <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
                {/* Save error */}
                {mutation.isError && (
                    <ErrorMessage message={mutation.error.message}/>
                )}
                {/* Title */}
                <Title title={formData.title} onChange={handleChange}/>
                {/* Content */}
                <Content content={formData.content} onChange={handleChange}/>
                {/* TODO: Moods and Tags */}
                {/* Privacy Note */}
                <PrivacyNote />
            </div>
        </div>
    )
}