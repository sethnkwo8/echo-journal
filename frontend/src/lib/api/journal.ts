// frontend/src/lib/api/journal.ts
import { parseApiError, type FastApiValidationError } from "./parseApiError";
import { JournalEntry, JournalEntryForm, JournalEntryUpdateForm } from "@/types/journal";
import { authenticatedFetch } from "./authenticatedFetch";

const apiURL = process.env.NEXT_PUBLIC_APP_URL;

// GET fetch call to get all journal entries
export async function getJournalEntries() {
    const res = await authenticatedFetch(`${apiURL}/journals/`, {
        method: "GET",
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to get user's journal entries")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to get user's journal entries"))
    };

    const entries: JournalEntry[] = await res.json();

    return entries;
}

// GET fetch call to get a journal entry
export async function getJournalEntry(entry_id:string) {
    const res = await authenticatedFetch(`${apiURL}/journals/${entry_id}`, {
        method: "GET",
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to get user's journal entry")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to get user's journal entry"))
    };

    const entry: JournalEntry = await res.json();

    return entry;
}

// POST fetch call to create a journal entry
export async function createJournalEntry(formData: JournalEntryForm) {
    const res = await authenticatedFetch(`${apiURL}/journals/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to create journal entry")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to create journal entry"))
    };

    const entry: JournalEntry = await res.json();

    return entry;
}

export async function updateJournalEntry(entry_id: string, formData: JournalEntryUpdateForm) {
    const res = await authenticatedFetch(`${apiURL}/journals/${entry_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to update journal entry")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to update journal entry"))
    };

    const entry: JournalEntry = await res.json();

    return entry;
}

export async function deleteJournalEntry(entry_id: string) {
    const res = await authenticatedFetch(`${apiURL}/journals/${entry_id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to delete journal entry")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to delete journal entry"))
    };

    const message: string = "Journal Entry successfully deleted";

    return message;
}

export async function deleteJournalEntries() {
    const res = await authenticatedFetch(`${apiURL}/journals/`, {
        method: "DELETE",
    });

    if (!res.ok) {
        let errorData: unknown
        try{
            errorData = await res.json();
        }
        catch{
            throw new Error("Failed to delete all journal entries")
        }
        throw new Error(parseApiError(errorData as FastApiValidationError, "Failed to delete all journal entries"))
    };

    const message: string = "All Journal Entries successfully deleted";

    return message;
}