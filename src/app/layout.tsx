import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorker";
import NotificationPrompt from "@/components/NotificationPrompt";

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
    default:
      "SpeakEasy — Learn English Online | IELTS, CELPIP, PTE & TOEFL Prep",
    template: "%s | SpeakEasy",
  },
  description:
    "Master English with interactive vocabulary, grammar, reading, listening, speaking and writing lessons. Prepare for IELTS, CELPIP, PTE & TOEFL exams. CEFR-aligned levels A1–C1.",
  keywords: [
    "learn english online",
    "english learning app",
    "IELTS preparation",
    "IELTS practice test",
    "CELPIP preparation",
    "CELPIP practice",
    "PTE preparation",
    "PTE practice test",
    "TOEFL preparation",
    "TOEFL practice",
    "english vocabulary builder",
    "english grammar practice",
    "english reading comprehension",
    "english listening practice",
    "english speaking practice",
    "english writing practice",
    "CEFR english levels",
    "ESL online",
    "english for beginners",
    "spoken english course",
    "free english course online",
    "english exam preparation",
    "improve english skills",
  ],
  authors: [{ name: "SpeakEasy" }],
  creator: "SpeakEasy",
  metadataBase: new URL("https://speakeasyapp.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://speakeasyapp.in",
    siteName: "SpeakEasy",
    title: "SpeakEasy — Learn English Online | IELTS, CELPIP, PTE & TOEFL Prep",
    description:
      "Master English with interactive lessons and exam prep for IELTS, CELPIP, PTE & TOEFL. CEFR-aligned levels A1–C1.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpeakEasy — Learn English Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeakEasy — Learn English Online | Exam Prep",
    description:
      "Master English with interactive lessons. Prepare for IELTS, CELPIP, PTE & TOEFL exams.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SpeakEasy",
        url: "https://speakeasyapp.in",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          description: "Free tier with vocabulary & grammar",
        },
        description:
          "Interactive English learning app with vocabulary, grammar, reading, listening, speaking and writing lessons. Prepare for IELTS, CELPIP, PTE & TOEFL exams.",
        inLanguage: "en",
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "SpeakEasy",
        url: "https://speakeasyapp.in",
        description:
          "Online English learning platform offering CEFR-aligned courses for learners at all levels, with exam preparation for IELTS, CELPIP, PTE and TOEFL.",
      },
      {
        "@type": "Course",
        name: "English Proficiency Course",
        description:
          "Comprehensive English course covering vocabulary, grammar, reading, listening, speaking and writing skills. CEFR-aligned levels A1 to C1.",
        provider: {
          "@type": "Organization",
          name: "SpeakEasy",
          url: "https://speakeasyapp.in",
        },
        hasCourseInstance: [
          {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT30M",
            inLanguage: "en",
          },
        ],
        about: [
          "English vocabulary",
          "English grammar",
          "IELTS preparation",
          "CELPIP preparation",
          "PTE preparation",
          "TOEFL preparation",
          "English reading comprehension",
          "English listening skills",
          "English speaking practice",
          "English writing skills",
        ],
      },
      {
        "@type": "WebSite",
        name: "SpeakEasy",
        url: "https://speakeasyapp.in",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://speakeasyapp.in/learning?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SpeakEasy" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col`}
      >
        <AuthProvider>
          <ServiceWorkerRegistration />
          <NotificationPrompt />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
