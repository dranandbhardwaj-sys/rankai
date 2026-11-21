import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">RankAI Pro</h1>

      <div className="bg-white border-2 border-blue-600 rounded-xl p-5 mb-4">
        <div className="font-semibold">Pro Monthly</div>
        <div className="text-3xl font-bold mt-1">
          ₹499<span className="text-sm font-normal text-slate-500"> / month</span>
        </div>
        <ul className="text-sm text-slate-600 mt-3 space-y-1">
          <li>✓ Personalized study plan</li>
          <li>✓ AI doubt solver (Hinglish)</li>
          <li>✓ Practice &amp; mock tests</li>
        </ul>
      </div>

      <a
        href="/api/pay?plan=pro_monthly"
        className="block w-full bg-green-600 text-white text-center py-3 rounded-xl font-semibold"
      >
        Pay ₹499 via UPI
      </a>
      <p className="text-xs text-slate-500 mt-3 text-center">
        Button dabane par aapka UPI app (GPay, PhonePe, Paytm) khulega. Phone par
        hi kaam karta hai. Payment verify hone ke baad Pro activate hoga.
      </p>
    </div>
  );
}
