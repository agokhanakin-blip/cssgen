import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { RobotsTxtGenerator } from "@/components/tools/robots-txt/RobotsTxtGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/robots-txt-generator",
  title: "Robots.txt Generator",
  description:
    "Create a clean robots.txt file with crawl rules and sitemap references for website indexing.",
});

export default function RobotsTxtGeneratorPage() {
  const seo = getToolSeoContent("robots-txt-generator");
  return (
    <>
      <PageHeader title="Robots.txt Generator" />
      <RobotsTxtGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="robots-txt-generator" />
    </>
  );
}
