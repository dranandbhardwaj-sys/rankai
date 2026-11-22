import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

// Sirf browser mein, effects/handlers ke andar call karo.
export function supabase() {
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}

export type ProStatus = { active: boolean; plan?: string; expiresAt?: string };

export async function fetchPro(userId: string): Promise<ProStatus> {
  const { data } = await supabase()
    .from("subscriptions")
    .select("plan, expires_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (data && new Date(data.expires_at) > new Date()) {
    return { active: true, plan: data.plan, expiresAt: data.expires_at };
  }
  return { active: false };
}
