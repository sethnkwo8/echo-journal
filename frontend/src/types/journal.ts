// frontend/src/types/journal.ts

// Journal Entry interface
export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

// Journal Entry form interface
export interface JournalEntryForm {
    title: string;
    content: string;
}

// Journal Entry update form interface
export interface JournalEntryUpdateForm {
    title?: string;
    content?: string;
}
