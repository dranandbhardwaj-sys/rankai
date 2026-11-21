import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">RankAI Pro</h1>

      <div className="bg-white border rounded-xl p-6 text-center">
        <div className="text-3xl mb-3">🚀</div>
        <h2 className="font-semibold text-lg mb-2">Pro plans coming soon</h2>
        <p className="text-sm text-slate-600">
          Abhi sab features free hain. Paid plans jald hi aayenge.
        </p>
      </div>
    </div>
  );
}
