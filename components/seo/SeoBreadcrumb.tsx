import Link from "next/link";
import { classNames } from "@/utils/classNames";

export type SeoBreadcrumbItem = {
  name: string;
  /** When omitted on non-final items, the name renders as plain text. */
  href?: string;
};

type SeoBreadcrumbProps = {
  items: SeoBreadcrumbItem[];
  className?: string;
};

/**
 * Visible breadcrumb trail (links are crawlable). The last segment is never linked.
 */
export function SeoBreadcrumb({ items, className }: SeoBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={classNames(className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="text-zinc-300" aria-hidden>
                  /
                </span>
              ) : null}
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-900 hover:decoration-zinc-500"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={classNames(
                    isLast ? "font-semibold text-zinc-800" : "text-zinc-600"
                  )}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
