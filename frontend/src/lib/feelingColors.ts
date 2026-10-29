// frontend/src/lib/feelingColors.ts

import type { FeelingName } from "@/types/journal";

/** Section order in the “How are you feeling?” UI */
export const FEELING_GROUPS: readonly {
  label: string;
  feelings: readonly FeelingName[];
}[] = [
  {
    label: "Uplifted",
    feelings: [
      "happy",
      "excited",
      "grateful",
      "calm",
      "proud",
      "hopeful",
      "loved",
      "relaxed",
      "content",
    ],
  },
  {
    label: "Heavy",
    feelings: [
      "sad",
      "lonely",
      "disappointed",
      "anxious",
      "stressed",
      "angry",
      "frustrated",
      "overwhelmed",
    ],
  },
  {
    label: "Reflective",
    feelings: [
      "motivated",
      "inspired",
      "curious",
      "nostalgic",
      "reflective",
      "indifferent",
    ],
  },
] as const;

export const FEELING_COLORS: Record<FeelingName, string> = {
  // Uplifted
  happy: "#FBBF24",
  excited: "#F97316",
  grateful: "#34D399",
  calm: "#38BDF8",
  proud: "#A78BFA",
  hopeful: "#4ADE80",
  loved: "#F472B6",
  relaxed: "#2DD4BF",
  content: "#60A5FA",

  // Heavy
  sad: "#64748B",
  lonely: "#94A3B8",
  disappointed: "#78716C",
  anxious: "#FB923C",
  stressed: "#EF4444",
  angry: "#DC2626",
  frustrated: "#EA580C",
  overwhelmed: "#C084FC",

  // Reflective
  motivated: "#22C55E",
  inspired: "#E879F9",
  curious: "#818CF8",
  nostalgic: "#A8A29E",
  reflective: "#6366F1",
  indifferent: "#71717A",
};

/** UI label: "grateful" → "Grateful" */
export function formatFeelingLabel(value: FeelingName): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}