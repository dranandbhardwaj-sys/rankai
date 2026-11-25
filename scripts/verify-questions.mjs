// Numeric/computable answers ko independent formulas se dobara compute karke bank se match karta hai.
import { QUESTIONS } from "../src/data/questions.ts";

const R = 0.0821;
const expected = {
  "phy-kin-1": () => Math.sqrt((2 * 80) / 10),                       // time 4 s -> option idx check below
  "phy-nlm-1": () => (10 - 0.2 * 2 * 10) / 2,
  "phy-wep-1": () => 0.5 * 2 * 6 * 6,
  "phy-cur-1": () => 1 / (1 / 2 + 1 / 3 + 1 / 6),
  "phy-cur-2": () => (220 * 220) / 100,
  "phy-wav-1": () => 200 / (2 * 0.5),
  "phy-mag-1": () => 0.2 * 4 * 0.5,
  "phy-rot-1": () => 0.5 * 4 * 0.5 * 0.5,
  "phy-cap-1": () => (4 * 4) / (4 + 4) + 2,
  "phy-esp-1": () => (9e9 * (2e-6) ** 2) / 0.3 ** 2,
  "phy-shm-1": () => 2 * Math.PI * Math.sqrt(2 / 200),
  "phy-kin-2": () => (20 * 20 * Math.sin((60 * Math.PI) / 180)) / 10,
  "phy-thm-1": () => (1 - 300 / 500) * 100,
  "phy-opt-1": () => 1 / (1 / 20 - 1 / 30),
  "phy-mod-1": () => 1.227 / Math.sqrt(100),
  "phy-grav-1": () => 11.2 * 2,
  "che-mole-1": () => 36 / 18,
  "che-sol-1": () => 4 / 40 / 0.5,
  "che-ion-1": () => -Math.log10(1e-3),
  "che-atom-1": () => 3 * 3,
  "che-kin-1": () => 0.693 / 0.0693,
  "che-coord-1": () => 0 - (4 * 1 + 6 * -1) * -1 === 0 ? 2 : NaN, // 4(+1)+x+6(-1)=0 -> x=2
  "che-gas-1": () => (2 * R * 300) / 24.63,
  "che-iso-1": () => 2,
  "che-redox-1": () => (0 - (2 * 1 + 7 * -2)) / 2,
  "che-elec-1": () => 0.34 - -0.76,
  "che-adv-2": () => 2 /*C-H*/ + 1 /*C-C sigma*/,
  "mat-quad-1": () => { const s = 7, p = 10; return s * s - 2 * p; },
  "mat-ap-1": () => { const a = 3, d = 4, n = 20; return (n / 2) * (2 * a + (n - 1) * d); },
  "mat-bin-1": () => 6 * 5 / 2,
  "mat-diff-1": () => 3 * 1 * Math.log(1) + 1,
  "mat-int-1": () => -Math.cos(Math.PI) + Math.cos(0),
  "mat-lim-1": () => Math.sin(3 * 1e-8) / 1e-8,
  "mat-coord-1": () => Math.hypot(4 - 1, 6 - 2),
  "mat-circ-1": () => Math.sqrt(11 + 9 + 16),
  "mat-mat-1": () => 2 * 4 - 3 * 1,
  "mat-vec-1": () => 1 * 2 + 2 * -1 + 3 * 1,
  "mat-pnc-1": () => 120 / (2 * 2),
  "mat-opt-1": () => { let m = 1e9; for (let x = -10; x <= 10; x += 0.001) m = Math.min(m, x * x - 4 * x + 7); return Math.round(m * 1e6) / 1e6; },
  "mat-trig-1": () => Math.sin((75 * Math.PI) / 180),
  "mat-prob-1": () => { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === 7) c++; return c / 36; },
  "mat-adv-2": () => { const f = (x) => x ** 3 - 3 * x + 1; let c = 0, prev = f(-3); for (let x = -3 + 0.001; x <= 3; x += 0.001) { const v = f(x); if (prev * v < 0) c++; prev = v; } return c; },
  "mat-adv-3": () => { let s = 0, n = 200000; for (let i = 0; i < n; i++) { const x = (i + 0.5) / n; s += x * Math.exp(x); } return s / n; },
  "bio-evo-1": () => { const q = Math.sqrt(0.04), p = 1 - q; return 2 * p * q; },
};

