// frontend/src/components/journal/JournalPage.tsx
"use client"

import { useMe } from "@/queries/auth/useMe"
import { TopBar } from "./TopBar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function JournalPage() {
    const router = useRouter();
    const [search, setSearch] = useState();
    const {data: user} = useMe({enabled: true});

    if (!user) {
        return null;
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
            <TopBar user={user} onNewEntryClick={() => router.push("/new-entry")} />
            <SearchBar />
        </div>
    )
}