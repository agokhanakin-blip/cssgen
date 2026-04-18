import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { SeoBreadcrumb } from "@/components/seo/SeoBreadcrumb";
import { WebPageJsonLd } from "@/components/seo/WebPageJsonLd";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolsByCategory, toolHref } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

const PAGE = {
  title: "Color Tools",
  description:
    "Color palette generation, HEX/RGB/HSL conversion, and harmony presets — build cohesive UI palettes without leaving the browser.",
} as const;

export const metadata: Metadata = buildPageMetadata({
  path: "/color-tools",
  title: PAGE.title,
  description: PAGE.description,
});

export default function ColorToolsPage() {
  const items = getToolsByCategory("color-tools");

  return (
    <>
      <WebPageJsonLd
        path="/color-tools"
        title={PAGE.title}
        description={PAGE.description}
      />
      <SeoBreadcrumb
        className="mb-6"
        items={[
          { name: "Home", href: "/" },
          { name: PAGE.title, href: "/color-tools" },
        ]}
      />
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