import type { ReactNode } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { SeoBreadcrumb } from "@/components/seo/SeoBreadcrumb";
import type { ToolSlug } from "@/data/tools";
import { buildToolBreadcrumbItems } from "@/lib/seo";

type ToolPageHeaderProps = {
  slug: ToolSlug;
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  className?: string;
  /** Set false to hide the breadcrumb row without losing the H1 layout. */
  showBreadcrumb?: boolean;
};

/**
 * Tool routes: crawlable breadcrumb + single H1 via `PageHeader`.
 */
export function ToolPageHeader({
  slug,
  title,
  description,
  eyebrow,
  className,
  showBreadcrumb = true,
}: ToolPageHeaderProps) {
  const items = buildToolBreadcrumbItems(slug).map((item) => ({
    name: item.name,
    href: item.href,
  }));
  const helperDescription =
    description ??
    "Adjust controls, preview instantly, and copy production-ready CSS in one flow.";

  return (
    <div className={className}>
      {showBreadcrumb ? (
        <SeoBreadcrumb items={items} className="mb-6" />
      ) : null}
      <PageHeader title={title} description={helperDescription} eyebrow={eyebrow} />
    </div>
  );
}
