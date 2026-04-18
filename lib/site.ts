const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cssgen.io";

export const siteConfig = {
  name: "CSS Design Tools",
  /** Used in JSON-LD and global metadata when a short site summary is needed */
  tagline:
    "Free CSS design tools for gradients, shadows, border radius, color palettes, layout utilities, and image helpers — fast, browser-based, copy-ready output.",
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
} as const;
