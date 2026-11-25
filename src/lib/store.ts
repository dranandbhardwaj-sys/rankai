import type { Attempt, MockResult, Subject } from "./types";

export interface Progress {
  attempts: Attempt[];
  mocks: MockResult[];
}

const key = (id: string) => `rankai_progress_v2:${id}`;

export function loadProgress(id: string): Progress {
  try {
    const raw = localStorage.getItem(key(id));
    if (raw) {
      const p = JSON.parse(raw) as Progress;
      return { attempts: Array.isArray(p.attempts) ? p.attempts : [], mocks: Array.isArray(p.mocks) ? p.mocks : [] };
    }
  } catch { /* ignore */ }
  return { attempts: [], mocks: [] };
}

function save(id: string, p: Progress) {
  try { localStorage.setItem(key(id), JSON.stringify(p)); } catch { /* storage full/blocked */ }
}

export function addAttempts(id: string, list: Attempt[]) {
  if (!list.length) return;
  const p = loadProgress(id);
  p.attempts = [...p.attempts, ...list].slice(-3000);
  save(id, p);
}

export function addMock(id: string, m: MockResult) {
  const p = loadProgress(id);
  p.mocks = [m, ...p.mocks].slice(0, 50);
  save(id, p);
}

export function resetProgress(id: string) {
  save(id, { attempts: [], mocks: [] });
}

export interface Stats {
  total: number;
  correct: number;
  accuracy: number;
  uniqueSolved: number;
  streak: number;
  bySubject: Record<string, { total: number; correct: number }>;
  weak: { chapter: string; subject: Subject; accuracy: number; total: number }[];
  last7: { label: string; count: number }[];
}

const dayKey = (ts: number) => new Date(ts).toLocaleDateString("en-CA");

export function computeStats(p: Progress): Stats {
  const total = p.attempts.length;
  const correct = p.attempts.filter((a) => a.correct).length;
  const uniqueSolved = new Set(p.attempts.filter((a) => a.correct).map((a) => a.qid)).size;

  const bySubject: Stats["bySubject"] = {};
  const byChapter = new Map<string, { subject: Subject; chapter: string; total: number; correct: number }>();
  for (const a of p.attempts) {
    const s = (bySubject[a.subject] ??= { total: 0, correct: 0 });
    s.total++;
    if (a.correct) s.correct++;
    const ck = a.subject + "|" + a.chapter;
    const c = byChapter.get(ck) ?? { subject: a.subject, chapter: a.chapter, total: 0, correct: 0 };
    c.total++;
    if (a.correct) c.correct++;
    byChapter.set(ck, c);
  }

  const weak = [...byChapter.values()]
    .filter((c) => c.total >= 2)
    .map((c) => ({ chapter: c.chapter, subject: c.subject, total: c.total, accuracy: Math.round((c.correct / c.total) * 100) }))
    .filter((c) => c.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 4);

  const days = new Set(p.attempts.map((a) => dayKey(a.ts)));
  let streak = 0;
  const d = new Date();
  if (!days.has(dayKey(d.getTime()))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d.getTime()))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }

  const last7: Stats["last7"] = [];
  for (let i = 6; i >= 0; i--) {
    const dd = new Date();
    dd.setDate(dd.getDate() - i);
    const k = dayKey(dd.getTime());
    last7.push({
      label: dd.toLocaleDateString("en-IN", { weekday: "short" }),
      count: p.attempts.filter((a) => dayKey(a.ts) === k).length,
    });
  }

  return { total, correct, accuracy: total ? Math.round((correct / total) * 100) : 0, uniqueSolved, streak, bySubject, weak, last7 };
}
