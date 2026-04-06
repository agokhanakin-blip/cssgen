import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { AspectRatioGenerator } from "@/components/tools/aspect-ratio/AspectRatioGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/aspect-ratio-generator",
  title: "Aspect Ratio Generator",
  description:
    "Generate CSS aspect-ratio values and fallback padding percentages for responsive media containers.",
});

export default function AspectRatioGeneratorPage() {
  const seo = getToolSeoContent("aspect-ratio-generator");
  return (
    <>
      <PageHeader title="Aspect Ratio Generator" />
      <AspectRatioGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="aspect-ratio-generator" />
    </>
  );
}
