import Link from "next/link";
import { classNames } from "@/utils/classNames";

type CategoryTileProps = {
  title: string;
  description: string;
  href: string | null;
};

const cardBase =
  "group relative overflow-hidden rounded-2xl border p-5 text-left transition-[border-color,box-shadow,transform] duration-500 ease-out sm:p-7";

/**
 * Homepage category block — full card clickable when `href` is set.
 */
export function CategoryTile({ title, description, href }: CategoryTileProps) {
  const body = (
    <>
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem]">
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
          "border-zinc-200/65 bg-gradient-to-br from-white via-[var(--surface-soft)] to-[color-mix(in_oklab,var(--surface)_94%,#eef2f2)] shadow-ds-sm ring-1 ring-inset ring-white/70 hover:-translate-y-1 hover:border-teal-300/55 hover:shadow-ds-float hover:shadow-ds-glow",
          "outline-none focus-visible:ring-2 focus-visible:ring-teal-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        )}
      >
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-400/[0.04] via-transparent to-amber-400/[0.05] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        <div className="relative">{body}</div>
        <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-800">
          <span className="h-px w-6 bg-gradient-to-r from-teal-500 to-emerald-500" />
          Browse category
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    );
  }

  return (
    <div
      className={classNames(
        cardBase,
        "cursor-default border-dashed border-zinc-300/90 bg-zinc-50/80"
      )}
    >
      {body}
      <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
        Coming later
      </p>
    </div>
  );
}
