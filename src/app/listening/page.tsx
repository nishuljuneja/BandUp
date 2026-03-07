import type { Metadata } from "next";
import PageClient from "./ListeningClient";

export const metadata: Metadata = {
  title: "English Listening Practice — Audio Exercises",
  description:
    "Sharpen your English listening skills with audio exercises at every level. Prepare for IELTS, CELPIP, PTE and TOEFL listening sections.",
  alternates: { canonical: "/listening" },
};

export default function Page() {
  return <PageClient />;
}
