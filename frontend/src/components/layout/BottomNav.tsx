// frontend/src/components/layout/Sidebar.tsx
"use client"

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { NavTab } from "@/types/nav";

export function BottomNav() {
    const router = useRouter();
    const pathname = usePathname();

    const tabs: { id: NavTab; label: string; page: string; icon: React.ReactElement }[] = [
      {
        id: "journal",
        label: "Journal",
        page: "/journal", 
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 8h10M7 12h7M7 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: "record",
        label: "New Entry",
        page: "/new-entry",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        page: "/settings",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        id: "profile",
        label: "Profile",
        page: "/profile",
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ];
  
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 md:hidden"
        style={{
          background: "rgba(11, 15, 23, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid #1E2638",
        }}
      >
        {tabs.map((tab) => {
            const isActive = pathname === tab.page;

            return (
                <button
                    key={tab.id}
                    onClick={() => router.push(tab.page)}
                    className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200"
                    style={{
                    color: isActive ? "#818CF8" : "#4B5B73",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    }}
                >
                    {tab.id === "record" ? (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                        background: isActive ? "linear-gradient(135deg, #6366F1, #8B5CF6)" : "#1E2638",
                        border: isActive ? "none" : "1px solid #2A354D",
                        boxShadow: isActive ? "0 4px 16px rgba(99,102,241,0.4)" : "none",
                        color: isActive ? "white" : "#4B5B73",
                        }}>
                        {tab.icon}
                    </div>
                    ) : (
                    <>
                        {tab.icon}
                        <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
                    </>
                    )}
                </button>
            )
        })}
      </nav>
    );
  }