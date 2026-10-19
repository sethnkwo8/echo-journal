// frontend/src/utils/numberFormatter.ts
export const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short' // Ensures 'K' and 'M' are used instead of 'thousand/million'
});