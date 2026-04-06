import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { ToolRelatedFooter } from "@/components/tools/ToolRelatedFooter";
import { getToolBySlug, tools, type ToolSlug } from "@/data/tools";
import { buildPageMetadata, fallbackToolDescription } from "@/lib/seo";

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

  return (
    <>
      <PageHeader title={tool.title} />

      <div
        className="min-h-[12rem] rounded-lg border border-dashed border-zinc-200/90 bg-[var(--surface)] p-8 text-center text-sm text-zinc-500 shadow-ds-sm"
        aria-label="Tool workspace placeholder"
      >
        Tool UI placeholder
      </div>

      <ToolRelatedFooter slug={tool.slug as ToolSlug} />
    </>
  );
}
