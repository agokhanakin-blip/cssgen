import { siteConfig } from "@/lib/site";

const DESCRIPTION =
  "Free CSS design tools for gradients, box shadows, border radius, color palettes, layout utilities, and image helpers — fast, browser-based, copy-ready output.";

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
