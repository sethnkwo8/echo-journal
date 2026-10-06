// frontend/src/app/(protected)/dashboard
import type { Metadata } from "next";
import { JournalPage } from "@/components/journal/JournalPage";

export const metadata: Metadata = {
  title: "Journal",
  description: "Browse your past voice entries and revisit daily reflections.",
};

export default function Page() {
  return (
    <JournalPage />
  )
}