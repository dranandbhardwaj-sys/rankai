import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import type { ExamId, Profile } from "./types";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true agar Supabase keys set hain (real login). Warna device-only demo mode. */
export const hasSupabase = Boolean(SB_URL && SB_KEY);

let client: SupabaseClient | null = null;
function sb(): SupabaseClient | null {
  if (!hasSupabase) return null;
  if (!client) client = createClient(SB_URL as string, SB_KEY as string);
  return client;
}

const PROFILE_KEY = "rankai_profile_v2";
const ACCOUNTS_KEY = "rankai_local_accounts_v2";

function lsGet(k: string): string | null {
  try { return localStorage.getItem(k); } catch { return null; }
}
function lsSet(k: string, v: string) {
  try { localStorage.setItem(k, v); } catch { /* storage blocked */ }
}
function lsDel(k: string) {
  try { localStorage.removeItem(k); } catch { /* ignore */ }
}

const isExam = (x: unknown): x is ExamId => x === "neet" || x === "jee_main" || x === "jee_advanced";

function fromUser(u: User): Profile {
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name = typeof meta.name === "string" && meta.name.trim() ? meta.name.trim() : (u.email?.split("@")[0] ?? "Student");
  return { id: u.id, name, email: u.email ?? undefined, exam: isExam(meta.exam) ? meta.exam : "jee_main", mode: "supabase" };
}

function readAccounts(): Record<string, { name: string; exam: ExamId }> {
  const raw = lsGet(ACCOUNTS_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export async function getProfile(): Promise<Profile | null> {
  const c = sb();
  if (c) {
    const { data } = await c.auth.getSession();
    if (data.session?.user) return fromUser(data.session.user);
  }
  const raw = lsGet(PROFILE_KEY);
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Profile;
    if (p && typeof p.id === "string" && isExam(p.exam)) return { ...p, mode: "local" };
  } catch { /* fallthrough */ }
  return null;
}

export async function signUp(i: { name: string; email: string; password: string; exam: ExamId }): Promise<{ needsConfirm: boolean }> {
  const email = i.email.trim().toLowerCase();
  const c = sb();
  if (c) {
    const { data, error } = await c.auth.signUp({ email, password: i.password, options: { data: { name: i.name.trim(), exam: i.exam } } });
    if (error) throw new Error(error.message);
    return { needsConfirm: !data.session };
  }
  // Demo mode: password store nahi hota, account sirf is device par hai.
  const accounts = readAccounts();
  accounts[email] = { name: i.name.trim(), exam: i.exam };
  lsSet(ACCOUNTS_KEY, JSON.stringify(accounts));
  const p: Profile = { id: "local:" + email, name: i.name.trim(), email, exam: i.exam, mode: "local" };
  lsSet(PROFILE_KEY, JSON.stringify(p));
  return { needsConfirm: false };
}

export async function signIn(email: string, password: string): Promise<void> {
  const e = email.trim().toLowerCase();
  const c = sb();
  if (c) {
    const { error } = await c.auth.signInWithPassword({ email: e, password });
    if (error) throw new Error(error.message);
    return;
  }
  const acc = readAccounts()[e];
  if (!acc) throw new Error("Is device par ye account nahi mila. Pehle Sign up karo.");
  const p: Profile = { id: "local:" + e, name: acc.name, email: e, exam: acc.exam, mode: "local" };
  lsSet(PROFILE_KEY, JSON.stringify(p));
}

export async function continueAsGuest(exam: ExamId, name = "Guest"): Promise<void> {
  const p: Profile = { id: "guest", name: name.trim() || "Guest", exam, mode: "local" };
  lsSet(PROFILE_KEY, JSON.stringify(p));
}

export async function signOut(): Promise<void> {
  const c = sb();
  if (c) await c.auth.signOut();
  lsDel(PROFILE_KEY);
}

export async function updateExam(exam: ExamId): Promise<void> {
  const c = sb();
  if (c) {
    const { data } = await c.auth.getSession();
    if (data.session) {
      await c.auth.updateUser({ data: { exam } });
      return;
    }
  }
  const raw = lsGet(PROFILE_KEY);
  if (!raw) return;
  try {
    const p = JSON.parse(raw) as Profile;
    p.exam = exam;
    lsSet(PROFILE_KEY, JSON.stringify(p));
    if (p.email) {
      const accounts = readAccounts();
      if (accounts[p.email]) { accounts[p.email].exam = exam; lsSet(ACCOUNTS_KEY, JSON.stringify(accounts)); }
    }
  } catch { /* ignore */ }
}

export async function getAccessToken(): Promise<string | null> {
  const c = sb();
  if (!c) return null;
  const { data } = await c.auth.getSession();
  return data.session?.access_token ?? null;
}
