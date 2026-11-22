"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DoubtPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setError("");
    setAnswer("");
    let exam = "JEE Main";
    try {
      const saved = localStorage.getItem("rankai_user");
      const u = saved ? JSON.parse(saved) : null;
      if (u?.exam === "neet") exam = "NEET";
      else if (u?.exam === "jee_advanced") exam = "JEE Advanced";
    } catch {}
    try {
      const { data: sess } = await supabase().auth.getSession();
      const token = sess.session?.access_token;
      if (!token) {
        setError("Doubt poochne ke liye pehle login karo.");
        setLoading(false);
        return;
      }
      const r = await fetch("/api/doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question, exam }),
      });
      const data = await r.json();
      if (!r.ok) setError(data.error || "Kuch gadbad ho gayi.");
      else setAnswer(data.answer);
    } catch {
      setError("Network error. Dobara try karo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">Ask a Doubt</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={1500}
        rows={5}
        placeholder="Apna sawal yahan likho..."
        className="w-full border rounded-xl px-4 py-3 text-sm bg-white"
      />
      <button
        type="button"
        onClick={ask}
        disabled={loading || !question.trim()}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-3 disabled:opacity-50"
      >
        {loading ? "Soch raha hoon..." : "Doubt poochho"}
      </button>

      {error && error.includes("login") && (
        <Link href="/login" className="block mt-3 text-sm text-blue-600">
          Login page par jao →
        </Link>
      )}
      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
          {error}
        </p>
      )}
      {answer && (
        <div className="mt-4 bg-white border rounded-xl p-4 text-sm whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}
