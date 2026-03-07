import type { Metadata } from "next";
import PageClient from "./HangmanClient";

export const metadata: Metadata = {
  title: "Hangman — English Word Game",
  description:
    "Play Hangman to practise English vocabulary. Guess letters to reveal words and improve your spelling skills.",
  alternates: { canonical: "/games/hangman" },
};

export default function Page() {
  return <PageClient />;
}
