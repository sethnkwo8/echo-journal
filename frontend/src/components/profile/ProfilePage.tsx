// frontend/src/components/profile/ProfilePage.tsx
"use client"

import { ProfileHeader } from "./ProfileHeader";
import { FormEvent, useState } from "react";
import { SavedBar } from "./SavedBar";
import { useMe } from "@/queries/auth/useMe";
import { AvatarAndName } from "./AvatarAndName";
import { AccountInfo } from "./AccountInfo";
import { StatsCard } from "./StatsCard";
import { LogoutButton } from "../settings/LogoutButton";
import { useLogout } from "@/mutations/auth/useLogout";
import { PasswordSection } from "./PasswordSection";
import { useUpdateMe } from "@/mutations/auth/useUpdateMe";
import { useChangePassword } from "@/mutations/auth/useChangePassword";
import { useJournalEntries } from "@/queries/journals/useJournalEntries";
import { getUserStreak } from "@/utils/getUserStreak";
import { getEntryCountForCurrentMonth } from "@/utils/getEntryCountForCurrentMonth";
import { getAvgEntriesPerWeek } from "@/utils/getAvgEntriesPerWeek";

export function ProfilePage() {
    const query = useMe({enabled: true});
    const user = query.data;
    const logoutMutation = useLogout();
    const updateMutation = useUpdateMe();
    const changePasswordMutation = useChangePassword();
    const journalEntries = useJournalEntries({enabled: !!user});

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [name, setName] = useState<string|undefined>(user?.name);
    const [saved, setSaved] = useState<boolean>(false);
    const [changingPassword, setChangingPassword] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

    if (!user) return null;

    const email = user?.email;
    const entries = journalEntries.data ?? [];
    const totalEntries = entries.length;
    const streak = getUserStreak(entries);
    const monthEntries = getEntryCountForCurrentMonth(entries);
    const avgPerWeek = getAvgEntriesPerWeek(totalEntries, user.created_at)

    const memberSinceDate= new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(user.created_at));

    const stats = [
        { label: "Total Entries", value: `${totalEntries}` },
        { label: "This Month", value: `${monthEntries}` },
        { label: "Day Streak", value: `${streak}` },
        { label: "Avg / Week", value: `${avgPerWeek}` },
    ];

    function resetPasswordForm() {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setChangingPassword(false);
        setPasswordChanged(false)
    }

    function handlePasswordChange(e: FormEvent) {
        e.preventDefault();
        setPasswordError("");

        changePasswordMutation.reset();

        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            setPasswordError("Fill all fields");
            return
        }

        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters");
            return
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Confirm Password must match New Password")
            return
        }

        changePasswordMutation.mutate(   
            { current_password: currentPassword, new_password: newPassword },   
            {     
                onSuccess: () => {
                    resetPasswordForm();        
                    setPasswordChanged(true);       
                },     
                
                onError: (err) => setPasswordError(err.message),   
            } 
        )
    }

    return (
        <div className="flex-1 overflow-y-auto pb-24 md:pb-8 animate-fade-in-up">
            {/* Header */}
            <ProfileHeader />
            <div className="px-5 py-6 space-y-6 max-w-2xl mx-auto">
                {/* Saved Bar */}
                {saved && <SavedBar/>}
                <div className="flex flex-col items-center gap-4 py-4">
                    {/* Avatar + Name */}
                    <AvatarAndName />
                    {/* Account Info */}
                    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border)" }}>
                    <AccountInfo email={email} date={memberSinceDate}/>
                    <PasswordSection 
                        setChangingPassword={setChangingPassword}
                        setPasswordError={setPasswordError}
                        setPasswordChanged={setPasswordChanged}
                        changingPassword={changingPassword}
                        passwordChanged={passwordChanged}
                        handlePasswordChange={handlePasswordChange}
                        currentPassword={currentPassword}
                        newPassword={newPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        setCurrentPassword={setCurrentPassword}
                        setNewPassword={setNewPassword}
                        resetPasswordForm={resetPasswordForm}
                        passwordError={passwordError}
                        isPending={changePasswordMutation.isPending}
                    />
                    </div>
                    {/* Stats Card */}
                    <div className="w-full">
                        <StatsCard stats={stats}/>
                    </div>
                </div>
                {/* Logout Button */}
                <LogoutButton showLogoutConfirm={showLogoutConfirm} setShowLogoutConfirm={setShowLogoutConfirm} onLogout={logoutMutation.mutate} isLoggingOut={logoutMutation.isPending}/>
            </div>
        </div>
    )
}