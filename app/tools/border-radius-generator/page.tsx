import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { BorderRadiusGenerator } from "@/components/tools/border-radius/BorderRadiusGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Border Radius Generator" />
      <BorderRadiusGenerator />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="border-radius-generator" />
    </>
  );
}