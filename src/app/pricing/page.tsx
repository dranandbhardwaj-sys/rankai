"use client";

import { useState } from "react";
import Link from "next/link";

const UPI_ID = "9162172649@ybl";

const PLANS = [
  { id: "pro_monthly", name: "Pro Monthly", price: 499 },
  { id: "pro_quarterly", name: "Pro Quarterly", price: 1199 },
  { id: "crash_30", name: "30-Day Crash", price: 1499 },
];

export default function PricingPage() {
  const [selected, setSelected] = useState(PLANS[1]);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
    }
  };

  const markPaid = () => {
    localStorage.setItem(
      "rankai_pro",
      JSON.stringify({
        planId: selected.id,
        amount: selected.price,
        at: new Date().toISOString(),
      })
    );
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">RankAI Pro</h1>

      <div className="space-y-3 mb-6">
        {PLANS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(p)}
            className={`w-full text-left p-4 rounded-xl border-2 ${
              selected.id === p.id
                ? "border-blue-600 bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="font-semibold">{p.name}</div>
            <div className="text-lg font-bold">₹{p.price}</div>
          </button>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-4 space-y-3">
        <div className="font-medium text-sm">Pay via UPI</div>
        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
          <code className="flex-1 text-sm">{UPI_ID}</code>
          <button
            type="button"
            onClick={copyUpi}
            className="text-xs text-blue-600 font-medium"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Amount: ₹{selected.price} · {selected.name}
        </p>
        <button
          type="button"
          onClick={markPaid}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
        >
          {done ? "Activated" : "I have paid – Activate Pro"}
        </button>
      </div>
    </div>
  );
}
