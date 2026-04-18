import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { FilterGenerator } from "@/components/tools/filter/FilterGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/filter-generator",
  title: "Filter Generator",
  description:
    "Build CSS filter values with blur, brightness, contrast, saturate, and hue rotate controls.",
});

export default function FilterGeneratorPage() {
  const seo = getToolSeoContent("filter-generator");
  return (
    <>
      <ToolPageHeader slug="filter-generator" title="Filter Generator" />
      <FilterGenerator />
      <ToolSeoArticle slug="filter-generator" content={seo} />
      <ToolRelatedFooter slug="filter-generator" />
    </>
  );
}
