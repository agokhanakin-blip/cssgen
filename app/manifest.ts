import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "CSS Tools",
    description:
      "Free CSS design tools for gradients, shadows, border radius, color palettes, and more.",
    start_url: "/",
    display: "browser",
    background_color: "#fafafa",
    theme_color: "#18181b",
    lang: "en",
    categories: ["design", "productivity", "utilities"],
  };
}
