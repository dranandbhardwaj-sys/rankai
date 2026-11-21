import { NextRequest } from "next/server";

// Plan aur price sirf server par tay hote hain, browser se nahi aate.
const PLANS: Record<string, { name: string; price: number }> = {
  pro_monthly: { name: "RankAI Pro Monthly", price: 499 },
};

export async function GET(req: NextRequest) {
  const planId = req.nextUrl.searchParams.get("plan") ?? "";
  const plan = PLANS[planId];
  const upiId = process.env.UPI_ID;

  if (!plan || !upiId) {
    return new Response("Payment abhi available nahi hai.", { status: 400 });
  }

  const params = new URLSearchParams({
    pa: upiId,
    pn: "RankAI",
    am: plan.price.toFixed(2),
    cu: "INR",
    tn: plan.name,
  });

  // UPI app seedha khul jata hai. ID page par kabhi dikhti nahi.
  return new Response(null, {
    status: 302,
    headers: {
      Location: `upi://pay?${params.toString()}`,
      "Cache-Control": "no-store",
    },
  });
}
