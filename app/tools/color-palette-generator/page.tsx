import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ColorPaletteGenerator } from "@/components/tools/color-palette/ColorPaletteGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/color-palette-generator",
  title: "Color Palette Generator",
  description:
    "Generate harmonious color palettes from a base color and copy hex values or CSS variables instantly.",
});

export default function ColorPaletteGeneratorPage() {
  const seo = getToolSeoContent("color-palette-generator");
  return (
    <>
      <PageHeader title="Color Palette Generator" />
      <ColorPaletteGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="color-palette-generator" />
    </>
  );
}