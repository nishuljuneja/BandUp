import type { Metadata } from "next";
import PageClient from "./ReadingClient";

export const metadata: Metadata = {
  title: "English Reading Practice — Comprehension Exercises",
  description:
    "Improve your English reading skills with graded passages and comprehension questions. Build skills for IELTS, CELPIP, PTE and TOEFL reading sections.",
  alternates: { canonical: "/reading" },
};

export default function Page() {
  return <PageClient />;
}
