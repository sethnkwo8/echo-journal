// frontend/src/utils/formatJournalEntryDate.ts

const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
};

export function formatJournalEntryDate(iso: string): string {
    const date = new Date(iso);
    const now = new Date();

    if (Number.isNaN(date.getTime())) return "---";

    const time = date.toLocaleTimeString("en-US", timeOptions);

    // Strip times to compare absolute calendar days in the user's local timezone
    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = today.getTime() - inputDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return `Today, ${time}`;
    if (diffDays === 1) return `Yesterday, ${time}`;

    const sameYear = date.getFullYear() === now.getFullYear();

    return date.toLocaleString("en-US", {
        ...(sameYear ? {} : { year: "numeric" }),
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}
