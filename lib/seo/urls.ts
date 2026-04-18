import { siteConfig } from "@/lib/site";

/**
 * Absolute site origin (no trailing slash).
 */
export function getSiteOrigin(): string {
  return siteConfig.siteUrl.replace(/\/+$/, "");
}

/**
 * Build an absolute URL for a pathname (e.g. `/about` → `https://example.com/about`).
 */
export function absoluteUrl(pathname: string): string {
  const origin = getSiteOrigin();
  if (!pathname || pathname === "/") return `${origin}/`;
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${origin}${p}`;
}
