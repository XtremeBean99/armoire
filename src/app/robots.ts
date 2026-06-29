import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://armoire.ahmedyhussain.com";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Claude-SearchBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "omgili", disallow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
