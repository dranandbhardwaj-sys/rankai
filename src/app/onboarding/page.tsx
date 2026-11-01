"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [exam, setExam] = useState("jee_main");
  const [hours, setHours] = useState(4);

  const finish = () => {
    localStorage.setItem(
      "rankai_user",
      JSON.stringify({
        exam,
        classLevel: "12",
        hours,
        targetScore: exam === "neet" ? "650" : "200",
      })
    );
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold">Select your exam</h1>
        {["jee_main", "jee_advanced", "neet"].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setExam(id)}
            className={`w-full text-left p-4 rounded-xl border-2 ${
              exam === id ? "border-blue-600 bg-blue-50" : "border-slate-200"
            }`}
          >
            {id === "neet"
              ? "NEET"
              : id === "jee_advanced"
              ? "JEE Advanced"
              : "JEE Main"}
          </button>
        ))}
        <label className="block text-sm text-slate-600">
          Daily hours: {hours}
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full"
        />
        <button
          type="button"
          onClick={finish}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
