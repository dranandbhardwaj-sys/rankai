"use client";

import { useState } from "react";
import { useProfile } from "@/lib/useProfile";
import { getAccessToken } from "@/lib/auth";

interface Msg {
  role: "user" | "ai" | "error";
  text: string;
}

export default function DoubtPage() {
  const { profile } = useProfile();
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);

  async function ask() {
    const question = input.trim();
    if (!question || busy) return;
    setMsgs((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ question, exam: profile.exam }),
      });
      const data = (await res.json().catch(() => ({}))) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) throw new Error(data.error || "Jawab nahi mil paya.");
      setMsgs((m) => [...m, { role: "ai", text: data.answer as string }]);
    } catch (e) {
      setMsgs((m) => [...m, { role: "error", text: e instanceof Error ? e.message : "Network error" }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold">Doubt AI</h1>
        <p className="text-sm text-slate-500">Hinglish mein apna doubt poochho. AI se galti ho sakti hai, important answers apni book/teacher se verify karo.</p>
      </div>

      <div className="space-y-3">
        {msgs.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm text-slate-500">
            Example: “Projectile motion mein maximum range 45° par kyun hoti hai?”
          </div>
        )}
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${
              m.role === "user"
                ? "bg-blue-600 text-white ml-8"
                : m.role === "error"
                ? "bg-rose-50 border border-rose-200 text-rose-700"
                : "bg-white border border-slate-200 mr-8"
            }`}
          >
            {m.text}
          </div>
        ))}
        {busy && <div className="text-sm text-slate-500">AI soch raha hai…</div>}
      </div>

      <div className="sticky bottom-16 sm:bottom-4 bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1200}
          rows={2}
          placeholder="Apna doubt likho…"
          className="flex-1 resize-none outline-none text-sm px-2 py-1"
        />
        <button
          onClick={ask}
          disabled={busy || !input.trim()}
          className="bg-blue-600 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
        >
          Poochho
        </button>
      </div>
    </div>
  );
}
