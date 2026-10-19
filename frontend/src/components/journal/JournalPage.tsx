// frontend/src/components/journal/JournalPage.tsx
"use client"

import { useMe } from "@/queries/auth/useMe"
import { TopBar } from "./TopBar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { QuickCard } from "./QuickCard";
import { StatsRow } from "./StatsRow";
import { useJournalEntries } from "@/queries/journals/useJournalEntries";
import { Entries } from "./Entries";

export function JournalPage() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const {data: user} = useMe({enabled: true});
    const journalEntries = useJournalEntries({enabled: !!user})
    const entries = journalEntries.data ?? []

    const query = search.trim().toLowerCase()

    const filteredEntries = entries.filter((e) => 
        e.content.trim().toLowerCase().includes(query) || e.title.trim().toLowerCase().includes(query)
    )

    const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());


    if (!user) {
        return null;
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
            {/* Top bar */}
            <TopBar user={user} onNewEntryClick={() => router.push("/new-entry")} />
            <div className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
                {/* Search bar */}
                <SearchBar search={search} setSearch={setSearch}/>
                {/* Quick writing card */}
                <QuickCard />
                {/* Stats row */}
                <StatsRow />
                {/* Entries */}
                <Entries title="Recent Entries" entries={sortedEntries} search={search} limit={3} showViewAll onViewAll={() => router.push("/journal/all")} isPending={journalEntries.isPending} isError={journalEntries.isError} errorMessage={journalEntries.error?.message ?? "Failed to load entries"} />
            </div>

        </div>
    )
}