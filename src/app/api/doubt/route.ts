const MAX_LEN = 1500;
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const hits = new Map<string, number[]>();

// Best-effort rate limit (per server instance) so one person cannot burn API credit.
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQ;
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json(
      { error: "AI doubt solver abhi chalu nahi hua. Jald hi aayega." },
      { status: 503 }
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (limited(ip)) {
    return Response.json(
      { error: "Thoda ruko, ek minute mein dobara try karo." },
      { status: 429 }
    );
  }

  let question = "";
  let exam = "JEE Main";
  try {
    const body = await req.json();
    question = String(body.question ?? "").trim();
    exam = String(body.exam ?? exam).slice(0, 30);
  } catch {
    return Response.json({ error: "Galat request." }, { status: 400 });
  }
  if (!question || question.length > MAX_LEN) {
    return Response.json(
      { error: `Sawal 1 se ${MAX_LEN} characters ke beech likho.` },
      { status: 400 }
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
    return Response.json(
      { error: "Network error. Dobara try karo." },
      { status: 502 }
    );
  }
}
