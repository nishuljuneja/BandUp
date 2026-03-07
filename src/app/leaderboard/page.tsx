import type { Metadata } from "next";
import PageClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See how you rank among other English learners on the SpeakEasy leaderboard.",
  alternates: { canonical: "/leaderboard" },
};

export default function Page() {
  return <PageClient />;
}
