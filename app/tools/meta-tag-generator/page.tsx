import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { MetaTagGenerator } from "@/components/tools/meta-tag/MetaTagGenerator";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/tools/meta-tag-generator",
  title: "Meta Tag Generator",
  description:
    "Generate SEO title, meta description, Open Graph tags, and preview how snippets may appear.",
});

export default function MetaTagGeneratorPage() {
  const seo = getToolSeoContent("meta-tag-generator");
  return (
    <>
      <ToolPageHeader slug="meta-tag-generator" title="Meta Tag Generator" />
      <MetaTagGenerator />
      <ToolSeoArticle slug="meta-tag-generator" content={seo} />
      <ToolRelatedFooter slug="meta-tag-generator" />
    </>
  );
}