// mcq: expected numeric value -> which option text contains it
const optionNumeric = {
  "phy-kin-1": (v) => `${v} s`, "phy-cur-2": (v) => `${v} Ω`,
  "phy-esp-1": (v) => `${Math.round(v * 10) / 10} N`, "phy-opt-1": (v) => `${Math.round(v)} cm`,
  "phy-thm-1": (v) => `${Math.round(v)}%`, "phy-wep-1": (v) => `${v} J`,
  "phy-kin-2": (v) => `${(Math.round(v * 10) / 10).toFixed(1)} m`, "phy-shm-1": (v) => `${v.toFixed(3)} s`,
  "phy-mod-1": (v) => `${v.toFixed(3)} nm`, "phy-grav-1": (v) => `${v.toFixed(1)} km/s`,
  "che-mole-1": (v) => `${v}`, "che-elec-1": (v) => `${v.toFixed(2)} V`, "che-redox-1": (v) => `+${v}`,
  "mat-trig-1": null, "mat-prob-1": null,
};
const mcqExtra = { "phy-mag-1": (v) => `${v} N` };

let bad = 0, checked = 0;
const ids = new Set();
for (const q of QUESTIONS) {
  if (ids.has(q.id)) { console.log("DUPLICATE ID", q.id); bad++; }
  ids.add(q.id);
  if (q.type !== "numerical") {
    if (!q.options || q.options.length < 2) { console.log("NO OPTIONS", q.id); bad++; }
    const a = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (a.some((i) => i < 0 || i >= (q.options?.length ?? 0))) { console.log("ANSWER INDEX OUT OF RANGE", q.id); bad++; }
    if (q.type === "mcq" && Array.isArray(q.answer)) { console.log("MCQ HAS ARRAY ANSWER", q.id); bad++; }
  }
  if (!q.explain || q.explain.length < 10) { console.log("NO EXPLANATION", q.id); bad++; }
  const f = expected[q.id];
  if (!f) continue;
  const v = f();
  checked++;
  if (q.type === "numerical") {
    const tol = q.tol ?? 0.01;
    if (Math.abs(v - q.answer) > Math.max(tol, 1e-3)) { console.log("MISMATCH", q.id, "computed", v, "bank", q.answer); bad++; }
  } else {
    const mk = optionNumeric[q.id] ?? mcqExtra[q.id];
    if (mk) {
      const txt = mk(v);
      const idx = q.options.findIndex((o) => o.replace(/\s+/g, " ").trim() === txt.replace(/\s+/g, " ").trim());
      if (idx !== q.answer) { console.log("MCQ MISMATCH", q.id, "computed option", JSON.stringify(txt), "found idx", idx, "bank idx", q.answer); bad++; }
    }
  }
}
// special cases
const get = (id) => QUESTIONS.find((q) => q.id === id);
const sin75 = Math.sin(75 * Math.PI / 180);
const o = get("mat-trig-1").options; // option 1 = (√3+1)/(2√2)
if (Math.abs((Math.sqrt(3) + 1) / (2 * Math.SQRT2) - sin75) > 1e-9 || get("mat-trig-1").answer !== 1) { console.log("trig mismatch"); bad++; }
if (Math.abs(6 / 36 - 1 / 6) > 1e-12 || get("mat-prob-1").answer !== 1) { console.log("prob mismatch"); bad++; }
// i^2023
const pow = [ "1", "i", "-1", "-i" ][2023 % 4];
if (pow !== "-i" || get("mat-cx-1").answer !== 3) { console.log("i^2023 mismatch"); bad++; }
// x^3-3x : critical points and f'' signs
const f2 = (x) => 6 * x; if (!(f2(-1) < 0 && f2(1) > 0)) { console.log("f'' mismatch"); bad++; }
const roots3 = [0, Math.sqrt(3), -Math.sqrt(3)].every((x) => Math.abs(x ** 3 - 3 * x) < 1e-9);
if (!roots3 || JSON.stringify(get("mat-adv-1").answer) !== "[0,1,2]") { console.log("mat-adv-1 mismatch"); bad++; }

const bySubject = {};
for (const q of QUESTIONS) bySubject[q.subject] = (bySubject[q.subject] || 0) + 1;
console.log(`Total ${QUESTIONS.length} questions`, bySubject, `| formula-checked: ${checked}`, bad ? `| PROBLEMS: ${bad}` : "| ALL OK");
process.exit(bad ? 1 : 0);
