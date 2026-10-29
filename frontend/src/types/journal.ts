// frontend/src/types/journal.ts

// Feeling Name type
export type FeelingName = "happy" | "excited"| "grateful"| "calm" | "proud" | "hopeful" | 
"loved" |"relaxed" | "content" | "sad" | "lonely" | "disappointed" | "anxious" | "stressed" |"angry" | 
"frustrated" | "overwhelmed" | "motivated" | "inspired" | "curious" | "nostalgic" | "reflective" | 
"indifferent"

// Feeling option array
export const FEELING_OPTIONS: readonly FeelingName[] = [
    "happy",
    "excited",
    "grateful",
    "calm",
    "proud",
    "hopeful",
    "loved",
    "relaxed",
    "content",
    "sad",
    "lonely",
    "disappointed",
    "anxious",
    "stressed",
    "angry",
    "frustrated",
    "overwhelmed",
    "motivated",
    "inspired",
    "curious",
    "nostalgic",
    "reflective",
    "indifferent"
] as const

// Journal Entry interface
export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    feeling: FeelingName[];
    tags: string[];
    created_at: string;
    updated_at: string;
}

// Journal Entry form interface
export interface JournalEntryForm {
    title: string;
    content: string;
    feeling?: FeelingName[];
    tags?: string[];
}

// Journal Entry update form interface
export interface JournalEntryUpdateForm {
    title?: string;
    content?: string;
    feeling?: FeelingName[];
    tags?: string[];
}
