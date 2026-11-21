"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Q = {
  subject: "Physics" | "Chemistry" | "Maths" | "Biology";
  q: string;
  options: string[];
  answer: number;
};

const BANK: Q[] = [
  { subject: "Physics", q: "SI unit of force kya hai?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1 },
  { subject: "Physics", q: "Earth par g ka lagbhag maan kitna hota hai?", options: ["9.8 m/s²", "98 m/s²", "0.98 m/s²", "19.6 m/s²"], answer: 0 },
  { subject: "Chemistry", q: "Carbon ka atomic number kitna hai?", options: ["4", "6", "8", "12"], answer: 1 },
  { subject: "Chemistry", q: "25°C par pure water ka pH kitna hota hai?", options: ["0", "5", "7", "14"], answer: 2 },
  { subject: "Maths", q: "sin x ka derivative kya hai?", options: ["−cos x", "cos x", "−sin x", "tan x"], answer: 1 },
  { subject: "Maths", q: "sin 30° ka maan kitna hai?", options: ["1/2", "√3/2", "1", "0"], answer: 0 },
  { subject: "Biology", q: "Cell ka powerhouse kise kehte hain?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], answer: 2 },
  { subject: "Biology", q: "Heredity ki basic unit kya hai?", options: ["Gene", "Protein", "Lipid", "Enzyme"], answer: 0 },
];

export default function PracticePage() {
  const [exam, setExam] = useState("jee_main");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rankai_user");
      const u = saved ? JSON.parse(saved) : null;
      if (u?.exam) setExam(u.exam);
    } catch {}
  }, []);

  const questions = useMemo(
    () =>
      BANK.filter((x) =>
        exam === "neet" ? x.subject !== "Maths" : x.subject !== "Biology"
      ),
    [exam]
  );

  const q = questions[i];

  const next = () => {
    if (i + 1 >= questions.length) setFinished(true);
    else {
      setI(i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">Practice</h1>

      {finished ? (
        <div className="bg-white border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold mb-1">
            {score} / {questions.length}
          </div>
          <p className="text-sm text-slate-600 mb-4">Aapka score</p>
          <button
            type="button"
            onClick={restart}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            Dobara try karo
          </button>
        </div>
      ) : (
        q && (
          <div className="bg-white border rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">
              {q.subject} · {i + 1} / {questions.length}
            </div>
            <p className="font-medium mb-4">{q.q}</p>
            <div className="space-y-2">
              {q.options.map((o, idx) => {
                const done = picked !== null;
                const cls = !done
                  ? "border-slate-200"
                  : idx === q.answer
                  ? "border-green-600 bg-green-50"
                  : idx === picked
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200";
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={done}
                    onClick={() => {
                      setPicked(idx);
                      if (idx === q.answer) setScore((s) => s + 1);
                    }}
                    className={`w-full text-left p-3 rounded-xl border-2 text-sm ${cls}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <button
                type="button"
                onClick={next}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-4"
              >
                {i + 1 >= questions.length ? "Result dekho" : "Agla sawal"}
              </button>
            )}
          </div>
        )
      )}
    </div>
  );
}
