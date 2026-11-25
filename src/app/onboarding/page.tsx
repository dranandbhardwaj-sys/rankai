import { redirect } from "next/navigation";

// Purana onboarding ab signup page mein merge ho gaya hai (naam + exam ek hi form mein).
export default function OnboardingPage() {
  redirect("/signup");
}
