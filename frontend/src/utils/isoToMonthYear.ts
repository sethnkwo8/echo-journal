// frontend/src/utils/isoToMonthYear.ts

export function isoToMonthYear(iso: string) {
    const date = new Date(iso);

    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); 
}