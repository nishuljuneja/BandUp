import type { Metadata } from "next";
import PageClient from "./PlacementTestClient";

export const metadata: Metadata = {
  title: "English Level Test — Find Your CEFR Level",
  description:
    "Take our free English placement test to discover your CEFR level (A1–C1) and get a personalised learning path tailored to your skills.",
  alternates: { canonical: "/placement-test" },
};

export default function Page() {
  return <PageClient />;
}
