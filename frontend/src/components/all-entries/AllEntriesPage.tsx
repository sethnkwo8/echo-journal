// frontend/src/components/all-entries/AllEntriesPage.tsx
"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TopBar } from "./TopBar";
import { useJournalEntries } from "@/queries/journals/useJournalEntries";
import { useMe } from "@/queries/auth/useMe";
import { SearchBar } from "./SearchBar";
import { Entries } from "./Entries";
import { isoToMonthYear } from "@/utils/isoToMonthYear";

export function AllEntriesPage() {
    const router = useRouter();
    const {data: user} = useMe({enabled: true});
    const [search, setSearch] = useState<string>("");
    const [month, setMonth] = useState<string>("All months");
    const [page, setPage] = useState<number>(1);
    const pageSize = 10;
    const journalEntries = useJournalEntries({enabled: !!user});
    const entries = journalEntries.data ?? [];

    const query = search.trim().toLowerCase();

    const sortIsoByLabel = new Map<string, string>();

    for (const entry of entries) {
        const label = isoToMonthYear(entry.created_at);
        if (Number.isNaN(new Date(entry.created_at).getTime())) continue;

        const prev = sortIsoByLabel.get(label);
        if (!prev || entry.created_at > prev) {
            sortIsoByLabel.set(label, entry.created_at); // keep newest entry in that month
        }
    }

    const sortedMonths = [...sortIsoByLabel.entries()]
        .sort(([, isoA], [, isoB]) => new Date(isoB).getTime() - new Date(isoA).getTime())
        .map(([label]) => label);

    const filteredEntries = entries.filter((entry) => {
        const matchesMonth = month === "All months" || isoToMonthYear(entry.created_at) === month;
        const matchesSearch =
          !query ||
          entry.title.toLowerCase().trim().includes(query) ||
          entry.content.toLowerCase().trim().includes(query)
        return matchesMonth && matchesSearch;
    });

    const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    const pageCount = Math.max(1, Math.ceil(sortedEntries.length / pageSize));
    const safePage = Math.min(page, pageCount);
    const visibleEntries = sortedEntries.slice((safePage - 1) * pageSize, safePage * pageSize);
    const resultStart = sortedEntries.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const resultEnd = Math.min(safePage * pageSize, sortedEntries.length);

    useEffect(() => {
        setPage(1);
    }, [search, month]);

    useEffect(() => {
        setPage((p) => Math.min(p, pageCount));
    }, [pageCount]);

    if (!user) {
        return null;
    }

    function onNewEntry() {
        router.push("/new-entry");
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            <TopBar onBack={() => router.push("/journal")} entriesLength={entries.length} onNewEntry={onNewEntry}/>
            <div className="px-5 py-6 max-w-2xl mx-auto">
                <SearchBar search={search} setSearch={setSearch} month={month} setMonth={setMonth} months={sortedMonths}/>
                <Entries month={month} filteredEntries={sortedEntries} visibleEntries={visibleEntries} page={safePage} pageCount={pageCount} resultEnd={resultEnd} resultStart={resultStart} setPage={setPage} isPending={journalEntries.isPending} isError={journalEntries.isError} errorMessage={journalEntries.error?.message ?? "Failed to load entries"}/>
            </div>
        </div>
    );
}