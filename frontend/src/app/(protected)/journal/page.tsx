// frontend/src/app/(protected)/dashboard
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your recent voice entries and daily journal history.",
};

export default function Page() {
  return (
    <h1>Dashboard</h1>
  )
}