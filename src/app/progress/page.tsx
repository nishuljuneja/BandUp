import type { Metadata } from "next";
import PageClient from "./ProgressClient";

export const metadata: Metadata = {
  title: "My Progress",
  description:
    "Review your English learning progress across vocabulary, grammar, reading, listening, speaking and writing.",
  alternates: { canonical: "/progress" },
};

export default function Page() {
  return <PageClient />;
}
