export type ExamId = "neet" | "jee_main" | "jee_advanced";
export type Subject = "Physics" | "Chemistry" | "Mathematics" | "Biology";
export type QType = "mcq" | "multi" | "numerical";

export interface Question {
  id: string;
  exams: ExamId[];
  subject: Subject;
  chapter: string;
  difficulty: 1 | 2 | 3; // 1 easy, 2 medium, 3 hard
  type: QType;
  q: string;
  options?: string[]; // mcq / multi
  /** mcq: option index, multi: array of option indexes, numerical: the number */
  answer: number | number[];
  /** numerical tolerance (absolute). default 0.01 */
  tol?: number;
  unit?: string;
  explain: string; // Hinglish explanation
}

export type UserAnswer = number | number[] | null;

export interface Profile {
  id: string;
  name: string;
  email?: string;
  exam: ExamId;
  mode: "supabase" | "local";
}

export interface Attempt {
  qid: string;
  correct: boolean;
  ts: number;
  source: "practice" | "mock";
  subject: Subject;
  chapter: string;
}

export interface MockResult {
  id: string;
  ts: number;
  exam: ExamId;
  score: number;
  max: number;
  correct: number;
  wrong: number;
  skipped: number;
  seconds: number;
  bySubject: Record<string, { score: number; max: number; correct: number; total: number }>;
}

export const EXAM_LABEL: Record<ExamId, string> = {
  neet: "NEET",
  jee_main: "JEE Main",
  jee_advanced: "JEE Advanced",
};
