import type { Metadata } from "next";
import PageClient from "./SpeakingClient";

export const metadata: Metadata = {
  title: "English Speaking Practice — Pronunciation & Fluency",
  description:
    "Practice speaking English with pronunciation exercises and fluency drills. Prepare for IELTS speaking, CELPIP and PTE oral exam sections.",
  alternates: { canonical: "/speaking" },
};

export default function Page() {
  return <PageClient />;
}
