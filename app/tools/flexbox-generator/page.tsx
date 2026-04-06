import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { FlexboxGenerator } from "@/components/tools/flexbox/FlexboxGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/flexbox-generator",
  title: "Flexbox Generator",
  description:
    "Generate flexbox CSS with direction, alignment, gap, and wrap options using live preview.",
});

export default function FlexboxGeneratorPage() {
  const seo = getToolSeoContent("flexbox-generator");
  return (
    <>
      <PageHeader title="Flexbox Generator" />
      <FlexboxGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="flexbox-generator" />
    </>
  );
}
