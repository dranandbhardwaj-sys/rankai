"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, signOut } from "./auth";
import type { Profile } from "./types";

interface Ctx {
  profile: Profile;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const ProfileCtx = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);

  const refresh = useCallback(async () => {
    setProfile(await getProfile());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (profile === null) router.replace("/login");
  }, [profile, router]);

  const logout = useCallback(async () => {
    await signOut();
    router.replace("/");
  }, [router]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
        Loading…
      </div>
    );
  }

  return <ProfileCtx.Provider value={{ profile, refresh, logout }}>{children}</ProfileCtx.Provider>;
}

export function useProfile(): Ctx {
  const c = useContext(ProfileCtx);
  if (!c) throw new Error("useProfile must be used inside ProfileProvider");
  return c;
}
