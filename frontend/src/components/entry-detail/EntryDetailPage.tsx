// frontend/src/components/entry-detail/EntryDetailPage.tsx
"use client"

import { useParams } from "next/navigation"
import { useJournalEntry } from "@/queries/journals/useJournalEntry"
import { ErrorMessage } from "../new-entry/ErrorMessage";
import { EntryDetailSkeleton } from "../loading/EntryDetailSkeleton";
import { EntryDetailContent } from "./EntryDetailContent";

export function EntryDetailPage() {
    const params = useParams();

    const entryId = params.id as string

    const journalEntry = useJournalEntry(entryId, {enabled: Boolean(entryId)})

    if (journalEntry.isError) {
      return (
        <div className="px-5 py-6 max-w-2xl mx-auto">
          <ErrorMessage message={journalEntry.error?.message ?? "Failed to load entry"} />
        </div>
      );
    }

    if (journalEntry.isPending) {
      return <EntryDetailSkeleton />
    }

    return (
        <EntryDetailContent entry={journalEntry.data}/>
    );
}