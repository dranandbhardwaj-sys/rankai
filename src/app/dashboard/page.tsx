"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPro, supabase, type ProStatus } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [pro, setPro] = useState<ProStatus>({ active: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rankai_user");
      setUser(saved ? JSON.parse(saved) : { exam: "jee_main", targetScore: "200" });
    } catch {
      setUser({ exam: "jee_main", targetScore: "200" });
    }
    (async () => {
      const { data } = await supabase().auth.getSession();
      const u = data.session?.user;
      if (u) {
        setEmail(u.email ?? null);
        setPro(await fetchPro(u.id));
      }
    })();
  }, []);

  const logout = async () => {
    await supabase().auth.signOut();
    setEmail(null);
    setPro({ active: false });
  };

  const exam =
    user?.exam === "neet"
      ? "NEET"
      : user?.exam === "jee_advanced"
      ? "JEE Advanced"
      : "JEE Main";

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {pro.active && (
          <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
            PRO
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 mb-1">
        {exam} · Target {user?.targetScore || "—"}
      </p>
      <p className="text-xs text-slate-400 mb-6">
        {email ? (
          <>
            {email} ·{" "}
            <button type="button" onClick={logout} className="text-blue-600">
              Logout
            </button>
          </>
        ) : (
          <>
            Guest ·{" "}
            <Link href="/login" className="text-blue-600">
              Login karo
            </Link>
          </>
        )}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border rounded-xl p-3">
          <div className="text-xs text-slate-500">Today</div>
          <div className="font-bold text-lg">2.5 / 4 hrs</div>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <div className="text-xs text-slate-500">Accuracy</div>
          <div className="font-bold text-lg">71%</div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/dashboard/doubt"
          className="block bg-white border rounded-xl p-4 font-medium"
        >
          Ask a Doubt
        </Link>
        <Link
          href="/dashboard/practice"
          className="block bg-white border rounded-xl p-4 font-medium"
        >
          Practice
        </Link>
        {!pro.active && (
          <Link
            href="/pricing"
            className="block bg-blue-600 text-white rounded-xl p-4 font-medium text-center"
          >
            Upgrade Pro
          </Link>
        )}
        <Link href="/" className="block text-center text-sm text-slate-500 py-2">
          Home
        </Link>
      </div>
    </div>
  );
}
