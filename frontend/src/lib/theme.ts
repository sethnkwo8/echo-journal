// frontend/src/lib/theme.ts

export type Theme = "dark" | "midnight";

export const THEME_STORAGE_KEY = "echo-theme";

export function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "dark";
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "midnight" ? "midnight" : "dark";
}

export function applyTheme(theme: Theme) {
    if (theme === "midnight") {
        document.documentElement.dataset.theme = "midnight";
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
}

export function storeTheme(theme: Theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}