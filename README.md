# RankAI – NEET & JEE Prep App

Next.js 15 + Tailwind app for NEET / JEE Main / JEE Advanced aspirants.

## What works today

| Feature | Status |
|---------|--------|
| Landing page, Sign up, Login, Guest mode | Done |
| Real cloud login (Supabase Auth) | Works once Supabase keys are set (see below) |
| Demo mode (no keys): account stored only in this browser | Done |
| Question bank: 79 original questions (Physics 18, Chemistry 18, Maths 19, Biology 24) with Hinglish explanations | Done |
| Practice: filter by subject / chapter / difficulty, instant feedback | Done |
| Timed mock tests: palette, mark for review, negative marking, result + answer review | Done |
| Dashboard: accuracy, streak, subject-wise bars, weak chapters, last 7 days, mock history | Done |
| Doubt AI (Hinglish) | Works once `OPENAI_API_KEY` is set on the server |
| Progress sync across devices | Not yet (progress is saved in the browser's localStorage) |
| Payments | Not built (all features are free) |

## Question bank

- File: `src/data/questions.ts`. Types: single-correct MCQ, multi-correct (JEE Advanced style) and numerical.
- All questions are **original** (written in the style of the exam patterns). They are not copied from any official paper.
- `npm test` re-computes all numeric answers independently (`scripts/verify-questions.mjs`) and checks the scoring logic (`scripts/test-scoring.ts`). Run it after adding or editing questions.
- NEET has 43 questions available (Physics, Chemistry, Biology); JEE has Maths too. The bank is a strong start, not the full syllabus: keep adding questions chapter by chapter.

## Marking (simplified from the official patterns)

- NEET: +4 / −1.
- JEE Main: MCQ +4 / −1, numerical +4 / 0.
- JEE Advanced: MCQ +3 / −1, multi-correct +4 (all correct only) / −2, numerical +3 / 0.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: add keys
npm run dev
```

Open http://localhost:3000

## Enable real login (Supabase)

1. Create a project at supabase.com → Project Settings → API.
2. Put `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` (and in Vercel → Environment Variables).
3. Authentication → Providers → Email is on by default. If email confirmation is on, new users must click the link in their email before logging in.

User name and exam are stored in Supabase `user_metadata`; no database tables are needed yet.

## Enable Doubt AI

Set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`, default `gpt-4o-mini`) on the server. The route `/api/doubt` has a rate limit (8 requests/minute per IP) and a 1200-character limit. When Supabase is configured, only logged-in users can call it, so strangers cannot spend your API credits. Without Supabase keys, anyone who finds the URL can use it (rate-limited), so set both before going public.

## Security notes

- Keep all secret keys in `.env.local` / Vercel Environment Variables only. Only `NEXT_PUBLIC_*` values are visible in the browser.
- Demo-mode accounts do not store passwords and are not secure; they exist only so the app can be tried without keys.

## Next steps

1. Add more questions (target 300+ with a chapter-wise balance).
2. Supabase tables for attempts and mock results, to sync progress across devices.
3. Razorpay payments with server-side signature verification (only if you add paid plans).
