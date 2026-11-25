import type { Question } from "@/lib/types";

/**
 * RankAI question bank.
 * Ye sab ORIGINAL questions hain (NEET / JEE pattern ke hisaab se), kisi paper se copy nahi kiye gaye.
 * Numeric answers scripts/verify-questions.mjs se dobara compute karke check kiye jaate hain.
 */
const NJ: Question["exams"] = ["neet", "jee_main"];
const J: Question["exams"] = ["jee_main"];
const JA: Question["exams"] = ["jee_advanced"];
const JMA: Question["exams"] = ["jee_main", "jee_advanced"];
const N: Question["exams"] = ["neet"];

export const QUESTIONS: Question[] = [
  /* ===================== PHYSICS ===================== */
  {
    id: "phy-kin-1", exams: NJ, subject: "Physics", chapter: "Kinematics", difficulty: 1, type: "mcq",
    q: "A stone is dropped from the top of an 80 m high tower. Taking g = 10 m/s², the time taken to reach the ground is:",
    options: ["2 s", "4 s", "8 s", "16 s"], answer: 1,
    explain: "h = ½gt² → 80 = 5t² → t² = 16 → t = 4 s. Dropped matlab initial velocity 0.",
  },
  {
    id: "phy-kin-2", exams: NJ, subject: "Physics", chapter: "Kinematics", difficulty: 2, type: "mcq",
    q: "A projectile is thrown with speed 20 m/s at 30° to the horizontal (g = 10 m/s²). Its horizontal range is approximately:",
    options: ["20 m", "34.6 m", "40 m", "17.3 m"], answer: 1,
    explain: "R = u² sin2θ / g = 400 × sin60° / 10 = 40 × 0.866 ≈ 34.6 m.",
  },
  {
    id: "phy-nlm-1", exams: JMA, subject: "Physics", chapter: "Laws of Motion", difficulty: 2, type: "numerical",
    q: "A 2 kg block on a rough horizontal surface (μ = 0.2) is pulled by a horizontal force of 10 N. Taking g = 10 m/s², find its acceleration (in m/s²).",
    answer: 3, unit: "m/s²",
    explain: "Friction = μmg = 0.2 × 2 × 10 = 4 N. Net force = 10 − 4 = 6 N. a = 6/2 = 3 m/s².",
  },
  {
    id: "phy-wep-1", exams: NJ, subject: "Physics", chapter: "Work, Energy & Power", difficulty: 1, type: "mcq",
    q: "The kinetic energy of a 2 kg body moving at 6 m/s is:",
    options: ["12 J", "18 J", "36 J", "72 J"], answer: 2,
    explain: "KE = ½mv² = ½ × 2 × 36 = 36 J.",
  },
  {
    id: "phy-shm-1", exams: NJ, subject: "Physics", chapter: "Oscillations", difficulty: 2, type: "mcq",
    q: "A 2 kg mass is attached to a spring of force constant 200 N/m. Its time period of oscillation is:",
    options: ["0.314 s", "0.628 s", "1.26 s", "6.28 s"], answer: 1,
    explain: "T = 2π√(m/k) = 2π√(2/200) = 2π × 0.1 = 0.628 s.",
  },
  {
    id: "phy-esp-1", exams: NJ, subject: "Physics", chapter: "Electrostatics", difficulty: 2, type: "mcq",
    q: "Two point charges of 2 μC each are placed 0.3 m apart in vacuum. The force between them is (k = 9×10⁹ N·m²/C²):",
    options: ["0.04 N", "0.2 N", "0.4 N", "4 N"], answer: 2,
    explain: "F = kq₁q₂/r² = 9×10⁹ × (2×10⁻⁶)² / 0.09 = 0.036/0.09 = 0.4 N (repulsive).",
  },
  {
    id: "phy-cur-1", exams: JMA, subject: "Physics", chapter: "Current Electricity", difficulty: 1, type: "numerical",
    q: "Resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel. Find the equivalent resistance (in Ω).",
    answer: 1, unit: "Ω",
    explain: "1/R = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 1 → R = 1 Ω.",
  },
  {
    id: "phy-cur-2", exams: NJ, subject: "Physics", chapter: "Current Electricity", difficulty: 1, type: "mcq",
    q: "The resistance of a bulb rated 100 W, 220 V is:",
    options: ["220 Ω", "484 Ω", "2.2 Ω", "22 Ω"], answer: 1,
    explain: "P = V²/R → R = V²/P = 220²/100 = 48400/100 = 484 Ω.",
  },
  {
    id: "phy-opt-1", exams: NJ, subject: "Physics", chapter: "Ray Optics", difficulty: 2, type: "mcq",
    q: "An object is placed 30 cm in front of a convex lens of focal length 20 cm. The image distance from the lens is:",
    options: ["12 cm", "30 cm", "60 cm", "−60 cm"], answer: 2,
    explain: "Lens formula 1/v − 1/u = 1/f, u = −30: 1/v = 1/20 − 1/30 = 1/60 → v = +60 cm (real, inverted image).",
  },
  {
    id: "phy-mod-1", exams: NJ, subject: "Physics", chapter: "Dual Nature of Matter", difficulty: 2, type: "mcq",
    q: "The de Broglie wavelength of an electron accelerated through 100 V is approximately:",
    options: ["0.0123 nm", "0.123 nm", "1.23 nm", "12.3 nm"], answer: 1,
    explain: "λ = 1.227/√V nm = 1.227/10 ≈ 0.123 nm.",
  },
  {
    id: "phy-thm-1", exams: NJ, subject: "Physics", chapter: "Thermodynamics", difficulty: 1, type: "mcq",
    q: "A Carnot engine works between 500 K and 300 K. Its efficiency is:",
    options: ["20%", "30%", "40%", "60%"], answer: 2,
    explain: "η = 1 − T₂/T₁ = 1 − 300/500 = 0.4 = 40%.",
  },
  {
    id: "phy-grav-1", exams: J, subject: "Physics", chapter: "Gravitation", difficulty: 3, type: "mcq",
    q: "Escape velocity on Earth is 11.2 km/s. A planet of the same mean density but twice the radius of Earth has escape velocity:",
    options: ["11.2 km/s", "15.8 km/s", "22.4 km/s", "44.8 km/s"], answer: 2,
    explain: "vₑ = √(2GM/R) aur M = (4/3)πR³ρ, to vₑ ∝ R (same density). R double → vₑ double = 22.4 km/s.",
  },
  {
    id: "phy-wav-1", exams: JMA, subject: "Physics", chapter: "Waves", difficulty: 2, type: "numerical",
    q: "A string of length 0.5 m fixed at both ends supports waves of speed 200 m/s. Find the fundamental frequency (in Hz).",
    answer: 200, unit: "Hz",
    explain: "Fundamental: L = λ/2 → λ = 1 m. f = v/λ = 200/1 = 200 Hz.",
  },
  {
    id: "phy-mag-1", exams: NJ, subject: "Physics", chapter: "Magnetic Effects of Current", difficulty: 1, type: "mcq",
    q: "A 0.5 m long wire carrying 4 A is placed perpendicular to a magnetic field of 0.2 T. The force on it is:",
    options: ["0.2 N", "0.4 N", "0.8 N", "4 N"], answer: 1,
    explain: "F = BIL sinθ = 0.2 × 4 × 0.5 × 1 = 0.4 N.",
  },
  {
    id: "phy-rot-1", exams: JMA, subject: "Physics", chapter: "Rotational Motion", difficulty: 2, type: "numerical",
    q: "Find the moment of inertia (in kg·m²) of a uniform disc of mass 4 kg and radius 0.5 m about an axis through its centre perpendicular to its plane.",
    answer: 0.5, unit: "kg·m²",
    explain: "I = ½MR² = ½ × 4 × 0.25 = 0.5 kg·m².",
  },
  {
    id: "phy-cap-1", exams: JMA, subject: "Physics", chapter: "Capacitors", difficulty: 2, type: "numerical",
    q: "Two 4 μF capacitors are connected in series, and this combination is connected in parallel with a 2 μF capacitor. Find the equivalent capacitance (in μF).",
    answer: 4, unit: "μF",
    explain: "Series: 4×4/(4+4) = 2 μF. Parallel with 2 μF: 2 + 2 = 4 μF.",
  },
  {
    id: "phy-circ-adv", exams: JA, subject: "Physics", chapter: "Circular Motion", difficulty: 2, type: "multi",
    q: "For a particle in uniform circular motion, which of the following are correct? (one or more)",
    options: ["Speed is constant", "Velocity is constant", "Magnitude of acceleration is constant", "Acceleration is directed towards the centre"],
    answer: [0, 2, 3],
    explain: "Speed aur acceleration ki magnitude (v²/r) constant hai, acceleration hamesha centre ki taraf. Velocity ki direction badalti rehti hai, isliye velocity constant nahi.",
  },
  {
    id: "phy-thm-adv", exams: JA, subject: "Physics", chapter: "Thermodynamics", difficulty: 3, type: "multi",
    q: "An ideal gas undergoes free expansion into vacuum in a thermally insulated container. Which statements are correct? (one or more)",
    options: [
      "Heat exchanged with surroundings is zero",
      "Work done by the gas is zero",
      "Temperature of the gas remains unchanged",
      "Entropy of the gas decreases",
    ],
    answer: [0, 1, 2],
    explain: "Insulated → Q = 0. Vacuum ke against expansion → W = 0. ΔU = 0 to ideal gas ke liye ΔT = 0. Process irreversible hai, entropy badhti hai (kam nahi hoti).",
  },

  /* ===================== CHEMISTRY ===================== */
  {
    id: "che-mole-1", exams: NJ, subject: "Chemistry", chapter: "Mole Concept", difficulty: 1, type: "mcq",
    q: "The number of moles in 36 g of water (molar mass 18 g/mol) is:",
    options: ["0.5", "1", "2", "4"], answer: 2,
    explain: "Moles = given mass / molar mass = 36/18 = 2.",
  },
  {
    id: "che-sol-1", exams: JMA, subject: "Chemistry", chapter: "Solutions", difficulty: 1, type: "numerical",
    q: "4 g of NaOH (molar mass 40 g/mol) is dissolved to make 500 mL of solution. Find its molarity (in mol/L).",
    answer: 0.2, unit: "M",
    explain: "Moles = 4/40 = 0.1. Volume = 0.5 L. Molarity = 0.1/0.5 = 0.2 M.",
  },
  {
    id: "che-ion-1", exams: JMA, subject: "Chemistry", chapter: "Ionic Equilibrium", difficulty: 1, type: "numerical",
    q: "Find the pH of a 0.001 M HCl solution.",
    answer: 3,
    explain: "HCl strong acid hai, [H⁺] = 10⁻³ M → pH = −log(10⁻³) = 3.",
  },
  {
    id: "che-atom-1", exams: JMA, subject: "Chemistry", chapter: "Atomic Structure", difficulty: 1, type: "numerical",
    q: "How many orbitals are present in the third shell (n = 3)?",
    answer: 9,
    explain: "Orbitals in a shell = n² = 9 (one 3s, three 3p, five 3d).",
  },
  {
    id: "che-per-1", exams: NJ, subject: "Chemistry", chapter: "Periodic Properties", difficulty: 1, type: "mcq",
    q: "Which element has the highest electronegativity?",
    options: ["Cl", "O", "F", "N"], answer: 2,
    explain: "Fluorine sabse zyada electronegative element hai (Pauling scale par 4.0).",
  },
  {
    id: "che-bond-1", exams: NJ, subject: "Chemistry", chapter: "Chemical Bonding", difficulty: 1, type: "mcq",
    q: "The hybridisation of carbon atoms in ethene (C₂H₄) is:",
    options: ["sp", "sp²", "sp³", "sp³d"], answer: 1,
    explain: "Har carbon ke 3 sigma bond (2 C–H + 1 C–C) aur ek pi bond hai → sp² hybridisation, planar structure.",
  },
  {
    id: "che-eq-1", exams: NJ, subject: "Chemistry", chapter: "Chemical Equilibrium", difficulty: 2, type: "mcq",
    q: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (exothermic), increasing the pressure at constant temperature will:",
    options: ["shift equilibrium in the forward direction", "shift equilibrium in the backward direction", "cause no shift", "make it impossible to predict"],
    answer: 0,
    explain: "Left side par 4 mol gas, right side par 2 mol. Pressure badhane par Le Chatelier ke hisaab se kam moles wali side (forward) favour hoti hai.",
  },
  {
    id: "che-elec-1", exams: NJ, subject: "Chemistry", chapter: "Electrochemistry", difficulty: 2, type: "mcq",
    q: "Given E°(Zn²⁺/Zn) = −0.76 V and E°(Cu²⁺/Cu) = +0.34 V, the standard EMF of the Daniell cell is:",
    options: ["0.42 V", "1.10 V", "−1.10 V", "0.34 V"], answer: 1,
    explain: "E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V.",
  },
  {
    id: "che-kin-1", exams: JMA, subject: "Chemistry", chapter: "Chemical Kinetics", difficulty: 2, type: "numerical",
    q: "A first-order reaction has rate constant k = 0.0693 min⁻¹. Find its half-life (in minutes).",
    answer: 10, unit: "min", tol: 0.05,
    explain: "t½ = 0.693/k = 0.693/0.0693 = 10 min.",
  },
  {
    id: "che-org-1", exams: NJ, subject: "Chemistry", chapter: "Organic: Nomenclature", difficulty: 1, type: "mcq",
    q: "The IUPAC name of CH₃–CH₂–CH(CH₃)–CH₃ is:",
    options: ["Pentane", "2-Methylbutane", "3-Methylbutane", "2,2-Dimethylpropane"], answer: 1,
    explain: "Sabse lambi chain 4 carbon (butane). Numbering aisi karo ki substituent ko kam number mile → methyl 2 par: 2-methylbutane.",
  },
  {
    id: "che-org-2", exams: NJ, subject: "Chemistry", chapter: "Hydrocarbons", difficulty: 2, type: "mcq",
    q: "The major product of the reaction of propene with HBr (in the absence of peroxide) is:",
    options: ["1-Bromopropane", "2-Bromopropane", "1,2-Dibromopropane", "Propan-2-ol"], answer: 1,
    explain: "Markovnikov rule: H us carbon par jaata hai jis par pehle se zyada H ho, Br dusre (2°) carbon par → 2-bromopropane.",
  },
  {
    id: "che-coord-1", exams: JMA, subject: "Chemistry", chapter: "Coordination Compounds", difficulty: 2, type: "numerical",
    q: "Find the oxidation state of iron in K₄[Fe(CN)₆].",
    answer: 2,
    explain: "4(+1) + x + 6(−1) = 0 → x = +2.",
  },
  {
    id: "che-gas-1", exams: JMA, subject: "Chemistry", chapter: "States of Matter", difficulty: 2, type: "numerical",
    q: "2 mol of an ideal gas occupy 24.63 L at 300 K. Find its pressure in atm (R = 0.0821 L·atm/mol·K).",
    answer: 2, unit: "atm", tol: 0.02,
    explain: "P = nRT/V = 2 × 0.0821 × 300 / 24.63 = 49.26/24.63 = 2.0 atm.",
  },
  {
    id: "che-iso-1", exams: JMA, subject: "Chemistry", chapter: "Isomerism", difficulty: 1, type: "numerical",
    q: "How many structural isomers are possible for C₄H₁₀?",
    answer: 2,
    explain: "n-butane aur isobutane (2-methylpropane) → 2 isomers.",
  },
  {
    id: "che-redox-1", exams: NJ, subject: "Chemistry", chapter: "Redox Reactions", difficulty: 2, type: "mcq",
    q: "The oxidation state of chromium in K₂Cr₂O₇ is:",
    options: ["+3", "+4", "+6", "+7"], answer: 2,
    explain: "2(+1) + 2x + 7(−2) = 0 → 2x = 12 → x = +6.",
  },
  {
    id: "che-sblock-1", exams: NJ, subject: "Chemistry", chapter: "s-Block Elements", difficulty: 1, type: "mcq",
    q: "Sodium imparts which colour to a flame?",
    options: ["Crimson red", "Golden yellow", "Brick red", "Apple green"], answer: 1,
    explain: "Na → golden yellow, Li → crimson red, Ca → brick red, Ba → apple green.",
  },
  {
    id: "che-mag-adv", exams: JA, subject: "Chemistry", chapter: "Chemical Bonding", difficulty: 3, type: "multi",
    q: "Which of the following species are paramagnetic? (one or more)",
    options: ["O₂", "N₂", "NO", "F₂"], answer: [0, 2],
    explain: "MOT se: O₂ mein 2 unpaired electron (π*), NO mein 1 unpaired electron → paramagnetic. N₂ aur F₂ mein sab electrons paired → diamagnetic.",
  },
  {
    id: "che-adv-2", exams: JA, subject: "Chemistry", chapter: "Chemical Bonding", difficulty: 2, type: "numerical",
    q: "How many sigma (σ) bonds are present in one molecule of ethyne (C₂H₂)?",
    answer: 3,
    explain: "H–C ×2 aur C–C ×1 = 3 sigma bonds. Triple bond mein 1 sigma + 2 pi.",
  },

  /* ===================== MATHEMATICS ===================== */
  {
    id: "mat-quad-1", exams: JMA, subject: "Mathematics", chapter: "Quadratic Equations", difficulty: 1, type: "numerical",
    q: "If α and β are the roots of x² − 7x + 10 = 0, find α² + β².",
    answer: 29,
    explain: "α+β = 7, αβ = 10. α²+β² = (α+β)² − 2αβ = 49 − 20 = 29.",
  },
  {
    id: "mat-ap-1", exams: JMA, subject: "Mathematics", chapter: "Sequences & Series", difficulty: 1, type: "numerical",
    q: "Find the sum of the first 20 terms of the AP 3, 7, 11, 15, …",
    answer: 820,
    explain: "a = 3, d = 4, n = 20. Sₙ = n/2 [2a + (n−1)d] = 10 × (6 + 76) = 820.",
  },
  {
    id: "mat-bin-1", exams: JMA, subject: "Mathematics", chapter: "Binomial Theorem", difficulty: 1, type: "numerical",
    q: "Find the coefficient of x² in the expansion of (1 + x)⁶.",
    answer: 15,
    explain: "Coefficient = ⁶C₂ = 6·5/2 = 15.",
  },
  {
    id: "mat-trig-1", exams: J, subject: "Mathematics", chapter: "Trigonometry", difficulty: 2, type: "mcq",
    q: "The value of sin 75° is:",
    options: ["(√3 − 1)/(2√2)", "(√3 + 1)/(2√2)", "(√3 + 1)/4", "1/2"], answer: 1,
    explain: "sin(45°+30°) = sin45 cos30 + cos45 sin30 = (1/√2)(√3/2) + (1/√2)(1/2) = (√3+1)/(2√2) ≈ 0.966.",
  },
  {
    id: "mat-diff-1", exams: JMA, subject: "Mathematics", chapter: "Differentiation", difficulty: 2, type: "numerical",
    q: "If f(x) = x³ ln x, find f′(1).",
    answer: 1,
    explain: "f′(x) = 3x² ln x + x³·(1/x) = 3x² ln x + x². At x = 1: 0 + 1 = 1.",
  },
  {
    id: "mat-int-1", exams: JMA, subject: "Mathematics", chapter: "Definite Integrals", difficulty: 1, type: "numerical",
    q: "Evaluate ∫₀^π sin x dx.",
    answer: 2,
    explain: "[−cos x]₀^π = −cos π + cos 0 = 1 + 1 = 2.",
  },
  {
    id: "mat-lim-1", exams: JMA, subject: "Mathematics", chapter: "Limits", difficulty: 1, type: "numerical",
    q: "Evaluate lim (x→0) sin(3x)/x.",
    answer: 3,
    explain: "sin(3x)/x = 3 · sin(3x)/(3x) → 3 × 1 = 3.",
  },
  {
    id: "mat-prob-1", exams: J, subject: "Mathematics", chapter: "Probability", difficulty: 1, type: "mcq",
    q: "Two fair dice are thrown. The probability that the sum is 7 is:",
    options: ["1/12", "1/6", "1/9", "5/36"], answer: 1,
    explain: "Favourable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total 36. P = 6/36 = 1/6.",
  },
  {
    id: "mat-coord-1", exams: JMA, subject: "Mathematics", chapter: "Coordinate Geometry", difficulty: 1, type: "numerical",
    q: "Find the distance between the points (1, 2) and (4, 6).",
    answer: 5,
    explain: "d = √[(4−1)² + (6−2)²] = √(9+16) = 5.",
  },
  {
    id: "mat-circ-1", exams: JMA, subject: "Mathematics", chapter: "Circles", difficulty: 2, type: "numerical",
    q: "Find the radius of the circle x² + y² − 6x + 8y − 11 = 0.",
    answer: 6,
    explain: "(x−3)² + (y+4)² = 11 + 9 + 16 = 36 → r = 6.",
  },
  {
    id: "mat-mat-1", exams: JMA, subject: "Mathematics", chapter: "Matrices & Determinants", difficulty: 1, type: "numerical",
    q: "Find the determinant of the matrix [[2, 3], [1, 4]].",
    answer: 5,
    explain: "det = 2×4 − 3×1 = 8 − 3 = 5.",
  },
  {
    id: "mat-vec-1", exams: JMA, subject: "Mathematics", chapter: "Vectors", difficulty: 1, type: "numerical",
    q: "Find the dot product of a = (1, 2, 3) and b = (2, −1, 1).",
    answer: 3,
    explain: "a·b = 1×2 + 2×(−1) + 3×1 = 2 − 2 + 3 = 3.",
  },
  {
    id: "mat-cx-1", exams: J, subject: "Mathematics", chapter: "Complex Numbers", difficulty: 2, type: "mcq",
    q: "The value of i²⁰²³ is:",
    options: ["1", "−1", "i", "−i"], answer: 3,
    explain: "i ki power 4 ke cycle mein chalti hai. 2023 = 4×505 + 3 → i²⁰²³ = i³ = −i.",
  },
  {
    id: "mat-pnc-1", exams: JMA, subject: "Mathematics", chapter: "Permutations & Combinations", difficulty: 2, type: "numerical",
    q: "In how many distinct ways can the letters of the word LEVEL be arranged?",
    answer: 30,
    explain: "5 letters, L aur E dono 2-2 baar: 5!/(2!·2!) = 120/4 = 30.",
  },
  {
    id: "mat-opt-1", exams: JMA, subject: "Mathematics", chapter: "Maxima & Minima", difficulty: 1, type: "numerical",
    q: "Find the minimum value of x² − 4x + 7.",
    answer: 3,
    explain: "x² − 4x + 7 = (x−2)² + 3 ≥ 3. Minimum 3 (x = 2 par).",
  },
  {
    id: "mat-par-1", exams: J, subject: "Mathematics", chapter: "Parabola", difficulty: 1, type: "mcq",
    q: "The focus of the parabola y² = 8x is:",
    options: ["(0, 2)", "(2, 0)", "(4, 0)", "(8, 0)"], answer: 1,
    explain: "y² = 4ax se 4a = 8 → a = 2. Focus = (a, 0) = (2, 0).",
  },
  {
    id: "mat-adv-1", exams: JA, subject: "Mathematics", chapter: "Application of Derivatives", difficulty: 3, type: "multi",
    q: "Let f(x) = x³ − 3x. Which of the following are correct? (one or more)",
    options: [
      "f has a local maximum at x = −1",
      "f has a local minimum at x = 1",
      "f is increasing on (−∞, −1)",
      "f has exactly one real root",
    ],
    answer: [0, 1, 2],
    explain: "f′ = 3x² − 3 = 0 → x = ±1. f″ = 6x: x=−1 par negative (local max), x=1 par positive (local min). f′>0 for x<−1 → increasing. f(x)=x(x²−3) ke 3 real roots (0, ±√3), isliye D galat.",
  },
  {
    id: "mat-adv-2", exams: JA, subject: "Mathematics", chapter: "Theory of Equations", difficulty: 3, type: "numerical",
    q: "Find the number of real roots of x³ − 3x + 1 = 0.",
    answer: 3,
    explain: "f(−2) = −1, f(−1) = 3, f(1) = −1, f(2) = 3. Sign change 3 baar (−2,−1), (−1,1), (1,2) → 3 real roots.",
  },
  {
    id: "mat-adv-3", exams: JA, subject: "Mathematics", chapter: "Definite Integrals", difficulty: 3, type: "numerical",
    q: "Evaluate ∫₀¹ x eˣ dx.",
    answer: 1,
    explain: "By parts: ∫x eˣ dx = x eˣ − eˣ. Limits 0 se 1: (e − e) − (0 − 1) = 1.",
  },

  /* ===================== BIOLOGY (NEET) ===================== */
  {
    id: "bio-cell-1", exams: N, subject: "Biology", chapter: "Cell: Structure & Function", difficulty: 1, type: "mcq",
    q: "The site of protein synthesis in a cell is:",
    options: ["Lysosome", "Golgi apparatus", "Peroxisome", "Ribosome"], answer: 3,
    explain: "Ribosomes mRNA ko padhkar amino acids se protein banate hain (translation).",
  },
  {
    id: "bio-cyc-1", exams: N, subject: "Biology", chapter: "Cell Cycle & Division", difficulty: 1, type: "mcq",
    q: "DNA replication takes place during which phase of the cell cycle?",
    options: ["G₁ phase", "S phase", "G₂ phase", "M phase"], answer: 1,
    explain: "S = Synthesis phase. Isme DNA content double hota hai (2C → 4C).",
  },
  {
    id: "bio-gen-1", exams: N, subject: "Biology", chapter: "Principles of Inheritance", difficulty: 1, type: "mcq",
    q: "A test cross of a heterozygous monohybrid (Tt × tt) gives the phenotypic ratio:",
    options: ["3 : 1", "1 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1"], answer: 1,
    explain: "Tt × tt → 50% Tt (dominant) aur 50% tt (recessive) = 1 : 1.",
  },
  {
    id: "bio-gen-2", exams: N, subject: "Biology", chapter: "Principles of Inheritance", difficulty: 1, type: "mcq",
    q: "The phenotypic ratio in the F₂ generation of a Mendelian dihybrid cross is:",
    options: ["3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1 : 1 : 1"], answer: 2,
    explain: "Dihybrid cross (RrYy × RrYy) ka F₂ phenotypic ratio 9 : 3 : 3 : 1 hota hai.",
  },
  {
    id: "bio-mol-1", exams: N, subject: "Biology", chapter: "Molecular Basis of Inheritance", difficulty: 2, type: "mcq",
    q: "Okazaki fragments are formed during DNA replication on the:",
    options: ["Leading strand", "Lagging strand", "RNA primer only", "Both strands equally"], answer: 1,
    explain: "Lagging strand (3′→5′ template) par DNA chhote tukdon (Okazaki fragments) mein discontinuously banta hai, baad mein DNA ligase jodta hai.",
  },
  {
    id: "bio-phys-1", exams: N, subject: "Biology", chapter: "Chemical Coordination", difficulty: 1, type: "mcq",
    q: "Insulin, which lowers blood glucose level, is secreted by:",
    options: ["α-cells of pancreas", "β-cells of pancreas", "Adrenal cortex", "Thyroid gland"], answer: 1,
    explain: "Islets of Langerhans ke β-cells insulin banate hain; α-cells glucagon (jo glucose badhata hai).",
  },
  {
    id: "bio-circ-1", exams: N, subject: "Biology", chapter: "Body Fluids & Circulation", difficulty: 1, type: "mcq",
    q: "The natural pacemaker of the human heart is:",
    options: ["AV node", "Bundle of His", "SA node", "Purkinje fibres"], answer: 2,
    explain: "SA node (sinoatrial node) sabse zyada rate (~70–75/min) par impulse banata hai, isliye pacemaker hai.",
  },
  {
    id: "bio-plant-1", exams: N, subject: "Biology", chapter: "Photosynthesis", difficulty: 1, type: "mcq",
    q: "The light reaction of photosynthesis occurs in:",
    options: ["Stroma", "Thylakoid membranes (grana)", "Matrix of mitochondria", "Cytosol"], answer: 1,
    explain: "Light reaction thylakoid membranes mein hoti hai (ATP, NADPH banta hai). Calvin cycle stroma mein.",
  },
  {
    id: "bio-plant-2", exams: N, subject: "Biology", chapter: "Photosynthesis", difficulty: 2, type: "mcq",
    q: "In C₄ plants, the first stable product of CO₂ fixation is:",
    options: ["3-phosphoglycerate (3-PGA)", "Oxaloacetic acid (OAA)", "RuBP", "Phosphoenolpyruvate (PEP)"], answer: 1,
    explain: "C₄ plants mein CO₂ ko PEP carboxylase PEP se jodta hai aur pehla stable product OAA (4-carbon) milta hai. C₃ mein 3-PGA.",
  },
  {
    id: "bio-repro-1", exams: N, subject: "Biology", chapter: "Sexual Reproduction in Flowering Plants", difficulty: 1, type: "mcq",
    q: "After double fertilisation in angiosperms, the endosperm is:",
    options: ["Haploid (n)", "Diploid (2n)", "Triploid (3n)", "Tetraploid (4n)"], answer: 2,
    explain: "Ek male gamete 2 polar nuclei (n+n) se milta hai → primary endosperm nucleus 3n.",
  },
  {
    id: "bio-eco-1", exams: N, subject: "Biology", chapter: "Ecosystem", difficulty: 1, type: "mcq",
    q: "According to Lindeman's 10 percent law, the energy transferred from one trophic level to the next is approximately:",
    options: ["1%", "10%", "50%", "90%"], answer: 1,
    explain: "Har trophic level par lagbhag 10% energy agle level tak jaati hai, baaki respiration/heat mein kho jaati hai.",
  },
  {
    id: "bio-evo-1", exams: N, subject: "Biology", chapter: "Evolution", difficulty: 3, type: "numerical",
    q: "In a population in Hardy–Weinberg equilibrium, the frequency of the homozygous recessive genotype (q²) is 0.04. What is the frequency of heterozygotes (2pq)?",
    answer: 0.32, tol: 0.005,
    explain: "q² = 0.04 → q = 0.2, p = 1 − 0.2 = 0.8. 2pq = 2 × 0.8 × 0.2 = 0.32.",
  },
  {
    id: "bio-biotech-1", exams: N, subject: "Biology", chapter: "Biotechnology: Principles", difficulty: 2, type: "mcq",
    q: "Restriction endonucleases such as EcoRI recognise and cut DNA at specific:",
    options: ["Palindromic sequences", "Promoter regions", "Poly-A tails", "Ribosome-binding sites"], answer: 0,
    explain: "Restriction enzymes palindromic nucleotide sequences par kaatte hain (dono strands par same sequence 5′→3′ padhne par).",
  },
  {
    id: "bio-health-1", exams: N, subject: "Biology", chapter: "Human Health & Disease", difficulty: 1, type: "mcq",
    q: "The vector of the malarial parasite Plasmodium is:",
    options: ["Culex mosquito", "Aedes mosquito", "Female Anopheles mosquito", "Tsetse fly"], answer: 2,
    explain: "Plasmodium ko female Anopheles mosquito failata hai. Aedes dengue/chikungunya, Culex filaria failata hai.",
  },
  {
    id: "bio-excr-1", exams: N, subject: "Biology", chapter: "Excretory Products", difficulty: 1, type: "mcq",
    q: "Ultrafiltration of blood in the nephron occurs at:",
    options: ["Proximal convoluted tubule", "Glomerulus and Bowman's capsule", "Loop of Henle", "Collecting duct"], answer: 1,
    explain: "Glomerular capillaries ke high pressure se plasma Bowman's capsule mein filter hota hai (glomerular filtration).",
  },
  {
    id: "bio-neural-1", exams: N, subject: "Biology", chapter: "Neural Control", difficulty: 2, type: "mcq",
    q: "The resting membrane potential of a typical neuron is about:",
    options: ["+70 mV", "−70 mV", "0 mV", "−140 mV"], answer: 1,
    explain: "Resting state mein axon ke andar negative charge hota hai, lagbhag −70 mV (Na⁺/K⁺ pump aur K⁺ leak channels ki wajah se).",
  },
  {
    id: "bio-resp-1", exams: N, subject: "Biology", chapter: "Respiration in Plants", difficulty: 2, type: "mcq",
    q: "The net gain of ATP molecules in glycolysis per glucose molecule is:",
    options: ["2", "4", "8", "36"], answer: 0,
    explain: "Glycolysis mein 4 ATP bante hain par 2 ATP investment phase mein lagte hain → net 2 ATP.",
  },
  {
    id: "bio-hormone-1", exams: N, subject: "Biology", chapter: "Plant Growth & Development", difficulty: 1, type: "mcq",
    q: "Which plant hormone is gaseous and promotes fruit ripening?",
    options: ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"], answer: 2,
    explain: "Ethylene (C₂H₄) ek gaseous hormone hai jo fruit ripening aur senescence ko promote karta hai.",
  },
  {
    id: "bio-blood-1", exams: N, subject: "Biology", chapter: "Body Fluids & Circulation", difficulty: 2, type: "mcq",
    q: "A person with blood group AB has:",
    options: [
      "Antigens A and B on RBCs and no anti-A or anti-B antibodies in plasma",
      "Only antigen A on RBCs",
      "Both anti-A and anti-B antibodies in plasma",
      "No antigens on RBCs",
    ],
    answer: 0,
    explain: "AB group: RBC par A aur B dono antigen, plasma mein koi antibody nahi → universal recipient.",
  },
  {
    id: "bio-dig-1", exams: N, subject: "Biology", chapter: "Digestion & Absorption", difficulty: 1, type: "mcq",
    q: "Which enzyme digests proteins in the stomach?",
    options: ["Amylase", "Lipase", "Pepsin", "Maltase"], answer: 2,
    explain: "Gastric glands pepsinogen banate hain jo HCl se pepsin mein badalta hai; pepsin proteins ko peptides mein todta hai.",
  },
  {
    id: "bio-taxo-1", exams: N, subject: "Biology", chapter: "Biological Classification", difficulty: 1, type: "mcq",
    q: "The system of binomial nomenclature was introduced by:",
    options: ["Aristotle", "Carolus Linnaeus", "Charles Darwin", "R. H. Whittaker"], answer: 1,
    explain: "Linnaeus ne binomial nomenclature (Genus + species) diya. Whittaker ne five-kingdom classification.",
  },
  {
    id: "bio-cell-2", exams: N, subject: "Biology", chapter: "Cell Cycle & Division", difficulty: 1, type: "mcq",
    q: "The number of chromosomes in a normal human sperm cell is:",
    options: ["23", "46", "44", "22"], answer: 0,
    explain: "Meiosis se gametes haploid (n = 23) bante hain. Somatic cells diploid (2n = 46).",
  },
  {
    id: "bio-cell-3", exams: N, subject: "Biology", chapter: "Cell: Structure & Function", difficulty: 2, type: "mcq",
    q: "Which of the following organelles contains its own circular DNA and 70S ribosomes?",
    options: ["Golgi apparatus", "Mitochondria", "Lysosome", "Endoplasmic reticulum"], answer: 1,
    explain: "Mitochondria (aur chloroplast) semi-autonomous organelles hain: circular DNA aur 70S ribosomes rakhte hain.",
  },
  {
    id: "bio-gen-3", exams: N, subject: "Biology", chapter: "Principles of Inheritance", difficulty: 3, type: "mcq",
    q: "Sickle-cell anaemia results from a point mutation in the β-globin gene that replaces, at the 6th position:",
    options: [
      "Glutamic acid by valine",
      "Valine by glutamic acid",
      "Glycine by alanine",
      "Lysine by valine",
    ],
    answer: 0,
    explain: "GAG → GUG: 6th position par glutamic acid ki jagah valine aa jaata hai, isse HbS banta hai aur RBC sickle-shaped ho jaate hain.",
  },
];

export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"] as const;

export function questionsFor(exam: Question["exams"][number]): Question[] {
  return QUESTIONS.filter((q) => q.exams.includes(exam));
}
