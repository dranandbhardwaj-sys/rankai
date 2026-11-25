import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_LEN = 1200;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

/** Agar Supabase configured hai to sirf logged-in users ko allow karo (API cost bachane ke liye). */
async function verifyUser(authHeader: string | null): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return true; // demo mode: sirf rate limit lagega
  const token = authHeader?.replace(/^Bearer\s+/i, "");
  if (!token) return false;
  try {
    const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` } });
    return r.ok;
  } catch {
    return false;
  }
}

const EXAM_NAME: Record<string, string> = { neet: "NEET", jee_main: "JEE Main", jee_advanced: "JEE Advanced" };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Bahut zyada requests. Ek minute baad try karo." }, { status: 429 });
  }

  if (!(await verifyUser(req.headers.get("authorization")))) {
    return NextResponse.json({ error: "Doubt AI use karne ke liye login karo (guest allowed nahi)." }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Doubt AI abhi band hai: server par OPENAI_API_KEY set nahi hai." },
      { status: 503 }
    );
  }

  let body: { question?: unknown; exam?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return NextResponse.json({ error: "Question khali hai." }, { status: 400 });
  if (question.length > MAX_LEN) return NextResponse.json({ error: `Question ${MAX_LEN} characters se chhota rakho.` }, { status: 400 });
  const exam = EXAM_NAME[String(body.exam)] ?? "JEE/NEET";

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25_000);
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              `You are RankAI, a patient ${exam} tutor for Indian students. Reply in simple Hinglish (Hindi in Roman script mixed with English technical terms). ` +
              "Explain step by step, state formulas used, show the final answer clearly, and add one short tip to avoid common mistakes. " +
              "If the question is unclear or not about school-level science/maths, say so briefly. Never invent facts; if unsure, say you are unsure.",
          },
          { role: "user", content: question },
        ],
      }),
    });
    if (!r.ok) {
      return NextResponse.json({ error: "AI service abhi jawab nahi de pa raha. Thodi der baad try karo." }, { status: 502 });
    }
    const data = (await r.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) return NextResponse.json({ error: "Khali jawab aaya. Dobara try karo." }, { status: 502 });
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ error: "AI timeout ho gaya. Dobara try karo." }, { status: 504 });
  } finally {
    clearTimeout(timer);
  }
}
