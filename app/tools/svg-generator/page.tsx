import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { SvgGenerator } from "@/components/tools/svg-generator/SvgGenerator";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/svg-generator",
  title: "SVG Generator",
  description:
    "Generate editable SVG shape code with live preview and download/copy options.",
});

export default function SvgGeneratorPage() {
  const seo = getToolSeoContent("svg-generator");
  return (
    <>
      <ToolPageHeader slug="svg-generator" title="SVG Generator" />
      <ToolPrimarySurface>
      <SvgGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="svg-generator" content={seo} />
      <ToolRelatedFooter slug="svg-generator" />
    </>
  );
}
