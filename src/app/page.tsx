import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Learn English Online — Free Vocabulary, Grammar & Exam Prep",
  description:
    "SpeakEasy helps you learn English step by step with interactive vocabulary, grammar, reading, listening, speaking and writing exercises. Prepare for IELTS, CELPIP, PTE & TOEFL exams. CEFR levels A1–C1.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SpeakEasy — Learn English Online | Free Lessons & Exam Prep",
    description:
      "Interactive English lessons for vocabulary, grammar, reading, listening, speaking & writing. Prepare for IELTS, CELPIP, PTE & TOEFL.",
  },
};

export default function Page() {
  return <HomeClient />;
}
