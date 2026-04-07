import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
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
      <PageHeader title="Base64 Image Converter" />
      <ToolUsageNotice maxFileSizeMb={10} />
      <Base64ImageConverter />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="base64-image-converter" />
    </>
  );
}
