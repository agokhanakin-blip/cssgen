import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { CssUnitConverter } from "@/components/tools/css-unit-converter/CssUnitConverter";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/css-unit-converter",
  title: "CSS Unit Converter",
  description:
    "Convert px values into rem, em, and percentages instantly for responsive CSS workflows.",
});

export default function CssUnitConverterPage() {
  const seo = getToolSeoContent("css-unit-converter");
  return (
    <>
      <PageHeader title="CSS Unit Converter" />
      <CssUnitConverter />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="css-unit-converter" />
    </>
  );
}
