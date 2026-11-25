"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/useProfile";
import QuestionInput from "@/components/QuestionInput";
import { SUBJECTS, questionsFor } from "@/data/questions";
import { formatCorrect, isAttempted, isCorrect, shuffle } from "@/lib/scoring";
import { addAttempts } from "@/lib/store";
import type { Subject, UserAnswer } from "@/lib/types";

const DIFF_LABEL = ["Easy", "Medium", "Hard"];
const DIFF_CLS = ["bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"];

export default function PracticePage() {
  const { profile } = useProfile();
  const pool = useMemo(() => questionsFor(profile.exam), [profile.exam]);
  const subjects = useMemo(() => SUBJECTS.filter((s) => pool.some((q) => q.subject === s)), [pool]);

  const [subject, setSubject] = useState<"All" | Subject>("All");
  const [chapter, setChapter] = useState("All");
  const [diff, setDiff] = useState<0 | 1 | 2 | 3>(0);
  const [seed, setSeed] = useState(0);

  const [i, setI] = useState(0);
  const [value, setValue] = useState<UserAnswer>(null);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const [session, setSession] = useState({ done: 0, right: 0 });

  const chapters = useMemo(
    () => [...new Set(pool.filter((q) => subject === "All" || q.subject === subject).map((q) => q.chapter))].sort(),
    [pool, subject]
  );

  const list = useMemo(() => {
    const l = pool.filter(
      (q) =>
        (subject === "All" || q.subject === subject) &&
        (chapter === "All" || q.chapter === chapter) &&
        (diff === 0 || q.difficulty === diff)
    );
    return shuffle(l);
    // seed forces a fresh shuffle on "Shuffle again"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, subject, chapter, diff, seed]);

  useEffect(() => {
    setI(0);
    setValue(null);
    setText("");
    setChecked(false);
    setSession({ done: 0, right: 0 });
  }, [list]);

  const q = list[i];
  const finished = list.length > 0 && i >= list.length;

  function check() {
    if (!q || checked || !isAttempted(value)) return;
    const ok = isCorrect(q, value);
    addAttempts(profile.id, [{ qid: q.id, correct: ok, ts: Date.now(), source: "practice", subject: q.subject, chapter: q.chapter }]);
    setChecked(true);
    setSession((s) => ({ done: s.done + 1, right: s.right + (ok ? 1 : 0) }));
  }

  function next() {
    setI((n) => n + 1);
    setValue(null);
    setText("");
    setChecked(false);
  }

  const ok = q && checked ? isCorrect(q, value) : false;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold">Practice</h1>
        <p className="text-sm text-slate-500">Subject, chapter aur difficulty chuno. Har answer ke baad turant explanation milega.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 grid sm:grid-cols-3 gap-3">
        <label className="text-xs text-slate-500">
          Subject
          <select
            value={subject}
            onChange={(e) => { setSubject(e.target.value as "All" | Subject); setChapter("All"); }}
            className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900 bg-white"
          >
            <option value="All">All subjects</option>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-xs text-slate-500">
          Chapter
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900 bg-white"
          >
            <option value="All">All chapters</option>
            {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="text-xs text-slate-500">
          Difficulty
          <select
            value={diff}
            onChange={(e) => setDiff(Number(e.target.value) as 0 | 1 | 2 | 3)}
            className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-900 bg-white"
          >
            <option value={0}>Any</option>
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
          </select>
        </label>
      </div>

      {list.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-sm text-slate-500">
          Is filter mein koi question nahi mila. Filter badal kar dekho.
        </div>
      )}

      {finished && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3">
          <div className="text-4xl">🎉</div>
          <h2 className="font-bold text-lg">Round complete!</h2>
          <p className="text-sm text-slate-600">
            {session.right}/{session.done} sahi ({session.done ? Math.round((session.right / session.done) * 100) : 0}%)
          </p>
          <button onClick={() => setSeed((s) => s + 1)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm">
            Dobara shuffle karke karo
          </button>
        </div>
      )}

      {q && !finished && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-md bg-slate-100 font-semibold">{q.subject}</span>
              <span className="text-slate-500">{q.chapter}</span>
              <span className={`px-2 py-1 rounded-md font-semibold ${DIFF_CLS[q.difficulty - 1]}`}>{DIFF_LABEL[q.difficulty - 1]}</span>
            </div>
            <span className="text-slate-500 shrink-0">{i + 1}/{list.length}</span>
          </div>

          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: `${(i / list.length) * 100}%` }} />
          </div>

          <p className="font-medium text-base sm:text-lg leading-relaxed">{q.q}</p>

          <QuestionInput
            q={q}
            value={value}
            text={text}
            onChange={(v, t) => { setValue(v); setText(t); }}
            disabled={checked}
            reveal={checked}
          />

          {checked && (
            <div className={`rounded-xl p-4 text-sm ${ok ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
              <p className="font-bold mb-1">{ok ? "✅ Sahi jawab!" : "❌ Galat jawab"}</p>
              {!ok && <p className="mb-1"><span className="font-semibold">Sahi answer:</span> {formatCorrect(q)}</p>}
              <p className="text-slate-700">{q.explain}</p>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            {!checked ? (
              <>
                <button
                  onClick={check}
                  disabled={!isAttempted(value)}
                  className="flex-1 bg-blue-600 disabled:opacity-40 text-white py-3 rounded-xl font-semibold"
                >
                  Check answer
                </button>
                <button onClick={next} className="px-4 py-3 rounded-xl border border-slate-300 text-slate-600 text-sm font-medium">
                  Skip
                </button>
              </>
            ) : (
              <button onClick={next} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold">
                {i + 1 >= list.length ? "Finish" : "Next question →"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
