import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"],
    },
    host: new URL(siteConfig.siteUrl).host,
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}