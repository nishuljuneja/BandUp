import type { Metadata } from "next";
import PageClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — BandUp Pro Plans",
  description:
    "Upgrade to BandUp Pro for full access to all IELTS band levels, reading, listening, speaking, writing and unlimited daily practice. Start free, upgrade anytime.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return <PageClient />;
}
