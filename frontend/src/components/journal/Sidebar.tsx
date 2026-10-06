// frontend/src/components/journal/Sidebar.tsx
"use client"

import { NavTab } from "@/types/nav";
import { useRouter } from "next/navigation";
import { useLogout } from "@/mutations/auth/useLogout";
import { useMe } from "@/queries/auth/useMe";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const {isPending: isLoggingOut, mutate: logoutUser} = useLogout();
    const {data: user} = useMe({enabled: true})

    function handleLogout() {
        logoutUser()
    };

    const profilePath = "/profile";

    const tabs: { id: NavTab; label: string; page: string; icon: React.ReactElement }[] = [
      {
        id: "journal",
        label: "Journal",
        page: "/journal",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 19v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        page: "/settings",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
    ];
  
    return (
      <aside
        className="hidden md:flex flex-col w-60 fixed left-0 top-0 bottom-0 z-40 py-6 px-4"
        style={{ background: "#0D1220", borderRight: "1px solid #1E2638" }}
      >
        <div className="flex items-center gap-2 px-2 mb-10">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="12" rx="3" fill="white" />
              <path d="M5 10a7 7 0 0014 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>Echo</span>
        </div>
  
        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.page;
            return (
              <button
                key={tab.id}
                onClick={() => router.push(tab.page)}
                className={[
                  "group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left border border-transparent",
                  "transition-all duration-200 ease-out active:scale-[0.98]",
                  "hover:translate-x-0.5 [&>svg]:transition-transform [&>svg]:duration-200 group-hover:[&>svg]:scale-110",
                  isActive
                    ? "text-[#818CF8] bg-[rgba(99,102,241,0.12)] border-[rgba(99,102,241,0.2)] hover:bg-[rgba(99,102,241,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.35)]"
                    : "text-[#4B5B73] hover:bg-[#1E2638] hover:text-[#94A3B8] hover:border-[#2A3548]",
                ].join(" ")}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>
  
        <div className="pt-4 mt-4 space-y-2" style={{ borderTop: "1px solid #1E2638" }}>
          <button
            onClick={() => router.push(profilePath)}
            className={[
              "group w-full flex items-center gap-3 px-2 py-2 rounded-xl",
              "transition-all duration-200 ease-out active:scale-[0.98]",
              "hover:translate-x-0.5",
              pathname === profilePath
                ? "hover:bg-[rgba(99,102,241,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.35)]"
                : "hover:bg-[#1E2638]",
            ].join(" ")}
            style={{
              background: pathname === profilePath ? "rgba(99,102,241,0.12)" : "transparent",
              border: pathname === profilePath ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white transition-transform duration-200 group-hover:scale-110 group-hover:ring-2 group-hover:ring-indigo-400/40"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            </div>
          </button>
          <button
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 ease-out hover:bg-red-950/30 hover:translate-x-0.5 active:scale-[0.98] [&>svg]:transition-transform [&>svg]:duration-200 group-hover:[&>svg]:scale-110"
            style={{ color: "#EF4444" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {isLoggingOut ? "Logging Out" : "Log Out"}
          </button>
        </div>
      </aside>
    );
  }