"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (password.length < 8) {
      setError("Password kam se kam 8 characters ka rakho.");
      return;
    }
    setLoading(true);
    const sb = supabase();
    if (mode === "signup") {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) setError(error.message);
      else if (!data.session)
        setInfo("Account ban gaya. Apni email check karo aur link dabao, phir login karo.");
      else router.push("/dashboard");
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setError("Email ya password galat hai.");
      else router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-6">
        <h1 className="text-xl font-bold text-center mb-6">
          {mode === "login" ? "RankAI Login" : "Naya account banao"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password (8+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm"
            required
          />
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
              {info}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Ruko..." : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setInfo("");
          }}
          className="w-full text-sm text-blue-600 mt-4"
        >
          {mode === "login" ? "Naya user? Sign up karo" : "Pehle se account hai? Login karo"}
        </button>
        <p className="text-center text-sm text-slate-500 mt-2">
          <Link href="/onboarding" className="text-blue-600">
            Pehle exam chuno
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(
              "rankai_user",
              JSON.stringify({
                exam: "jee_main",
                classLevel: "12",
                hours: 4,
                targetScore: "200",
              })
            );
            router.push("/dashboard");
          }}
          className="w-full text-sm text-slate-500 mt-3 py-2"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
