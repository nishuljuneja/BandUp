import type { Metadata } from "next";
import PageClient from "./VocabularyClient";

export const metadata: Metadata = {
  title: "English Vocabulary Builder — Learn New Words Daily",
  description:
    "Build your English vocabulary with curated word lists, flashcards and quizzes. Perfect for IELTS, CELPIP, PTE and TOEFL vocabulary preparation. CEFR levels A1–C1.",
  alternates: { canonical: "/vocabulary" },
};

export default function Page() {
  return <PageClient />;
}
