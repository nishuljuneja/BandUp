import type { Metadata } from "next";
import PageClient from "./SentenceScrambleClient";

export const metadata: Metadata = {
  title: "Sentence Scramble — English Grammar Game",
  description:
    "Rearrange scrambled words to form correct English sentences. A fun way to practise grammar and sentence structure.",
  alternates: { canonical: "/games/sentence-scramble" },
};

export default function Page() {
  return <PageClient />;
}
