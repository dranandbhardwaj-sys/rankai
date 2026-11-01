"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      "rankai_user",
      JSON.stringify({ email, fullName: "Student" })
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-6">
        <h1 className="text-xl font-bold text-center mb-6">RankAI Login</h1>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            Login / Continue
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-4">
          <Link href="/onboarding" className="text-blue-600">
            New user? Onboarding
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
