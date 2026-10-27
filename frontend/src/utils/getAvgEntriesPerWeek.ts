// frontend/src/utils/getAvgEntriesPerWeek.ts

export function getAvgEntriesPerWeek(count: number, startIso: string) {
    const now = new Date();
    const start = new Date(startIso);
    const elapsedWeeks = (now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000);
    const weeks = Math.max(elapsedWeeks, 1)

    const avg = count === 0 ? "0" : (count / weeks).toFixed(1);
    return avg
}