import { OnboardingForm } from "./onboarding-form";
import { requireAuth } from "@/lib/require-auth";

export default async function OnboardingPage() {
  await requireAuth();
  return <OnboardingForm />;
}
