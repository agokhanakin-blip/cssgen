import Link from "next/link";
import { classNames } from "@/utils/classNames";

type CategoryTileProps = {
  title: string;
  description: string;
  href: string | null;
};

const cardBase =
  "rounded-lg border p-5 text-left sm:p-6 transition-[border-color,box-shadow,transform] duration-200";

/**
 * Homepage category block — full card clickable when `href` is set.
 */
export function CategoryTile({ title, description, href }: CategoryTileProps) {
  const body = (
    <>
      <h3 className="text-base font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classNames(
          cardBase,
          "group block border-zinc-200/90 bg-[var(--surface)] shadow-ds-sm hover:border-zinc-300 hover:shadow-ds-md hover:-translate-y-0.5",
          "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
        )}
      >
        {body}
        <span className="mt-4 inline-block text-sm font-medium text-zinc-900 underline-offset-4 group-hover:underline">
          Browse category
        </span>
      </Link>
    );
  }

  return (
    <div
      className={classNames(
        cardBase,
        "cursor-default border-dashed border-zinc-300/80 bg-zinc-50/60"
      )}
    >
      {body}
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        Coming later
      </p>
    </div>
  );
}
