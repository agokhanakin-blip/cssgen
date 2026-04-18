import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolUsageNotice } from "@/components/tools/ToolUsageNotice";
import { Base64ImageConverter } from "@/components/tools/base64-image/Base64ImageConverter";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/base64-image-converter",
  title: "Base64 Image Converter",
  description:
    "Convert images to Base64 data URLs online and copy results for CSS, HTML, or email templates.",
});

export default function Base64ImageConverterPage() {
  const seo = getToolSeoContent("base64-image-converter");
  return (
    <>
      <ToolPageHeader slug="base64-image-converter" title="Base64 Image Converter" />
      <ToolUsageNotice maxFileSizeMb={10} />
      <ToolPrimarySurface>
      <Base64ImageConverter />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="base64-image-converter" content={seo} />
      <ToolRelatedFooter slug="base64-image-converter" />
    </>
  );
}
