"use client";

import { isCorrect } from "@/lib/scoring";
import type { Question, UserAnswer } from "@/lib/types";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface Props {
  q: Question;
  value: UserAnswer;
  text: string;
  onChange: (v: UserAnswer, text: string) => void;
  disabled?: boolean;
  reveal?: boolean;
}

export default function QuestionInput({ q, value, text, onChange, disabled = false, reveal = false }: Props) {
  if (q.type === "numerical") {
    const ok = reveal && isCorrect(q, value);
    const wrong = reveal && !ok;
    return (
      <div>
        <p className="text-xs text-slate-500 mb-2">Numerical answer: sirf number likho{q.unit ? ` (unit: ${q.unit})` : ""}.</p>
        <input
          inputMode="decimal"
          value={text}
          disabled={disabled}
          onChange={(e) => {
            const t = e.target.value;
            const n = t.trim() === "" || Number.isNaN(Number(t)) ? null : Number(t);
            onChange(n, t);
          }}
          placeholder="Your answer"
          className={`w-full border-2 rounded-xl px-4 py-3 text-base outline-none focus:border-blue-500 ${
            ok ? "border-emerald-500 bg-emerald-50" : wrong ? "border-rose-500 bg-rose-50" : "border-slate-200 bg-white"
          }`}
        />
      </div>
    );
  }

  const opts = q.options ?? [];
  const selected = Array.isArray(value) ? value : value === null ? [] : [value];
  const correctSet = new Set(Array.isArray(q.answer) ? q.answer : [q.answer as number]);

  return (
    <div>
      {q.type === "multi" && <p className="text-xs text-slate-500 mb-2">Ek ya zyada options sahi ho sakte hain.</p>}
      <div className="space-y-2">
        {opts.map((o, i) => {
          const picked = selected.includes(i);
          let cls = "border-slate-200 bg-white hover:border-blue-300";
          if (reveal) {
            if (correctSet.has(i)) cls = "border-emerald-500 bg-emerald-50";
            else if (picked) cls = "border-rose-500 bg-rose-50";
            else cls = "border-slate-200 bg-white opacity-70";
          } else if (picked) {
            cls = "border-blue-600 bg-blue-50";
          }
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (q.type === "multi") {
                  const next = picked ? selected.filter((x) => x !== i) : [...selected, i].sort();
                  onChange(next.length ? next : null, "");
                } else {
                  onChange(i, "");
                }
              }}
              className={`w-full text-left flex gap-3 items-start border-2 rounded-xl px-3 py-3 text-sm sm:text-base transition-colors ${cls}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                {LETTERS[i]}
              </span>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
