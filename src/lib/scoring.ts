import { QUESTIONS, SUBJECTS, questionsFor } from "@/data/questions";
import type { ExamId, QType, Question, UserAnswer } from "./types";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function isAttempted(a: UserAnswer | undefined): boolean {
  return a !== null && a !== undefined && !(Array.isArray(a) && a.length === 0);
}

export function isCorrect(q: Question, a: UserAnswer | undefined): boolean {
  if (!isAttempted(a)) return false;
  if (q.type === "numerical") {
    return typeof a === "number" && Math.abs(a - (q.answer as number)) <= (q.tol ?? 0.01);
  }
  if (q.type === "multi") {
    if (!Array.isArray(a)) return false;
    const want = [...(q.answer as number[])].sort().join(",");
    return [...a].sort().join(",") === want;
  }
  return a === q.answer;
}

/** Simplified marking scheme based on the official pattern. */
export function marking(exam: ExamId, type: QType): { correct: number; wrong: number } {
  if (exam === "neet") return { correct: 4, wrong: -1 };
  if (exam === "jee_main") return type === "numerical" ? { correct: 4, wrong: 0 } : { correct: 4, wrong: -1 };
  if (type === "numerical") return { correct: 3, wrong: 0 };
  if (type === "multi") return { correct: 4, wrong: -2 };
  return { correct: 3, wrong: -1 };
}

export function marksFor(exam: ExamId, q: Question, a: UserAnswer | undefined): number {
  if (!isAttempted(a)) return 0;
  const m = marking(exam, q.type);
  return isCorrect(q, a) ? m.correct : m.wrong;
}

export function maxMarks(exam: ExamId, q: Question): number {
  return marking(exam, q.type).correct;
}

export function minutesFor(exam: ExamId, n: number): number {
  const perQuestion = exam === "neet" ? 1 : exam === "jee_main" ? 2 : 2.5;
  return Math.max(5, Math.ceil(n * perQuestion));
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Full paper: subject-wise sections, random order inside each section. */
export function buildPaper(exam: ExamId): Question[] {
  const pool = questionsFor(exam);
  return SUBJECTS.flatMap((s) => shuffle(pool.filter((q) => q.subject === s)));
}

export function formatCorrect(q: Question): string {
  if (q.type === "numerical") return `${q.answer}${q.unit ? " " + q.unit : ""}`;
  const idx = Array.isArray(q.answer) ? q.answer : [q.answer as number];
  return idx.map((i) => `${LETTERS[i]}. ${q.options?.[i] ?? ""}`).join("  |  ");
}

export function formatUser(q: Question, a: UserAnswer | undefined): string {
  if (!isAttempted(a)) return "Not attempted";
  if (q.type === "numerical") return String(a);
  const idx = Array.isArray(a) ? a : [a as number];
  return idx.map((i) => `${LETTERS[i]}. ${q.options?.[i] ?? ""}`).join("  |  ");
}

export const TOTAL_QUESTIONS = QUESTIONS.length;
