import type { Metadata } from "next";
import PageClient from "./DailyPracticeClient";

export const metadata: Metadata = {
  title: "Daily English Practice — Vocabulary & Grammar Exercises",
  description:
    "Build a daily English practice habit with fresh vocabulary, grammar and comprehension exercises every day.",
  alternates: { canonical: "/daily-practice" },
};

export default function Page() {
  return <PageClient />;
}
