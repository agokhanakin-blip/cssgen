import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory, toolHref } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/color-tools",
  title: "Color Tools",
  description:
    "Color palette generation, HEX/RGB/HSL conversion, and harmony presets — build cohesive UI palettes without leaving the browser.",
});

export default function ColorToolsPage() {
  const items = getToolsByCategory("color-tools");

  return (
    <>
      <PageHeader title="Color Tools" />
      <SectionTitle id="color-tools-list">Tools</SectionTitle>
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