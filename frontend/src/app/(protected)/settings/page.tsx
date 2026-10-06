// frontend/src/app/settings/page.tsx
import { SettingsPage } from "@/components/settings/SettingsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account preferences, privacy settings, and audio defaults.",
};

export default function Settings() {
  return (
    <SettingsPage />
  )
}