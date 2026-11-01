import Link from "next/link";

export default function HomePage() {
return (
<div className="min-h-screen bg-slate-50">
{/* Navbar */}
<nav className="border-b bg-white/90 sticky top-0 z-50">
<div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
<span className="font-bold text-lg text-slate-900">
RankAI
</span>

      <div className="flex gap-2">
        <Link
          href="/login"
          className="text-sm text-slate-600 px-2 py-2"
        >
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

  {/* Hero Section */}
  <section className="max-w-3xl mx-auto px-4 pt-12 pb-16 text-center">
    <p className="text-sm text-blue-600 font-medium mb-3">
      AI-Powered JEE &amp; NEET
    </p>

    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
      Your Personal AI Mentor for{" "}
      <span className="text-blue-600">JEE &amp; NEET</span>
    </h1>

    <p className="text-slate-600 mb-8">
      Personalized plans, Hinglish doubt solving, practice and mocks.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-3">
      <Link
        href="/onboarding"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
      >
        Start Learning Free
      </Link>

      <Link
        href="/login"
        className="border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100"
      >
        Login to Dashboard
      </Link>
    </div>
  </section>

  {/* Features */}
  <section className="max-w-6xl mx-auto px-4 pb-16">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border">
        <div className="text-2xl mb-3">📚</div>
        <h2 className="font-bold text-lg mb-2">
          Personalized Study Plans
        </h2>
        <p className="text-sm text-slate-600">
          Create a study schedule based on your goals and preparation level.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <div className="text-2xl mb-3">🤖</div>
        <h2 className="font-bold text-lg mb-2">
          AI Doubt Solver
        </h2>
        <p className="text-sm text-slate-600">
          Get help with JEE and NEET questions in simple Hinglish.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <div className="text-2xl mb-3">📝</div>
        <h2 className="font-bold text-lg mb-2">
          Practice & Mock Tests
        </h2>
        <p className="text-sm text-slate-600">
          Practice questions and track your preparation progress.
        </p>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="border-t bg-white">
    <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} RankAI. All rights reserved.
    </div>
  </footer>
</div>

);
}
