import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo/urls";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
} as const;

type BuildPageMetadataInput = {
  path: `/${string}` | "/";
  title: string;
  description: string;
  noIndex?: boolean;
};

/**
 * Page-level metadata with self-referencing canonical, Open Graph, and Twitter.
 * Relies on root `metadataBase` in `app/layout.tsx` for absolute canonical URLs.
 */
export function buildPageMetadata({
  path,
  title,
  description,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = path === "/" ? "/" : path;

  const robots: Metadata["robots"] = noIndex
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      };

  const ogUrl = absoluteUrl(canonicalPath === "/" ? "/" : canonicalPath);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: ogUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: DEFAULT_OG_IMAGE.url,
          width: DEFAULT_OG_IMAGE.width,
          height: DEFAULT_OG_IMAGE.height,
          alt: `${siteConfig.name} — preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function fallbackToolDescription(toolTitle: string): string {
  const t = toolTitle.toLowerCase();
  return `Free online ${t} for web and UI work. Adjust options in the browser, preview live, and copy or export results. No signup — part of ${siteConfig.name}.`;
}
