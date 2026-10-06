// frontend/src/app/(protected)/profile/page.tsx
import { ProfilePage } from "@/components/profile/ProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "View and update your Echo profile, name, and account details.",
  };

export default function Profile() {
    return (
        <ProfilePage />
    )
}