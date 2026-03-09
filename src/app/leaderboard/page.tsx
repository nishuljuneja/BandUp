import type { Metadata } from "next";
import PageClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See how you rank among other IELTS learners on the BandUp leaderboard.",
  alternates: { canonical: "/leaderboard" },
};

export default function Page() {
  return <PageClient />;
}
