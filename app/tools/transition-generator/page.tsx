import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Transition Generator" />
      <TransitionGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="transition-generator" />
    </>
  );
}
