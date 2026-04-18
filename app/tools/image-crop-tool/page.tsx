import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolUsageNotice } from "@/components/tools/ToolUsageNotice";
import { ImageCropTool } from "@/components/tools/image-crop/ImageCropTool";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/image-crop-tool",
  title: "Image Crop Tool",
  description:
    "Crop uploaded images online with custom coordinates and download square PNG output quickly.",
});

export default function ImageCropToolPage() {
  const seo = getToolSeoContent("image-crop-tool");
  return (
    <>
      <ToolPageHeader slug="image-crop-tool" title="Image Crop Tool" />
      <ToolUsageNotice />
      <ImageCropTool />
      <ToolSeoArticle slug="image-crop-tool" content={seo} />
      <ToolRelatedFooter slug="image-crop-tool" />
    </>
  );
}
