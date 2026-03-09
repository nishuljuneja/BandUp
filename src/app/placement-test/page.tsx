import type { Metadata } from "next";
import PageClient from "./PlacementTestClient";

export const metadata: Metadata = {
  title: "IELTS Band Test — Find Your Band Level",
  description:
    "Take our free IELTS band diagnostic test to discover your current band level (Band 3–7.5+) and get a personalised study plan.",
  alternates: { canonical: "/placement-test" },
};

export default function Page() {
  return <PageClient />;
}
