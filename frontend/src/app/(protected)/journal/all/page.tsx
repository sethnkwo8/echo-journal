// frontend/src/app/(protected)/journal/all/page.tsx
import { AllEntriesPage } from "@/components/all-entries/AllEntriesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Entries",
    description: "Search and browse your full journal history—titles, entries, and reflections in one place.",
};

export default function Page() {
    return <AllEntriesPage />;
}