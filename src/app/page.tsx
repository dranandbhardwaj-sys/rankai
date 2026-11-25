import Link from "next/link";
import { QUESTIONS, SUBJECTS } from "@/data/questions";

const FEATURES = [
  { icon: "✍️", title: "Topic-wise Practice", text: "Subject, chapter aur difficulty chuno. Har answer ke baad turant Hinglish explanation." },
  { icon: "⏱️", title: "Timed Mock Tests", text: "NEET / JEE pattern, negative marking, question palette aur subject-wise result analysis." },
  { icon: "🤖", title: "Doubt AI (Hinglish)", text: "Kisi bhi concept par step-by-step jawab, apni bhasha mein." },
  { icon: "📈", title: "Progress & Weak Chapters", text: "Accuracy, streak aur kamzor chapters ki list, taaki revision sahi jagah ho." },
];

export default function HomePage() {
  const counts = SUBJECTS.map((s) => ({ s, n: QUESTIONS.filter((q) => q.subject === s).length }));

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-extrabold text-xl tracking-tight">
            Rank<span className="text-blue-600">AI</span>
          </span>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-sm font-medium text-slate-600 px-3 py-2">Login</Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <div className="max-w-4xl mx-auto px-4 pt-14 pb-16 text-center">
          <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-100 rounded-full px-3 py-1 mb-4">
            NEET · JEE Main · JEE Advanced
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Rank banane ka <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">smart tareeka</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
            {QUESTIONS.length}+ practice questions, har ek explanation ke saath. Timed mock tests, progress tracking aur Hinglish Doubt AI, ek hi app mein.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-2xl font-semibold shadow-lg shadow-blue-600/20">
              Free mein shuru karo
            </Link>
            <Link href="/login" className="bg-white border border-slate-300 text-slate-700 px-7 py-3.5 rounded-2xl font-semibold hover:bg-slate-50">
              Login
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {counts.map(({ s, n }) => (
              <div key={s} className="bg-white/80 border border-slate-200 rounded-2xl py-3">
                <div className="text-2xl font-extrabold text-slate-900">{n}</div>
                <div className="text-xs text-slate-500">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10">Taiyari ke liye sab kuch</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 text-white p-8 text-center">
          <h2 className="text-2xl font-extrabold">Aaj hi pehla test do</h2>
          <p className="text-blue-200 mt-2 text-sm">Sign up free hai. Guest ki tarah bhi try kar sakte ho.</p>
          <Link href="/signup" className="inline-block mt-5 bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl">
            Account banao
          </Link>
        </div>
        <p className="text-xs text-slate-400 text-center mt-6">
          Questions original hain (exam pattern par based), kisi official paper ki copy nahi. RankAI kisi exam body se affiliated nahi hai.
        </p>
      </section>

      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} RankAI
        </div>
      </footer>
    </div>
  );
}
