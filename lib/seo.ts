import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildPageMetadataInput = {
  path: `/${string}` | "/";
  title: string;
  description: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  path,
  title,
  description,
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path;

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

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function fallbackToolDescription(toolTitle: string): string {
  const t = toolTitle.toLowerCase();
  return `Free online ${t} for web and UI work. Adjust options in the browser, preview live, and copy or export results. No signup — part of ${siteConfig.name}.`;
}
