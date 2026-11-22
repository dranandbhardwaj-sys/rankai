"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPro, supabase, type ProStatus } from "@/lib/supabase";

type Req = { utr: string; status: string };

export default function PricingPage() {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [pro, setPro] = useState<ProStatus>({ active: false });
  const [reqs, setReqs] = useState<Req[]>([]);
  const [utr, setUtr] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const sb = supabase();
    const { data } = await sb.auth.getSession();
    const u = data.session?.user;
    if (u) {
      setUserId(u.id);
      setPro(await fetchPro(u.id));
      const r = await sb
        .from("payment_requests")
        .select("utr, status")
        .order("created_at", { ascending: false })
        .limit(3);
      setReqs((r.data as Req[]) ?? []);
    }
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    setError("");
    if (!/^\d{12}$/.test(utr)) {
      setError("UTR / Transaction ID 12 digits ka hota hai.");
      return;
    }
    setSaving(true);
    const { error } = await supabase()
      .from("payment_requests")
      .insert({ plan_id: "pro_monthly", amount: 499, utr });
    setSaving(false);
    if (error) {
      setError(
        error.code === "23505"
          ? "Ye UTR pehle hi use ho chuka hai."
          : "Save nahi hua. Dobara try karo."
      );
      return;
    }
    setUtr("");
    load();
  };

  const pending = reqs.some((r) => r.status === "pending");

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
      <Link href="/dashboard" className="text-sm text-blue-600">
        ← Dashboard
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-4">RankAI Pro</h1>

      <div className="bg-white border-2 border-blue-600 rounded-xl p-5 mb-4">
        <div className="font-semibold">Pro Monthly</div>
        <div className="text-3xl font-bold mt-1">
          ₹499
          <span className="text-sm font-normal text-slate-500"> / 30 din</span>
        </div>
        <ul className="text-sm text-slate-600 mt-3 space-y-1">
          <li>✓ Personalized study plan</li>
          <li>✓ AI doubt solver (roz 50 sawal)</li>
          <li>✓ Practice &amp; mock tests</li>
        </ul>
      </div>

      {!ready ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : !userId ? (
        <Link
          href="/login"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold"
        >
          Pehle login karo
        </Link>
      ) : pro.active ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          Pro active hai
          {pro.expiresAt &&
            ` · ${new Date(pro.expiresAt).toLocaleDateString("en-IN")} tak`}
        </div>
      ) : (
        <div className="space-y-3">
          <a
            href="/api/pay?plan=pro_monthly"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-xl font-semibold"
          >
            1. Pay ₹499 via UPI
          </a>
          <p className="text-xs text-slate-500">
            Button dabane par aapka UPI app khulega (sirf phone par). Payment ke
            baad app mein dikhne wala 12 digit UTR / Transaction ID yahan daalo.
          </p>
          <div className="bg-white border rounded-xl p-4 space-y-3">
            <div className="font-medium text-sm">2. UTR daalo</div>
            <input
              inputMode="numeric"
              maxLength={12}
              value={utr}
              onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
              placeholder="12 digit UTR"
              className="w-full border rounded-xl px-4 py-3 text-sm"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {saving ? "Ruko..." : "Verify ke liye bhejo"}
            </button>
          </div>
          {pending && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
              Aapki payment verify ho rahi hai. Pro kuch der mein activate ho jayega.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
