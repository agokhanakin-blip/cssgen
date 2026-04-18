import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ColorConverter } from "@/components/tools/color-converter/ColorConverter";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/color-converter",
  title: "Color Converter",
  description:
    "Convert HEX to RGB and HSL, preview complementary colors, and copy CSS variables quickly.",
});

export default function ColorConverterPage() {
  const seo = getToolSeoContent("color-converter");
  return (
    <>
      <ToolPageHeader slug="color-converter" title="Color Converter" />
      <ToolPrimarySurface>
      <ColorConverter />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="color-converter" content={seo} />
      <ToolRelatedFooter slug="color-converter" />
    </>
  );
}
