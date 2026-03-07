import type { Metadata } from "next";
import PageClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Learning Analytics",
  description:
    "Track your English learning progress with detailed analytics and performance insights.",
  alternates: { canonical: "/analytics" },
};

export default function Page() {
  return <PageClient />;
}
