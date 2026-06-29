import type { MetadataRoute } from "next";

const base = "https://armoire.ahmedyhussain.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/wardrobe`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/add`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
