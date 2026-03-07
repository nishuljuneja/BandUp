import type { Metadata } from "next";
import PageClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Set up your SpeakEasy profile and start your English learning journey.",
  alternates: { canonical: "/onboarding" },
};

export default function Page() {
  return <PageClient />;
}
