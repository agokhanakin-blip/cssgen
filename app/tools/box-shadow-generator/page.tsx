import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { BoxShadowGenerator } from "@/components/tools/box-shadow/BoxShadowGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/box-shadow-generator",
  title: "Box Shadow Generator",
  description:
    "Generate CSS box-shadow values with visual controls for offset, blur, spread, color, and opacity.",
});

export default function BoxShadowGeneratorPage() {
  const seo = getToolSeoContent("box-shadow-generator");
  return (
    <>
      <PageHeader title="Box Shadow Generator" />
      <BoxShadowGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="box-shadow-generator" />
    </>
  );
}