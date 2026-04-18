import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { BorderRadiusGenerator } from "@/components/tools/border-radius/BorderRadiusGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/border-radius-generator",
  title: "Border Radius Generator",
  description:
    "Create border-radius CSS values with linked or individual corner controls, presets, and one-click copy.",
});

export default function BorderRadiusGeneratorPage() {
  const seo = getToolSeoContent("border-radius-generator");
  return (
    <>
      <ToolPageHeader slug="border-radius-generator" title="Border Radius Generator" />
      <ToolPrimarySurface>
      <BorderRadiusGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="border-radius-generator" content={seo} />
      <ToolRelatedFooter slug="border-radius-generator" />
    </>
  );
}