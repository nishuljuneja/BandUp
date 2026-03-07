import type { Metadata } from "next";
import PageClient from "./GamesClient";

export const metadata: Metadata = {
  title: "English Learning Games — Fun Vocabulary & Word Games",
  description:
    "Learn English the fun way with word puzzles, sentence scrambles, hangman and word matching games. Make vocabulary building enjoyable and effective.",
  alternates: { canonical: "/games" },
};

export default function Page() {
  return <PageClient />;
}
