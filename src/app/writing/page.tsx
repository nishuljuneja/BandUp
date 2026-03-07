import type { Metadata } from "next";
import PageClient from "./WritingClient";

export const metadata: Metadata = {
  title: "English Writing Practice — Essays, Letters & Reports",
  description:
    "Improve your English writing with guided exercises for essays, letters and reports. Prepare for IELTS, CELPIP, PTE and TOEFL writing sections.",
  alternates: { canonical: "/writing" },
};

export default function Page() {
  return <PageClient />;
}
