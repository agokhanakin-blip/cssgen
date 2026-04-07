import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolUsageNotice } from "@/components/tools/ToolUsageNotice";
import { ImageConverter } from "@/components/tools/image-converter/ImageConverter";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/image-converter",
  title: "Image Converter",
  description:
    "Convert JPG, PNG, and WEBP images online in your browser and download optimized output instantly.",
});

export default function ImageConverterPage() {
  const seo = getToolSeoContent("image-converter");

  return (
    <>
      <PageHeader title="Image Converter" />
      <ToolUsageNotice maxFileSizeMb={10} />
      <ImageConverter />
      <ToolSeoArticle content={seo} />
      <ToolRelatedFooter slug="image-converter" />
    </>
  );
}
