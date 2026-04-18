import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  organizationId,
  websiteId,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const DEFAULT_DESCRIPTION =
  "Free CSS design tools for gradients, box shadows, border radius, color palettes, layout utilities, and image helpers — fast, browser-based, copy-ready output.";

/**
 * Site-wide Organization + WebSite graph (linked data IDs for other schemas).
 */
export function GlobalWebsiteJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(),
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        description: siteConfig.tagline ?? DEFAULT_DESCRIPTION,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon"),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId(),
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        description: siteConfig.tagline ?? DEFAULT_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": organizationId() },
      },
    ],
  };

  return <JsonLd data={graph} />;
}
