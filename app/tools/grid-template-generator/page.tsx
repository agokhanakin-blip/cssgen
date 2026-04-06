import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Grid Template Generator" />
      <GridTemplateGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="grid-template-generator" />
    </>
  );
}
