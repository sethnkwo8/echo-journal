// frontend/src/components/entry-detail/EntryDetailContent.tsx
"use client"

import { JournalEntry } from "@/types/journal"
import { formatJournalEntryDate } from "@/utils/formatJournalEntryDate";
import { TopBar } from "./TopBar";
import { useEffect, useState } from "react";
import { useUpdateJournalEntry } from "@/mutations/journals/useUpdateJournalEntry";
import { Content } from "../new-entry/Content";
import { AudioPlayer } from "./AudioPlayer";
import { Tags } from "./Tags";
import { AiInsights } from "./AiInsights";
import { ErrorMessage } from "../new-entry/ErrorMessage";
import { useDeleteJournalEntry } from "@/mutations/journals/useDeleteJournalEntry";
import { useRouter } from "next/navigation";

interface EntryDetailContentProps {
    entry: JournalEntry;
    onBack(): void
}

export function EntryDetailContent({entry, onBack}: EntryDetailContentProps) {
    const router = useRouter();
    const mutation = useUpdateJournalEntry(entry.id);
    const deleteMutation = useDeleteJournalEntry(entry.id)
    const [title, setTitle] = useState<string>(entry.title);
    const [content, setContent] = useState<string>(entry.content);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (mutation.isError) mutation.reset();
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        if (name === "content") setContent(value);
    }

    function handleSave() {
        const payloadData = {
            title: title.trim(),
            content: content.trim()
        }
        mutation.mutate(payloadData);
    }

    function handleDelete() {
        const ok = window.confirm("Delete this entry? This can't be undone.");
        if (!ok) return;
        
        if (deleteMutation.isError) deleteMutation.reset()

        deleteMutation.mutate(undefined, {
            onSuccess: () => router.push("/journal"),
        });
    }

    const valid = title.trim().length >= 3 && content.trim().length >= 3; 
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const changed =
        trimmedTitle !== entry.title.trim() ||
        trimmedContent !== entry.content.trim();

    const canSave = valid && changed

    useEffect(() => {
        if (deleteMutation.isPending) return;

        if (!valid || !changed) return;

        const id = window.setTimeout(() => {
            handleSave();
        }, 600);

        return () => clearTimeout(id);
    }, [title, content, entry.title, entry.content])

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
          {/* Top bar */}
          <TopBar onBack={onBack} title={title} onChange={handleChange} handleSave={handleSave} handleDelete={handleDelete} saved={mutation.isSuccess && !changed} isSaving={mutation.isPending} canSave={canSave} deleteDisabled={mutation.isPending || deleteMutation.isPending}/>
    
          <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
            {mutation.isError && (
                <ErrorMessage message={mutation.error.message}/>
            )}
            {deleteMutation.isError && (
                <ErrorMessage message={deleteMutation.error.message}/>
            )}
            {/* Date */}
            <p className="text-sm" style={{ color: "#4B5B73" }}>{formatJournalEntryDate(entry.created_at)}</p>
    
            {/* Audio Player */}
            <AudioPlayer />

            {/* Tags */}
            <Tags />

            {/* Transcript */}
            <Content headerText="Transcript" content={content} onChange={handleChange}/>
    
            {/* AI Insights */}
            <AiInsights />
          </div>
        </div>
    )
}