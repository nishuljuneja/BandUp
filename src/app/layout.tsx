import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EngLearn - Learn English for India",
    template: "%s | EngLearn",
  },
  description:
    "Master English step by step with lessons in your language. Built for India. CEFR-based proficiency levels from A1 to C2.",
  keywords: [
    "learn english",
    "english for india",
    "ESL",
    "CEFR",
    "vocabulary",
    "grammar",
    "english learning app",
    "learn english online",
    "english for beginners",
    "IELTS preparation",
    "spoken english india",
  ],
  authors: [{ name: "EngLearn" }],
  creator: "EngLearn",
  metadataBase: new URL("https://englearnapp.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "EngLearn",
    title: "EngLearn - Learn English for India",
    description:
      "Master English step by step with lessons in your language. Built for India. CEFR-based proficiency levels from A1 to C2.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EngLearn - Learn English for India",
    description:
      "Master English step by step with lessons in your language. Built for India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
