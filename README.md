# RankAI – JEE/NEET AI Study Companion

Next.js 15 + Tailwind frontend MVP for JEE/NEET students.

## Current status (honest)

| Part | Status |
|------|--------|
| Landing page | Done |
| Onboarding (exam + target score, saved in localStorage) | Done |
| Login page (UI) | Done |
| Dashboard (static demo numbers) | Done (UI only) |
| Pricing page | Done (UI only) |
| Supabase Auth / database | Not built yet |
| AI Doubt Solver (Hinglish) | Not built yet |
| Practice questions / Mock tests / Doubt history | Not built yet |
| Razorpay payments | Not built yet |

Packages for Supabase are already in `package.json`, but no code uses them yet.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill values when you add backend features
npm run dev
```

Open http://localhost:3000

## Next steps

1. Supabase: create project, add schema (users, questions, doubts, attempts)
2. Connect Login/Signup to Supabase Auth
3. Add `/api/doubt` route (AI call must stay server-side, never expose the key)
4. Add Razorpay order + signature verification in an API route

## Security notes

- Keep all secret keys in `.env.local` / Vercel Environment Variables only.
- Only `NEXT_PUBLIC_*` variables are visible in the browser.
