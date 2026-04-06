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
    background_color: "#f1f0ed",
    theme_color: "#0d9488",
    lang: "en",
    categories: ["design", "productivity", "utilities"],
  };
}
