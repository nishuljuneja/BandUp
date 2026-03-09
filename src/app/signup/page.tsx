import type { Metadata } from "next";
import { Suspense } from "react";
import PageClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Create Your Free Account",
  description:
    "Join BandUp for free and start preparing for IELTS with band-level lessons, vocabulary building and practice tests.",
  alternates: { canonical: "/signup" },
};

export default function Page() {
  return (
    <Suspense>
      <PageClient />
    </Suspense>
  );
}
