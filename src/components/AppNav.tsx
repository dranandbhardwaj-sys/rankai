"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/lib/useProfile";
import { updateExam } from "@/lib/auth";
import { EXAM_LABEL, type ExamId } from "@/lib/types";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/practice", label: "Practice", icon: "✍️" },
  { href: "/mock", label: "Mock Test", icon: "⏱️" },
  { href: "/doubt", label: "Doubt AI", icon: "🤖" },
];

export default function AppNav() {
  const path = usePathname();
  const { profile, refresh, logout } = useProfile();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="font-extrabold text-lg tracking-tight">
            Rank<span className="text-blue-600">AI</span>
          </Link>

          <nav className="hidden sm:flex gap-1 ml-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  path.startsWith(l.href) ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <select
              aria-label="Exam"
              value={profile.exam}
              onChange={async (e) => {
                await updateExam(e.target.value as ExamId);
                await refresh();
              }}
              className="border border-slate-200 rounded-lg px-2 py-1.5 text-xs sm:text-sm bg-white"
            >
              {(Object.keys(EXAM_LABEL) as ExamId[]).map((id) => (
                <option key={id} value={id}>
                  {EXAM_LABEL[id]}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={logout}
              className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 px-2 py-1.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 safe-bottom">
        <div className="grid grid-cols-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex flex-col items-center py-2 text-[11px] font-medium ${
                path.startsWith(l.href) ? "text-blue-700" : "text-slate-500"
              }`}
            >
              <span className="text-lg leading-none mb-0.5">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
