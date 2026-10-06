// frontend/src/app/(protected)/dashboard
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Browse your past voice entries and revisit daily reflections.",
};

export default function Page() {
  return (
    <div className="flex-1 overflow-y-auto pb-24 md:pb-8">
      <h1>Dashboard</h1>
    </div>
  )
}