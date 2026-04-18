import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { TextShadowGenerator } from "@/components/tools/text-shadow/TextShadowGenerator";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/text-shadow-generator",
  title: "Text Shadow Generator",
  description:
    "Generate text-shadow CSS values with live preview, presets, and one-click copy.",
});

export default function TextShadowGeneratorPage() {
  const seo = getToolSeoContent("text-shadow-generator");
  return (
    <>
      <ToolPageHeader slug="text-shadow-generator" title="Text Shadow Generator" />
      <ToolPrimarySurface>
      <TextShadowGenerator />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="text-shadow-generator" content={seo} />
      <ToolRelatedFooter slug="text-shadow-generator" />
    </>
  );
}
