import type { Metadata } from "next";
import PageClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In to SpeakEasy",
  description:
    "Sign in to your SpeakEasy account to continue learning English with interactive lessons and exam preparation.",
  alternates: { canonical: "/login" },
};

export default function Page() {
  return <PageClient />;
}
