import type { Metadata } from "next";
import PageClient from "./TestsClient";

export const metadata: Metadata = {
  title: "English Practice Tests — Mock Exams & Assessments",
  description:
    "Take practice tests to assess your English skills. Mock exams aligned with IELTS, CELPIP, PTE and TOEFL formats.",
  alternates: { canonical: "/tests" },
};

export default function Page() {
  return <PageClient />;
}
