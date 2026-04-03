import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { GradientGenerator } from "@/components/tools/gradient/GradientGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/gradient-generator",
  title: "Gradient Generator",
  description:
    "Create linear and radial CSS gradients with live preview, presets, random mode, and one-click copy.",
});

export default function GradientGeneratorPage() {
  const seo = getToolSeoContent("gradient-generator");
  return (
    <>
      <PageHeader title="Gradient Generator" />
      <GradientGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="gradient-generator" />
    </>
  );
}