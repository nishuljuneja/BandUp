import type { Metadata } from "next";
import PageClient from "./WordMatchClient";

export const metadata: Metadata = {
  title: "Word Match — English Vocabulary Game",
  description:
    "Match English words with their meanings to build your vocabulary. A fun and effective way to learn new words.",
  alternates: { canonical: "/games/word-match" },
};

export default function Page() {
  return <PageClient />;
}
