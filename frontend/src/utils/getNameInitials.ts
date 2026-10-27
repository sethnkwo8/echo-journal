export function getNameInitials(name: string): string {
    return name
        .split(" ")
        .filter((part) => part !== "")
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}
