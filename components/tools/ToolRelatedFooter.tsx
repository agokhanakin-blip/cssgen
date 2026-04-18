import { SectionTitle } from "@/components/shared/SectionTitle";
import { TextLink } from "@/components/shared/TextLink";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { ToolCard } from "@/components/tools/ToolCard";
import { categories } from "@/data/categories";
import {
  getRelatedTools,
  getToolBySlug,
  toolHref,
  type ToolSlug,
} from "@/data/tools";

type ToolRelatedFooterProps = {
  slug: ToolSlug;
};

export function ToolRelatedFooter({ slug }: ToolRelatedFooterProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const related = getRelatedTools(slug);
  const category = categories.find((c) => c.id === tool.categoryId);
  const categoryHref = category?.href ?? null;

  return (
    <div className="mt-12 space-y-10 border-t border-zinc-200/80 pt-10">
      {categoryHref && category ? (
        <TextLink href={categoryHref} variant="default">
          ← {category.label}
        </TextLink>
      ) : null}

      {related.length > 0 ? (
        <div className="space-y-5">
          <SectionTitle id={`related-tools-${slug}`}>Related tools</SectionTitle>
          <ToolGrid className="mt-0">
            {related.map((r) => (
              <li key={r.slug}>
                <ToolCard title={r.title} href={toolHref(r.slug)} />
              </li>
            ))}
          </ToolGrid>
        </div>
      ) : null}
    </div>
  );
}

/** Alias for clearer SEO-facing naming ("Related tools" section). */
export { ToolRelatedFooter as RelatedTools };
