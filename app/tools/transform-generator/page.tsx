import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Transform Generator" />
      <TransformGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="transform-generator" />
    </>
  );
}
