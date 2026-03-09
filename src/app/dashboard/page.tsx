import type { Metadata } from "next";
import PageClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your personalised BandUp dashboard. Track IELTS progress, continue lessons and access all prep tools.",
  alternates: { canonical: "/dashboard" },
};

export default function Page() {
  return <PageClient />;
}
