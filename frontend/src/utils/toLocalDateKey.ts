// frontend/src/utils/toLocalDateKey.ts
export function getLocaleDateKey(iso: string, locale = 'en-US') {
    const date = new Date(iso);
    
    return new Intl.DateTimeFormat('sv-SE', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Uses user's local timezone
    }).format(date);
}