import type { Metadata } from "next";
import PageClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Create Your Free Account",
  description:
    "Join SpeakEasy for free and start learning English with interactive lessons, vocabulary building and exam preparation for IELTS, CELPIP, PTE and TOEFL.",
  alternates: { canonical: "/signup" },
};

export default function Page() {
  return <PageClient />;
}
