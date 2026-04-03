import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildPageMetadataInput = {
  path: `/${string}` | "/";
  title: string;
  description: string;
};

export function buildPageMetadata({
  path,
  title,
  description,
}: BuildPageMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
    },
  };
}