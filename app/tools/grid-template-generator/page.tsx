import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { GridTemplateGenerator } from "@/components/tools/grid-template/GridTemplateGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/grid-template-generator",
  title: "Grid Template Generator",
  description:
    "Create CSS grid-template columns, rows, and gap values with real-time visual output.",
});

export default function GridTemplateGeneratorPage() {
  const seo = getToolSeoContent("grid-template-generator");
  return (
    <>
      <ToolPageHeader slug="grid-template-generator" title="Grid Template Generator" />
      <ToolPrimarySurface>
      <GridTemplateGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="grid-template-generator" content={seo} />
      <ToolRelatedFooter slug="grid-template-generator" />
    </>
  );
}
