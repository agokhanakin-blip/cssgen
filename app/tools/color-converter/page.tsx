import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Color Converter" />
      <ColorConverter />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="color-converter" />
    </>
  );
}
