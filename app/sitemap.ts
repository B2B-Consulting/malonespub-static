import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

const pages = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/menu", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pool", changeFrequency: "weekly", priority: 0.75 },
  { path: "/pool-tournament", changeFrequency: "weekly", priority: 0.8 },
  { path: "/soccer-2026", changeFrequency: "weekly", priority: 0.75 },
  { path: "/world-cup", changeFrequency: "weekly", priority: 0.8 },
  { path: "/world-cup-fort-worth", changeFrequency: "weekly", priority: 0.9 },
  { path: "/photos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/merch", changeFrequency: "monthly", priority: 0.4 },
  { path: "/irish-pub-fort-worth", changeFrequency: "monthly", priority: 0.85 },
  { path: "/dive-bar-fort-worth", changeFrequency: "monthly", priority: 0.85 },
  { path: "/downtown-fort-worth-bar", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pool-darts-fort-worth", changeFrequency: "monthly", priority: 0.85 },
  { path: "/golden-tee-fort-worth", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pinball-fort-worth", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guinness-fort-worth", changeFrequency: "monthly", priority: 0.8 },
  { path: "/late-night-bar-fort-worth", changeFrequency: "monthly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
