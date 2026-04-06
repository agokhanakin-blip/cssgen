import type { MetadataRoute } from "next";
import { toolHref, tools } from "@/data/tools";
import { siteConfig } from "@/lib/site";

type Changefreq = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function url(path: string): string {
  if (path === "/" || path === "") return `${siteConfig.siteUrl}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${p}`;
}

function entry(
  pathname: string,
  changeFrequency: Changefreq,
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: url(pathname),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1),
    entry("/color-tools", "weekly", 0.8),
    entry("/css-generators", "weekly", 0.8),
    entry("/ui-effects", "weekly", 0.8),
    entry("/about", "yearly", 0.65),
    entry("/contact", "yearly", 0.55),
    entry("/privacy-policy", "yearly", 0.55),
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((t) =>
    entry(toolHref(t.slug), "weekly", 0.9)
  );

  return [...staticPages, ...toolPages];
}
