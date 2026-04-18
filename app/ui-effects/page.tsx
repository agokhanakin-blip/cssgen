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
  title: "UI Effects",
  description:
    "Polish your interface with box shadow, text shadow, CSS filters, transitions, and transform generators — copy production-ready values.",
} as const;

export const metadata: Metadata = buildPageMetadata({
  path: "/ui-effects",
  title: PAGE.title,
  description: PAGE.description,
});

export default function UiEffectsPage() {
  const items = getToolsByCategory("ui-effects");

  return (
    <>
      <WebPageJsonLd
        path="/ui-effects"
        title={PAGE.title}
        description={PAGE.description}
      />
      <SeoBreadcrumb
        className="mb-6"
        items={[
          { name: "Home", href: "/" },
          { name: PAGE.title, href: "/ui-effects" },
        ]}
      />
      <PageHeader title="UI Effects" />
      <SectionTitle id="ui-effects-list">Tools</SectionTitle>
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
