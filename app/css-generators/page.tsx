import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory, toolHref } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/css-generators",
  title: "CSS Generators",
  description:
    "Use free CSS generators for gradients, box shadows, and border radius with instant previews and copy-ready code.",
});

export default function CssGeneratorsPage() {
  const items = getToolsByCategory("css-generators");

  return (
    <>
      <PageHeader title="CSS Generators" />
      <SectionTitle id="css-generators-list">Tools</SectionTitle>
      <ToolGrid className="mt-6">
        {items.map((tool) => (
          <li key={tool.slug}>
            <ToolCard title={tool.title} href={toolHref(tool.slug)} />
          </li>
        ))}
      </ToolGrid>
    </>
  );
}