import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { FaviconGenerator } from "@/components/tools/favicon/FaviconGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/favicon-generator",
  title: "Favicon Generator",
  description:
    "Create favicon PNG sizes and copy HTML icon tags from one uploaded source image.",
});

export default function FaviconGeneratorPage() {
  const seo = getToolSeoContent("favicon-generator");
  return (
    <>
      <PageHeader title="Favicon Generator" />
      <FaviconGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="favicon-generator" />
    </>
  );
}
