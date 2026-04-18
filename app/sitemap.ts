import type { MetadataRoute } from "next";
import { toolHref, tools } from "@/data/tools";
import { FUTURE_SEO_ROUTES, STATIC_SEO_ROUTES } from "@/lib/seo/routes";
import { siteConfig } from "@/lib/site";

type Changefreq = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function url(path: string): string {
  if (path === "/" || path === "") return `${siteConfig.siteUrl}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${p}`;
}

function sitemapLastModified(): Date {
  const iso = process.env.SEO_SITEMAP_LASTMOD_ISO;
  if (iso) {
    const parsed = new Date(iso);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

function entry(
  pathname: string,
  changeFrequency: Changefreq,
  priority: number,
  lastModified: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: url(pathname),
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = sitemapLastModified();

  const staticPages: MetadataRoute.Sitemap = [...STATIC_SEO_ROUTES, ...FUTURE_SEO_ROUTES].map(
    (r) => entry(r.path, r.changeFrequency, r.priority, lastModified)
  );

  const toolPages: MetadataRoute.Sitemap = [...tools]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((t) => entry(toolHref(t.slug), "weekly", 0.9, lastModified));

  return [...staticPages, ...toolPages];
}
