import type { Metadata } from "next";
import PageClient from "./GrammarClient";

export const metadata: Metadata = {
  title: "English Grammar Lessons — Rules, Examples & Practice",
  description:
    "Master English grammar with clear explanations and interactive exercises. From basic tenses to advanced structures. Ideal for IELTS, CELPIP, PTE and TOEFL grammar preparation.",
  alternates: { canonical: "/grammar" },
};

export default function Page() {
  return <PageClient />;
}
