import type { Metadata } from "next";
import PageClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your personalised SpeakEasy dashboard. Track progress, continue lessons and access all learning tools.",
  alternates: { canonical: "/dashboard" },
};

export default function Page() {
  return <PageClient />;
}
