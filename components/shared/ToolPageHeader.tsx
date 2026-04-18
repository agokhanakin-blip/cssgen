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
  const heroEyebrow = eyebrow ?? "CSS Generator Tool";

  return (
    <section className={className}>
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-white via-[var(--surface-soft)] to-white px-4 py-6 shadow-ds-sm sm:px-6 sm:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgb(24_24_27_/_0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_27_/_0.06)_1px,transparent_1px)] [background-size:34px_34px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 right-[-4.5rem] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(13,148,136,0.2),transparent_62%)]"
          aria-hidden
        />
        <div className="relative">
          {showBreadcrumb ? (
            <SeoBreadcrumb items={items} className="mb-5" />
          ) : null}
          <PageHeader
            title={title}
            description={helperDescription}
            eyebrow={heroEyebrow}
            className="mb-0"
          />
        </div>
      </div>
    </section>
  );
}
