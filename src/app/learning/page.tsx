import type { Metadata } from "next";
import PageClient from "./LearningClient";

export const metadata: Metadata = {
  title: "Learning Paths — Structured English Courses",
  description:
    "Follow structured learning paths to improve your English from beginner to advanced. CEFR-aligned courses for all skill levels.",
  alternates: { canonical: "/learning" },
};

export default function Page() {
  return <PageClient />;
}
