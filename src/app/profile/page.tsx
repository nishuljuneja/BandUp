import type { Metadata } from "next";
import PageClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Manage your SpeakEasy profile, preferences and learning settings.",
  alternates: { canonical: "/profile" },
};

export default function Page() {
  return <PageClient />;
}
