import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { LogoGenerator } from "@/components/tools/logo/LogoGenerator";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/logo-generator",
  title: "Logo Generator",
  description:
    "Create simple brand logos with icon, text, color, layout controls, and export SVG or PNG.",
});

export default function LogoGeneratorPage() {
  const seo = getToolSeoContent("logo-generator");
  return (
    <>
      <ToolPageHeader slug="logo-generator" title="Logo Generator" />
      <ToolPrimarySurface>
      <LogoGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="logo-generator" content={seo} />
      <ToolRelatedFooter slug="logo-generator" />
    </>
  );
}
