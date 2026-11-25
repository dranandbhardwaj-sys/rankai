"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { continueAsGuest, hasSupabase, signIn, signUp } from "@/lib/auth";
import { EXAM_LABEL, type ExamId } from "@/lib/types";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exam, setExam] = useState<ExamId>("jee_main");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (password.length < 6) {
      setError("Password kam se kam 6 characters ka rakho.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const r = await signUp({ name: name || "Student", email, password, exam });
        if (r.needsConfirm) {
          setInfo("Account ban gaya. Apna email check karo aur confirmation link par click karke login karo.");
          setBusy(false);
          return;
        }
      } else {
        await signIn(email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kuch galat ho gaya. Dobara try karo.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center font-extrabold text-2xl tracking-tight mb-6">
          Rank<span className="text-blue-600">AI</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h1 className="text-xl font-bold mb-1">{mode === "signup" ? "Account banao" : "Wapas aao"}</h1>
          <p className="text-sm text-slate-500 mb-5">
            {mode === "signup" ? "Free sign up, apna progress save rakho." : "Login karke apna progress dekho."}
          </p>

          {!hasSupabase && (
            <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3">
              Demo mode: abhi account sirf is device/browser par save hota hai. Real cloud login ke liye Supabase keys set karni hongi.
            </div>
          )}

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tumhara naam"
                  autoComplete="name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
                  required
                />
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(EXAM_LABEL) as ExamId[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setExam(id)}
                      className={`rounded-xl border-2 py-2 text-xs sm:text-sm font-semibold ${
                        exam === id ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {EXAM_LABEL[id]}
                    </button>
                  ))}
                </div>
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6)"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
              required
            />

            {error && <p className="text-sm text-rose-600">{error}</p>}
            {info && <p className="text-sm text-emerald-700">{info}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold"
            >
              {busy ? "Please wait…" : mode === "signup" ? "Sign up" : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-500">
            {mode === "signup" ? (
              <>
                Pehle se account hai?{" "}
                <Link href="/login" className="text-blue-600 font-medium">Login</Link>
              </>
            ) : (
              <>
                Naye ho?{" "}
                <Link href="/signup" className="text-blue-600 font-medium">Sign up</Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={async () => {
              await continueAsGuest(exam);
              router.push("/dashboard");
            }}
            className="w-full text-sm text-slate-500 hover:text-slate-800 mt-3 py-2"
          >
            Guest ki tarah try karo
          </button>
        </div>
      </div>
    </div>
  );
}
