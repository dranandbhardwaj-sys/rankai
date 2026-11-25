"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProfile } from "@/lib/useProfile";
import QuestionInput from "@/components/QuestionInput";
import { questionsFor } from "@/data/questions";
import {
  buildPaper, formatCorrect, formatUser, isAttempted, isCorrect, marksFor, maxMarks, minutesFor,
} from "@/lib/scoring";
import { addAttempts, addMock, loadProgress } from "@/lib/store";
import { EXAM_LABEL, type MockResult, type Question, type UserAnswer } from "@/lib/types";

type Phase = "setup" | "running" | "result";

const fmt = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h ? h + ":" : ""}${String(m).padStart(h ? 2 : 1, "0")}:${String(sec).padStart(2, "0")}`;
};

export default function MockPage() {
  const { profile } = useProfile();
  const exam = profile.exam;

  const [phase, setPhase] = useState<Phase>("setup");
  const [paper, setPaper] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [idx, setIdx] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const [startedAt, setStartedAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState<MockResult | null>(null);
  const [past, setPast] = useState<MockResult[]>([]);
  const submitted = useRef(false);

  useEffect(() => {
    setPast(loadProgress(profile.id).mocks);
  }, [profile.id, phase]);

  const poolCount = questionsFor(exam).length;
  const minutes = minutesFor(exam, poolCount);

  function start() {
    const p = buildPaper(exam);
    submitted.current = false;
    setPaper(p);
    setAnswers({});
    setTexts({});
    setMarked({});
    setIdx(0);
    const now = Date.now();
    setStartedAt(now);
    setEndAt(now + minutesFor(exam, p.length) * 60000);
    setLeft(minutesFor(exam, p.length) * 60);
    setResult(null);
    setPhase("running");
  }

  const submit = useCallback(() => {
    if (submitted.current) return;
    submitted.current = true;

    const bySubject: MockResult["bySubject"] = {};
    let score = 0, max = 0, correct = 0, wrong = 0, skipped = 0;
    const attempts = [];
    for (const q of paper) {
      const a = answers[q.id];
      const mx = maxMarks(exam, q);
      max += mx;
      const s = (bySubject[q.subject] ??= { score: 0, max: 0, correct: 0, total: 0 });
      s.max += mx;
      s.total++;
      if (!isAttempted(a)) { skipped++; continue; }
      const ok = isCorrect(q, a);
      const m = marksFor(exam, q, a);
      score += m;
      s.score += m;
      if (ok) { correct++; s.correct++; } else wrong++;
      attempts.push({ qid: q.id, correct: ok, ts: Date.now(), source: "mock" as const, subject: q.subject, chapter: q.chapter });
    }
    const r: MockResult = {
      id: String(Date.now()),
      ts: Date.now(),
      exam,
      score,
      max,
      correct,
      wrong,
      skipped,
      seconds: Math.round((Date.now() - startedAt) / 1000),
      bySubject,
    };
    addAttempts(profile.id, attempts);
    addMock(profile.id, r);
    setResult(r);
    setPhase("result");
  }, [paper, answers, exam, startedAt, profile.id]);

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) submit();
    }, 1000);
    return () => clearInterval(t);
  }, [phase, endAt, submit]);

  /* ---------------- SETUP ---------------- */
  if (phase === "setup") {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold">Mock Test</h1>
          <p className="text-sm text-slate-500">{EXAM_LABEL[exam]} pattern par timed test.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <Info label="Questions" value={String(poolCount)} />
            <Info label="Time" value={`${minutes} min`} />
            <Info label="Exam" value={EXAM_LABEL[exam]} />
          </div>
          <div className="rounded-xl bg-slate-50 p-3 text-slate-700 space-y-1">
            <p className="font-semibold">Marking scheme</p>
            {exam === "neet" && <p>Har sahi: +4, galat: −1, chhoda hua: 0.</p>}
            {exam === "jee_main" && <p>MCQ: +4 / −1. Numerical: +4, galat par negative nahi. Chhoda hua: 0.</p>}
            {exam === "jee_advanced" && <p>MCQ: +3 / −1. Multi-correct: +4 (sirf sab sahi options par) / −2. Numerical: +3, negative nahi.</p>}
            <p className="text-xs text-slate-500">
              Ye asli exam ka simplified pattern hai. Questions subject-wise sections mein aayenge.
            </p>
          </div>
          <button onClick={start} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
            Test shuru karo
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold mb-3">Pichhle mock tests</h2>
          {past.length ? (
            <ul className="divide-y divide-slate-100 text-sm">
              {past.slice(0, 8).map((m) => (
                <li key={m.id} className="py-2.5 flex justify-between">
                  <span>{EXAM_LABEL[m.exam]} · {new Date(m.ts).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</span>
                  <span className="font-semibold">{m.score}/{m.max}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">Abhi koi mock nahi diya.</p>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- RESULT ---------------- */
  if (phase === "result" && result) {
    const pct = result.max ? Math.round((result.score / result.max) * 100) : 0;
    return (
      <div className="space-y-5">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 text-white p-6">
          <p className="text-blue-200 text-sm">{EXAM_LABEL[result.exam]} mock result</p>
          <div className="text-5xl font-extrabold mt-1">{result.score}<span className="text-2xl text-blue-200"> / {result.max}</span></div>
          <p className="text-blue-200 text-sm mt-1">{pct}% · time: {fmt(result.seconds)}</p>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
            <div className="bg-white/10 rounded-xl py-2"><div className="font-bold text-lg">{result.correct}</div>Sahi</div>
            <div className="bg-white/10 rounded-xl py-2"><div className="font-bold text-lg">{result.wrong}</div>Galat</div>
            <div className="bg-white/10 rounded-xl py-2"><div className="font-bold text-lg">{result.skipped}</div>Skip</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold mb-3">Subject-wise</h2>
          <div className="space-y-3">
            {Object.entries(result.bySubject).map(([s, v]) => (
              <div key={s} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{s}</span>
                  <span className="text-slate-500">{v.score}/{v.max} · {v.correct}/{v.total} sahi</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${v.max ? Math.max(0, (v.score / v.max) * 100) : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="font-bold mb-3">Answer review</h2>
          <div className="space-y-2">
            {paper.map((q, n) => {
              const a = answers[q.id];
              const att = isAttempted(a);
              const ok = isCorrect(q, a);
              return (
                <details key={q.id} className="border border-slate-200 rounded-xl p-3 text-sm">
                  <summary className="cursor-pointer flex items-start gap-2">
                    <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-md ${!att ? "bg-slate-100 text-slate-600" : ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                      {!att ? "Skip" : ok ? "Sahi" : "Galat"}
                    </span>
                    <span><span className="text-slate-400">Q{n + 1}.</span> {q.q}</span>
                  </summary>
                  <div className="mt-2 space-y-1 text-slate-700">
                    <p><span className="font-semibold">Tumhara answer:</span> {formatUser(q, a)}</p>
                    <p><span className="font-semibold">Sahi answer:</span> {formatCorrect(q)}</p>
                    <p className="bg-slate-50 rounded-lg p-2">{q.explain}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        <button onClick={() => setPhase("setup")} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
          Wapas Mock Test page par
        </button>
      </div>
    );
  }

  /* ---------------- RUNNING ---------------- */
  const q = paper[idx];
  if (!q) return null;
  const urgent = left <= 300;

  return (
    <div className="space-y-4">
      <div className="sticky top-14 z-30 -mx-4 px-4 py-2 bg-slate-50/95 backdrop-blur flex items-center justify-between">
        <div className="text-sm text-slate-600">Q {idx + 1}/{paper.length} · {q.subject}</div>
        <div className={`font-mono font-bold text-lg px-3 py-1 rounded-lg ${urgent ? "bg-rose-100 text-rose-700" : "bg-white border border-slate-200"}`}>
          ⏱ {fmt(left)}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_220px] gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <p className="font-medium text-base sm:text-lg leading-relaxed">{q.q}</p>
          <QuestionInput
            q={q}
            value={answers[q.id] ?? null}
            text={texts[q.id] ?? ""}
            onChange={(v, t) => {
              setAnswers((a) => ({ ...a, [q.id]: v }));
              setTexts((x) => ({ ...x, [q.id]: t }));
            }}
          />
          <div className="flex flex-wrap gap-2 pt-1">
            <button disabled={idx === 0} onClick={() => setIdx((n) => n - 1)} className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm disabled:opacity-40">← Prev</button>
            <button
              onClick={() => { setAnswers((a) => ({ ...a, [q.id]: null })); setTexts((x) => ({ ...x, [q.id]: "" })); }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => setMarked((m) => ({ ...m, [q.id]: !m[q.id] }))}
              className={`px-4 py-2.5 rounded-xl border text-sm ${marked[q.id] ? "border-violet-500 bg-violet-50 text-violet-700" : "border-slate-300"}`}
            >
              {marked[q.id] ? "Marked ✓" : "Mark for review"}
            </button>
            <button
              disabled={idx >= paper.length - 1}
              onClick={() => setIdx((n) => n + 1)}
              className="ml-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>

        <aside className="bg-white border border-slate-200 rounded-2xl p-4 h-fit">
          <p className="text-xs font-semibold text-slate-500 mb-2">Question palette</p>
          <div className="grid grid-cols-6 lg:grid-cols-5 gap-1.5">
            {paper.map((p, n) => {
              const att = isAttempted(answers[p.id]);
              let cls = "bg-slate-100 text-slate-600";
              if (marked[p.id]) cls = "bg-violet-500 text-white";
              else if (att) cls = "bg-emerald-500 text-white";
              return (
                <button
                  key={p.id}
                  onClick={() => setIdx(n)}
                  className={`h-8 rounded-md text-xs font-semibold ${cls} ${n === idx ? "ring-2 ring-blue-600 ring-offset-1" : ""}`}
                >
                  {n + 1}
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-slate-500 mt-3 space-y-0.5">
            <p><span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500 mr-1" />Answered</p>
            <p><span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-500 mr-1" />Marked</p>
            <p><span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-200 mr-1" />Not answered</p>
          </div>
          <button
            onClick={() => {
              const n = paper.filter((p) => !isAttempted(answers[p.id])).length;
              if (window.confirm(n ? `${n} questions abhi baaki hain. Phir bhi submit karna hai?` : "Test submit karna hai?")) submit();
            }}
            className="w-full mt-4 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-sm font-semibold"
          >
            Submit test
          </button>
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 py-3">
      <div className="text-lg font-extrabold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
