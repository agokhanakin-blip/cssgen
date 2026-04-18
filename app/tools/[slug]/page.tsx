import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolStructuredData } from "@/components/seo/ToolStructuredData";
import { ToolPageHeader } from "@/components/shared/ToolPageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { ToolPrimarySurface } from "@/components/tools/ToolPrimarySurface";
import { ToolSeoArticle } from "@/components/tools/seo/ToolSeoArticle";
import { getToolBySlug, toolHref, tools, type ToolSlug } from "@/data/tools";
import { getToolSeoContent } from "@/data/toolSeoContent";
import { absoluteUrl, buildPageMetadata, fallbackToolDescription } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const STATIC_TOOL_SLUGS = new Set([
  "gradient-generator",
  "box-shadow-generator",
  "border-radius-generator",
  "color-palette-generator",
  "text-shadow-generator",
  "clamp-generator",
  "transition-generator",
  "transform-generator",
  "color-converter",
  "image-resizer-rounder",
  "css-unit-converter",
  "meta-tag-generator",
  "robots-txt-generator",
  "base64-image-converter",
  "filter-generator",
  "flexbox-generator",
  "grid-template-generator",
  "aspect-ratio-generator",
  "image-crop-tool",
  "image-converter",
  "svg-generator",
  "favicon-generator",
  "logo-generator",
]);

export function generateStaticParams() {
  return tools
    .filter((t) => !STATIC_TOOL_SLUGS.has(t.slug))
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return {
      title: "Tool not found",
      robots: { index: false, follow: false, googleBot: { index: false } },
    };
  }
  const path = `/tools/${tool.slug}` as `/${string}`;
  return buildPageMetadata({
    path,
    title: tool.title,
    description: fallbackToolDescription(tool.title),
  });
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const seo = getToolSeoContent(tool.slug);
  const canonicalUrl = absoluteUrl(toolHref(tool.slug));
  const faq = seo.faq.length > 0 ? seo.faq : undefined;
  const toolDescription = seo.whatIs[0] ?? fallbackToolDescription(tool.title);

  return (
    <>
      <ToolStructuredData
        slug={tool.slug}
        toolName={tool.title}
        toolDescription={toolDescription}
        canonicalUrl={canonicalUrl}
        faq={faq}
      />
      <ToolPageHeader slug={tool.slug} title={tool.title} />

      <ToolPrimarySurface>
        <div
          className="min-h-[12rem] rounded-lg border border-dashed border-zinc-200/90 bg-[var(--surface)] p-8 text-center text-sm text-zinc-500"
          aria-label="Tool workspace placeholder"
        >
          Tool UI placeholder
        </div>
      </ToolPrimarySurface>

      <ToolSeoArticle slug={tool.slug} content={seo} renderStructuredData={false} />
      <ToolRelatedFooter slug={tool.slug as ToolSlug} />
    </>
  );
}
