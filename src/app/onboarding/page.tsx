import type { Metadata } from "next";
import PageClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Set up your BandUp profile and start your IELTS preparation journey.",
  alternates: { canonical: "/onboarding" },
};

export default function Page() {
  return <PageClient />;
}
