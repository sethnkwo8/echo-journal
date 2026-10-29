// frontend/src/components/new-entry/NewEntryPage.tsx
"use client"

import { TopBar } from "./TopBar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { JournalEntryForm } from "@/types/journal";
import { useCreateJournalEntry } from "@/mutations/journals/useCreateJournalEntry";
import { Title } from "./Title";
import { PrivacyNote } from "./PrivacyNote";
import { Content } from "./Content";
import { ErrorMessage } from "./ErrorMessage";
import { Feeling } from "./Feeling";
import { Tags } from "./Tags";

export function NewEntryPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<JournalEntryForm>({
        title: "",
        content: "",
        feeling: [],
        tags: []
    });
    const [tagInput, setTagInput] = useState<string>("");
    const [tagError, setTagError] = useState<string>("");

    const addTag = () => {
        setTagError("")
        const tags = formData.tags ?? []
        if (tags.length >= 4) {
            setTagError("You can add up to 4 tags per entry")
            return
        };
        const t = tagInput.trim().toLowerCase().replace(/^#/, "");
        if (!t) {
            setTagError("Tag cannot be empty")
            return
        }
        if (t.length > 15) {
            setTagError("Tag length cannot exceed 15 characters")
            return
        };
        if (tags.includes(t)) {
            setTagError("Tag already added")
            return
        }

        if (mutation.isError) mutation.reset();
        setFormData((prev) => ({ ...prev, tags: [...(prev.tags ?? []), t] }))
        setTagInput("");
    }

    function handleTagInputChange(value: string) {
        setTagInput(value);
        if (tagError) setTagError("");
    }

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
            content: formData.content.trim(),
            feeling: formData.feeling ?? [],
            tags: formData.tags ?? []
        }
        mutation.mutate(payloadData);
    }

    useEffect(() => {

        function getDraft() {
            const storedDraft = sessionStorage.getItem("contentDraft");
            if (storedDraft) {
                setFormData((prev) => ({
                    ...prev,
                    content: storedDraft
                }))
            }

            sessionStorage.removeItem("contentDraft");
        }

        getDraft();
    }, [])

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            {/* TopBar */}
            <TopBar onBack={() => router.push("/journal")} handleSave={handleSave} saved={mutation.isSuccess} isSaving={mutation.isPending} canSave={canSave}/>
            <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
                {/* Save error */}
                {mutation.isError && (
                    <ErrorMessage message={mutation.error.message}/>
                )}
                {/* Title */}
                <Title title={formData.title} onChange={handleChange}/>
                {/* Content */}
                <Content headerText="Journal entry" content={formData.content} onChange={handleChange}/>
                {/* Feelings */}
                <Feeling
                    selected={formData.feeling ?? []}
                    onChange={(feeling) => {
                        if (mutation.isError) mutation.reset();
                        setFormData((prev) => ({ ...prev, feeling }));
                    }}
                />
                {/* Tags */}
                <Tags 
                    tags={formData.tags ?? []} 
                    tagInput={tagInput} 
                    onTagInputChange={handleTagInputChange} 
                    onTagsChange={(tags) => {
                        setTagError("")
                        if (mutation.isError) mutation.reset();
                        setFormData((prev) => ({ ...prev, tags }));
                    }} 
                    addTag={addTag}
                    tagError={tagError}
                />
                {/* Privacy Note */}
                <PrivacyNote />
            </div>
        </div>
    )
}