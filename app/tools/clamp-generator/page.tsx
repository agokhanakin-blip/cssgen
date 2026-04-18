import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ClampGenerator } from "@/components/tools/clamp/ClampGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/clamp-generator",
  title: "Clamp Generator",
  description:
    "Create fluid typography values with CSS clamp() using min, max, and viewport breakpoints.",
});

export default function ClampGeneratorPage() {
  const seo = getToolSeoContent("clamp-generator");
  return (
    <>
      <ToolPageHeader slug="clamp-generator" title="Clamp Generator" />
      <ClampGenerator />
      <ToolSeoArticle slug="clamp-generator" content={seo} />
      <ToolRelatedFooter slug="clamp-generator" />
    </>
  );
}
