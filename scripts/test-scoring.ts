import assert from "node:assert/strict";
import { QUESTIONS } from "../src/data/questions";
import { isCorrect, marksFor, maxMarks, buildPaper, minutesFor } from "../src/lib/scoring";

const get = (id: string) => QUESTIONS.find((q) => q.id === id)!;

// MCQ
const mcq = get("phy-kin-1"); // answer idx 1
assert.equal(isCorrect(mcq, 1), true);
assert.equal(isCorrect(mcq, 0), false);
assert.equal(isCorrect(mcq, null), false);
// numerical + tolerance
const num = get("phy-nlm-1"); // 3
assert.equal(isCorrect(num, 3), true);
assert.equal(isCorrect(num, 3.004), true);
assert.equal(isCorrect(num, 3.5), false);
assert.equal(isCorrect(get("bio-evo-1"), 0.32), true);
assert.equal(isCorrect(get("bio-evo-1"), 0.3), false);
// multi: exact set only, order-independent
const multi = get("phy-circ-adv"); // [0,2,3]
assert.equal(isCorrect(multi, [3, 0, 2]), true);
assert.equal(isCorrect(multi, [0, 2]), false);
assert.equal(isCorrect(multi, [0, 1, 2, 3]), false);

// marking schemes
assert.equal(marksFor("neet", get("bio-cell-1"), 3), 4);
assert.equal(marksFor("neet", get("bio-cell-1"), 0), -1);
assert.equal(marksFor("neet", get("bio-cell-1"), null), 0);
assert.equal(marksFor("jee_main", num, 3), 4);
assert.equal(marksFor("jee_main", num, 99), 0); // no negative for numerical
assert.equal(marksFor("jee_main", mcq, 0), -1);
assert.equal(marksFor("jee_advanced", multi, [0, 2, 3]), 4);
assert.equal(marksFor("jee_advanced", multi, [0]), -2);
assert.equal(marksFor("jee_advanced", get("mat-adv-2"), 3), 3);
assert.equal(maxMarks("jee_advanced", mcq), 3);

// every exam has a non-empty paper, no duplicates, sensible time
for (const exam of ["neet", "jee_main", "jee_advanced"] as const) {
  const p = buildPaper(exam);
  assert.ok(p.length >= 10, `${exam} paper too small: ${p.length}`);
  assert.equal(new Set(p.map((q) => q.id)).size, p.length);
  assert.ok(minutesFor(exam, p.length) >= 5);
}
// NEET paper must not contain Mathematics
assert.ok(!buildPaper("neet").some((q) => q.subject === "Mathematics"));
console.log("scoring tests OK");
