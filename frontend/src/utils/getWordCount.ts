// frontend/src/utils/getWordCount.ts
import { JournalEntry } from "@/types/journal";
import { formatter } from "./numberFormatter";

// Function to calculate word count
export function getWordCount(content: string): number {
    const cleanedText = content.trim()

    if (cleanedText === "") return 0;

    // Split by one or more whitespace characters and get the length
    return cleanedText.split(/\s+/).length
}

export function getWordCountValue(entries: JournalEntry[]) {
    // Function to sum words
    function getSum(total: number, num: JournalEntry) {
        return total + getWordCount(num.content);
    };

    // Total word count from entries
    const totalWordCount = entries.reduce(getSum, 0);

    // Value for word count
    const wordCountValue = totalWordCount < 1000 ? totalWordCount : formatter.format(totalWordCount);

    return wordCountValue;
}