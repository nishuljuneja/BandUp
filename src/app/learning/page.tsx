import type { Metadata } from "next";
import PageClient from "./LearningClient";

export const metadata: Metadata = {
  title: "Learning Paths — Structured IELTS Courses",
  description:
    "Follow structured learning paths to raise your IELTS band from Band 3 to 7.5+. Band-level courses for all four skills.",
  alternates: { canonical: "/learning" },
};

export default function Page() {
  return <PageClient />;
}
