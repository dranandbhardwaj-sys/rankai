"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rankai_user");
    if (saved) setUser(JSON.parse(saved));
    else setUser({ exam: "jee_main", targetScore: "200" });
  }, []);

  const exam =
    user?.exam === "neet"
      ? "NEET"
      : user?.exam === "jee_advanced"
      ? "JEE Advanced"
      : "JEE Main";

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">Dashboard</h1>
      <p className="text-sm text-slate-500 mb-6">
        {exam} · Target {user?.targetScore || "—"}
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
        <Link
          href="/pricing"
          className="block bg-blue-600 text-white rounded-xl p-4 font-medium text-center"
        >
          Upgrade Pro
        </Link>
        <Link href="/" className="block text-center text-sm text-slate-500 py-2">
          Home
        </Link>
      </div>
    </div>
  );
}
