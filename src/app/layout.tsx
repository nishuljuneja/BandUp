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
      "BandUp — IELTS Prep App | Boost Your IELTS Band Score",
    template: "%s | BandUp",
  },
  description:
    "Ace the IELTS with targeted practice for Reading, Writing, Listening and Speaking. Band-level lessons from Band 3 to 8-9. Free diagnostic test.",
  keywords: [
    "IELTS preparation",
    "IELTS practice test",
    "IELTS band score",
    "IELTS reading practice",
    "IELTS writing practice",
    "IELTS listening practice",
    "IELTS speaking practice",
    "IELTS vocabulary",
    "IELTS grammar",
    "IELTS band 7",
    "IELTS band 6",
    "IELTS prep app",
    "IELTS online course",
    "IELTS study plan",
    "IELTS exam preparation",
    "improve IELTS score",
    "IELTS test prep free",
  ],
  authors: [{ name: "BandUp" }],
  creator: "BandUp",
  metadataBase: new URL("https://bandup-ebon.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bandup-ebon.vercel.app",
    siteName: "BandUp",
    title: "BandUp — IELTS Prep App | Boost Your IELTS Band Score",
    description:
      "Ace the IELTS with targeted practice for Reading, Writing, Listening and Speaking. Band-level lessons from Band 3 to 8-9.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BandUp — IELTS Prep App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BandUp — IELTS Prep App | Boost Your Band Score",
    description:
      "Ace the IELTS with targeted practice. Band-level lessons from Band 3 to 8-9.",
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
        name: "BandUp",
        url: "https://bandup-ebon.vercel.app",
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free tier with Band 3–6 content",
        },
        description:
          "IELTS prep app with band-level lessons for Reading, Writing, Listening and Speaking. Diagnostic test, vocabulary, grammar and practice tests.",
        inLanguage: "en",
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "BandUp",
        url: "https://bandup-ebon.vercel.app",
        description:
          "Online IELTS preparation platform with band-level courses from Band 3 to 8-9.",
      },
      {
        "@type": "Course",
        name: "IELTS Preparation Course",
        description:
          "Comprehensive IELTS prep covering vocabulary, grammar, reading, listening, speaking and writing. Band-level content from Band 3 to 8-9.",
        provider: {
          "@type": "Organization",
          name: "BandUp",
          url: "https://bandup-ebon.vercel.app",
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
          "IELTS preparation",
          "IELTS reading",
          "IELTS writing",
          "IELTS listening",
          "IELTS speaking",
          "IELTS vocabulary",
          "IELTS grammar",
          "IELTS band score improvement",
        ],
      },
      {
        "@type": "WebSite",
        name: "BandUp",
        url: "https://bandup-ebon.vercel.app",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://bandup-ebon.vercel.app/learning?q={search_term_string}",
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
        <meta name="apple-mobile-web-app-title" content="BandUp" />
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
