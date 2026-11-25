"use client";

import { ProfileProvider } from "@/lib/useProfile";
import AppNav from "@/components/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <AppNav />
      <main className="max-w-5xl mx-auto px-4 pt-5 pb-24 sm:pb-10">{children}</main>
    </ProfileProvider>
  );
}
