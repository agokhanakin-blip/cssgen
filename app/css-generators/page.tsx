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
  title: "CSS Generators",
  description:
    "Free layout and style generators: gradients, border-radius, clamp(), flexbox, grid templates, aspect-ratio, SVG, favicons, logos, and image tools with live preview.",
} as const;

export const metadata: Metadata = buildPageMetadata({
  path: "/css-generators",
  title: PAGE.title,
  description: PAGE.description,
});

export default function CssGeneratorsPage() {
  const items = getToolsByCategory("css-generators");

  return (
    <>
      <WebPageJsonLd
        path="/css-generators"
        title={PAGE.title}
        description={PAGE.description}
      />
      <SeoBreadcrumb
        className="mb-6"
        items={[
          { name: "Home", href: "/" },
          { name: PAGE.title, href: "/css-generators" },
        ]}
      />
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