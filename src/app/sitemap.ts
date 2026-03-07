import type { MetadataRoute } from "next";
import { grammarLessons } from "@/content/grammar-lessons";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://speakeasyapp.in";

  const staticRoutes = [
    "",
    "/vocabulary",
    "/grammar",
    "/reading",
    "/listening",
    "/speaking",
    "/writing",
    "/games",
    "/games/hangman",
    "/games/word-match",
    "/games/word-puzzle",
    "/games/sentence-scramble",
    "/pricing",
    "/login",
    "/signup",
    "/placement-test",
    "/tests",
    "/daily-practice",
    "/learning",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/game") ? 0.6 : 0.8,
  }));

  // Add grammar lesson pages
  const grammarEntries: MetadataRoute.Sitemap = grammarLessons.map(
    (lesson) => ({
      url: `${baseUrl}/grammar/${lesson.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...staticEntries, ...grammarEntries];
}
