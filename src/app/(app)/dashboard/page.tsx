"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/lib/useProfile";
import { computeStats, loadProgress, type Stats } from "@/lib/store";
import { EXAM_LABEL, type MockResult } from "@/lib/types";
import { questionsFor } from "@/data/questions";

const SUBJECT_BAR: Record<string, string> = {
  Physics: "bg-blue-500",
  Chemistry: "bg-emerald-500",
  Mathematics: "bg-violet-500",
  Biology: "bg-rose-500",
};

export default function DashboardPage() {
  const { profile } = useProfile();
  const [stats, setStats] = useState<Stats | null>(null);
  const [mocks, setMocks] = useState<MockResult[]>([]);

  useEffect(() => {
    const p = loadProgress(profile.id);
    setStats(computeStats(p));
    setMocks(p.mocks);
  }, [profile.id]);

  const poolSize = questionsFor(profile.exam).length;
  const avgMock = mocks.length ? Math.round(mocks.reduce((s, m) => s + (m.score / m.max) * 100, 0) / mocks.length) : null;
  const maxDay = stats ? Math.max(1, ...stats.last7.map((d) => d.count)) : 1;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-violet-600 text-white p-6 shadow-lg">
        <p className="text-blue-100 text-sm">Namaste,</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">{profile.name} 👋</h1>
        <p className="mt-1 text-blue-100 text-sm">
          {EXAM_LABEL[profile.exam]} ki taiyari · {poolSize} questions available
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/practice" className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl text-sm">
            Practice shuru karo
          </Link>
          <Link href="/mock" className="bg-white/15 hover:bg-white/25 font-semibold px-4 py-2 rounded-xl text-sm">
            Mock test do
          </Link>
          <Link href="/doubt" className="bg-white/15 hover:bg-white/25 font-semibold px-4 py-2 rounded-xl text-sm">
            Doubt poochho
          </Link>
        </div>
      </section>

      {profile.mode === "local" && (
        <p className="text-xs text-slate-500 bg-white border border-slate-200 rounded-xl p-3">
          Tumhara progress abhi sirf is browser mein save hai. Browser data clear karne par ye chala jayega.
        </p>
      )}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Questions attempted" value={stats ? String(stats.total) : "…"} sub={stats ? `${stats.uniqueSolved} alag solved` : ""} />
        <StatCard label="Accuracy" value={stats ? `${stats.accuracy}%` : "…"} sub={stats && stats.total ? `${stats.correct} sahi` : "abhi shuru karo"} />
        <StatCard label="Day streak" value={stats ? `${stats.streak} 🔥` : "…"} sub="roz kuch solve karo" />
        <StatCard label="Mock average" value={avgMock === null ? "—" : `${avgMock}%`} sub={`${mocks.length} mock diye`} />
      </section>

      <div className="grid lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-bold mb-4">Subject-wise accuracy</h2>
          {stats && stats.total > 0 ? (
            <div className="space-y-3">
              {Object.entries(stats.bySubject).map(([s, v]) => {
                const pct = Math.round((v.correct / v.total) * 100);
                return (
                  <div key={s}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{s}</span>
                      <span className="text-slate-500">{pct}% · {v.correct}/{v.total}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${SUBJECT_BAR[s] ?? "bg-slate-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Abhi koi data nahi. Practice mein kuch questions solve karo.</p>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-bold mb-4">Pichhle 7 din</h2>
          <div className="flex items-end gap-2 h-28">
            {(stats?.last7 ?? []).map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] text-slate-500 mb-1">{d.count || ""}</span>
                <div
                  className="w-full rounded-t-md bg-blue-500/80"
                  style={{ height: `${Math.max(d.count ? 8 : 3, (d.count / maxDay) * 80)}%`, opacity: d.count ? 1 : 0.25 }}
                />
                <span className="text-[10px] text-slate-500 mt-1">{d.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="font-bold mb-3">Weak chapters (revise karo)</h2>
        {stats && stats.weak.length > 0 ? (
          <ul className="divide-y divide-slate-100">
            {stats.weak.map((w) => (
              <li key={w.subject + w.chapter} className="py-2.5 flex items-center justify-between text-sm">
                <span>
                  <span className="font-medium">{w.chapter}</span>
                  <span className="text-slate-500"> · {w.subject}</span>
                </span>
                <span className="text-rose-600 font-semibold">{w.accuracy}% ({w.total} try)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            Jab kisi chapter ke kam se kam 2 questions karoge aur accuracy 70% se kam hogi, wo yahan dikhega.
          </p>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="font-bold mb-3">Recent mock tests</h2>
        {mocks.length ? (
          <ul className="divide-y divide-slate-100">
            {mocks.slice(0, 5).map((m) => (
              <li key={m.id} className="py-2.5 flex items-center justify-between text-sm">
                <span>
                  {EXAM_LABEL[m.exam]} · {new Date(m.ts).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
                <span className="font-semibold">{m.score}/{m.max}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Abhi tak koi mock test nahi diya.</p>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </div>
  );
}
