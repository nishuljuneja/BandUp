import type { Metadata } from "next";
import PageClient from "./AchievementsClient";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "View your SpeakEasy achievements, badges and milestones as you master English.",
  alternates: { canonical: "/achievements" },
};

export default function Page() {
  return <PageClient />;
}
