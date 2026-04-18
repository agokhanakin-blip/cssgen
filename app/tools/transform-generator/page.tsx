import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { TransformGenerator } from "@/components/tools/transform/TransformGenerator";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/transform-generator",
  title: "Transform Generator",
  description:
    "Generate CSS transform values for translate, rotate, scale, and skew with instant visual feedback.",
});

export default function TransformGeneratorPage() {
  const seo = getToolSeoContent("transform-generator");
  return (
    <>
      <ToolPageHeader slug="transform-generator" title="Transform Generator" />
      <ToolPrimarySurface>
      <TransformGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="transform-generator" content={seo} />
      <ToolRelatedFooter slug="transform-generator" />
    </>
  );
}
