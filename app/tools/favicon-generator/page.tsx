import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolUsageNotice } from "@/components/tools/ToolUsageNotice";
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
      <ToolPageHeader slug="favicon-generator" title="Favicon Generator" />
      <ToolUsageNotice maxFileSizeMb={10} />
      <ToolPrimarySurface>
      <FaviconGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="favicon-generator" content={seo} />
      <ToolRelatedFooter slug="favicon-generator" />
    </>
  );
}
