import type { Metadata } from "next";
import PageClient from "./WordPuzzleClient";

export const metadata: Metadata = {
  title: "Word Puzzle — English Spelling Game",
  description:
    "Solve word puzzles to improve your English spelling and vocabulary. Unscramble letters to form correct words.",
  alternates: { canonical: "/games/word-puzzle" },
};

export default function Page() {
  return <PageClient />;
}
