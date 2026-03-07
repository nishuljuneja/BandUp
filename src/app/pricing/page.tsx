import type { Metadata } from "next";
import PageClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — SpeakEasy Pro Plans",
  description:
    "Upgrade to SpeakEasy Pro for full access to reading, listening, speaking, writing and unlimited daily practice. Start free, upgrade anytime.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return <PageClient />;
}
