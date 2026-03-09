import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "BandUp — IELTS Prep App | Raise Your Band Score",
  description:
    "BandUp helps you ace the IELTS with interactive vocabulary, grammar, reading, listening, speaking and writing practice. Band 3 to 7.5+ preparation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "BandUp — IELTS Prep App | Raise Your Band Score",
    description:
      "Interactive IELTS preparation for vocabulary, grammar, reading, listening, speaking & writing. Band 3 to 7.5+.",
  },
};

export default function Page() {
  return <HomeClient />;
}
