# RankAI – JEE/NEET AI Study Companion

Complete MVP with **Auth, AI, Practice (DB), Doubt History, and Payments**.

---

## Features

| Feature | Status |
|---------|--------|
| Landing + Onboarding | ✅ |
| Dashboard | ✅ |
| AI Doubt Solver (Hinglish) | ✅ Real AI |
| **Doubt History** (saved per user) | ✅ |
| **Practice from DB** (+ fallback) | ✅ |
| Mock Tests | ✅ |
| AI Study Plan | ✅ |
| Supabase Auth | ✅ |
| Full Schema + Seed | ✅ |
| **Razorpay Payments** | ✅ |
| Guest / Demo mode | ✅ |

---

## Quick Start

```bash
cd rankai
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

---

## Environment

```env
# AI
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Razorpay (optional – demo mode works without)
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
```

---

## Setup Steps

### 1. Database
1. Supabase → SQL Editor
2. Run `supabase/migrations/001_initial_schema.sql`
3. Run `scripts/seed.sql`

### 2. Auth
- Email provider enabled by default in Supabase
- Login / Signup works at `/login`
- Guest mode available

### 3. Payments
- Add Razorpay test keys for real checkout
- Without keys → **Demo payment** succeeds and shows success message
- Plans: Monthly ₹499, Quarterly ₹1199, 30-Day Crash ₹1499

---

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing |
| `/login` | Login + Signup |
| `/onboarding` | Exam preferences |
| `/dashboard` | Main hub |
| `/dashboard/doubt` | AI doubts + history |
| `/dashboard/practice` | Questions from DB |
| `/dashboard/plan` | AI study plan |
| `/dashboard/mocks` | Mock tests |
| `/pricing` | Pro plans + Razorpay |

---

## API Endpoints

- `POST /api/ai/doubt` – AI doubt solving
- `POST /api/ai/plan` – Generate study plan
- `POST /api/ai/analyze` – Mock analysis
- `GET  /api/questions` – Fetch questions (DB + fallback)
- `POST /api/doubts` – Save doubt history
- `GET  /api/doubts` – Get user doubt history
- `POST /api/payments/create-order` – Razorpay order
- `POST /api/payments/verify` – Verify payment

---

## Project Structure

```
rankai/
├── src/app/
│   ├── api/
│   │   ├── ai/           # Doubt, Plan, Analyze
│   │   ├── questions/    # Practice questions
│   │   ├── doubts/       # History
│   │   └── payments/     # Razorpay
│   ├── dashboard/
│   ├── pricing/          # Upgrade page
│   ├── login/
│   └── onboarding/
├── src/lib/
│   ├── ai/
│   ├── supabase/
│   └── auth/
├── supabase/migrations/
├── scripts/seed.sql
└── .env.example
```

---

## Notes

- **Practice**: Uses Supabase `questions` table. Falls back to sample questions if DB empty.
- **Doubt History**: Saved only when user is logged in.
- **Payments**: Fully functional with Razorpay. Demo mode for testing without keys.

---

Ready for real users. Next possible upgrades: more PYQs, parent dashboard, mobile app.
