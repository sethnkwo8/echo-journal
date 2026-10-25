// frontend/src/components/theme/ThemeInit.tsx
"use client";

import { useEffect } from "react";
import { applyTheme, getInitialTheme } from "@/lib/theme";

export function ThemeInit() {
  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  return null;
}