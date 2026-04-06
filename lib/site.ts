const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cssgen.io";

export const siteConfig = {
  name: "CSS Design Tools",
  siteUrl: rawSiteUrl.replace(/\/+$/, ""),
} as const;
