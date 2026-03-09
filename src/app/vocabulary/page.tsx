import type { Metadata } from "next";
import PageClient from "./VocabularyClient";

export const metadata: Metadata = {
  title: "IELTS Vocabulary Builder — Learn New Words Daily",
  description:
    "Build your IELTS vocabulary with curated word lists, flashcards and quizzes. Band 3 to 8-9 vocabulary preparation.",
  alternates: { canonical: "/vocabulary" },
};

export default function Page() {
  return <PageClient />;
}
