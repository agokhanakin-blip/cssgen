import type { MetadataRoute } from "next";

export type StaticSitemapEntry = {
  /** Path beginning with `/` */
  path: `/${string}` | "/";
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
};

/**
 * Marketing / hub pages included in the sitemap. Add new static SEO pages here so
 * `sitemap.xml` stays in sync automatically.
 */
export const STATIC_SEO_ROUTES: StaticSitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/color-tools", changeFrequency: "weekly", priority: 0.8 },
  { path: "/css-generators", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ui-effects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.65 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.55 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.55 },
];

/**
 * Reserved for upcoming guides or example URLs. Ship empty; append entries as
 * you publish new indexable pages.
 */
export const FUTURE_SEO_ROUTES: StaticSitemapEntry[] = [];
