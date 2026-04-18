import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolUsageNotice } from "@/components/tools/ToolUsageNotice";
import { ImageResizerRounder } from "@/components/tools/image-resizer/ImageResizerRounder";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/image-resizer-rounder",
  title: "Image Resizer & Round Corners",
  description:
    "Upload images, resize online, round corners, and download optimized output in PNG/JPG/WEBP.",
});

export default function ImageResizerRounderPage() {
  const seo = getToolSeoContent("image-resizer-rounder");
  return (
    <>
      <ToolPageHeader slug="image-resizer-rounder" title="Image Resizer & Round Corners" />
      <ToolUsageNotice />
      <ToolPrimarySurface>
      <ImageResizerRounder />
      </ToolPrimarySurface>
      <ToolSeoArticle slug="image-resizer-rounder" content={seo} />
      <ToolRelatedFooter slug="image-resizer-rounder" />
    </>
  );
}
