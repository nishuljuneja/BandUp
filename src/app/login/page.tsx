import type { Metadata } from "next";
import PageClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In to BandUp",
  description:
    "Sign in to your BandUp account to continue your IELTS preparation with band-level lessons and practice tests.",
  alternates: { canonical: "/login" },
};

export default function Page() {
  return <PageClient />;
}
