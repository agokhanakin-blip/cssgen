import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
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
      <ToolPageHeader slug="aspect-ratio-generator" title="Aspect Ratio Generator" />
      <AspectRatioGenerator />
      <ToolSeoArticle slug="aspect-ratio-generator" content={seo} />
      <ToolRelatedFooter slug="aspect-ratio-generator" />
    </>
  );
}
