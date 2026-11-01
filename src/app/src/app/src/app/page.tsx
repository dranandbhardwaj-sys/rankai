import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <nav className="border-b bg-white/90 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-lg text-slate-900">RankAI</span>
          <div className="flex gap-2">
            <Link href="/login" className="text-sm text-slate-600 px-2 py-2">
              Login
            </Link>
            <Link
              href="/onboarding"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 pt-12 pb-16 text-center">
        <p className="text-sm text-blue-600 font-medium mb-3">
          AI-Powered JEE & NEET
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Your Personal AI Mentor for{" "}
          <span className="text-blue-600">JEE & NEET</span>
        </h1>
        <p className="text-slate-600 mb-8">
          Personalized plans, Hinglish doubt solving, practice and mocks.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/onboarding"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Start Free Now
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold"
          >
            Demo Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
