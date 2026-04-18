import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { TransitionGenerator } from "@/components/tools/transition/TransitionGenerator";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/transition-generator",
  title: "Transition Generator",
  description:
    "Build CSS transition declarations for duration, delay, timing function, and property with live preview.",
});

export default function TransitionGeneratorPage() {
  const seo = getToolSeoContent("transition-generator");
  return (
    <>
      <ToolPageHeader slug="transition-generator" title="Transition Generator" />
      <ToolPrimarySurface>
      <TransitionGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="transition-generator" content={seo} />
      <ToolRelatedFooter slug="transition-generator" />
    </>
  );
}
