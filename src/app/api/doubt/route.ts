import { createClient } from "@supabase/supabase-js";

const MAX_LEN = 1500;

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json(
      { error: "AI doubt solver abhi chalu nahi hua. Jald hi aayega." },
      { status: 503 }
    );
  }

  // Login zaroori hai. Token browser se aata hai, Supabase se verify hota hai.
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return Response.json({ error: "Pehle login karo." }, { status: 401 });
  }
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
  const { data: userData, error: userErr } = await sb.auth.getUser(token);
  if (userErr || !userData.user) {
    return Response.json({ error: "Login expire ho gaya. Dobara login karo." }, { status: 401 });
  }

  let question = "";
  let exam = "JEE Main";
  try {
    const body = await req.json();
    question = String(body.question ?? "").trim();
    exam = ["JEE Main", "JEE Advanced", "NEET"].includes(body.exam) ? body.exam : exam;
  } catch {
    return Response.json({ error: "Galat request." }, { status: 400 });
  }
  if (!question || question.length > MAX_LEN) {
    return Response.json(
      { error: `Sawal 1 se ${MAX_LEN} characters ke beech likho.` },
      { status: 400 }
    );
  }

  // Roz ki limit database mein (free 3, Pro 50). Pehle count hota hai, phir AI call.
  const { data: allowed, error: limitErr } = await sb.rpc("consume_doubt");
  if (limitErr) {
    return Response.json({ error: "Server setup adhura hai. Baad mein try karo." }, { status: 500 });
  }
  if (!allowed) {
    return Response.json(
      { error: "Aaj ki free limit khatam. Kal dobara poochho ya Pro lo." },
      { status: 429 }
    );
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5-5",
        max_tokens: 800,
        system: `You are RankAI, a friendly ${exam} tutor. Answer in simple Hinglish (Hindi in Roman script). Explain step by step, keep it short, and only answer study-related questions.`,
        messages: [{ role: "user", content: question }],
      }),
    });
    if (!r.ok) {
      return Response.json(
        { error: "AI abhi jawab nahi de pa raha. Baad mein try karo." },
        { status: 502 }
      );
    }
    const data = await r.json();
    const answer = Array.isArray(data.content)
      ? data.content
          .filter((c: { type: string }) => c.type === "text")
          .map((c: { text: string }) => c.text)
          .join("\n")
      : "";
    return Response.json({ answer });
  } catch {
    return Response.json({ error: "Network error. Dobara try karo." }, { status: 502 });
  }
}
