// frontend/src/app/(protected)/profile/page.tsx
import { NewEntryPage } from "@/components/new-entry/NewEntryPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Entry",
    description: "Record a new voice journal entry and capture today's thoughts.",
  };

export default function NewRecord() {
    return (
        <NewEntryPage />
    )
}