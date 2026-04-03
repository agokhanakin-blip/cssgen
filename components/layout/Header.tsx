import Link from "next/link";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";
import { classNames } from "@/utils/classNames";

const shellClass =
  "mx-auto flex h-[3.25rem] max-w-6xl items-center justify-between gap-6 px-4 sm:h-14 sm:px-6 lg:px-10";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur-md supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--surface)_88%,transparent)]">
      <div className={shellClass}>
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 transition-colors hover:text-zinc-700 sm:text-[0.9375rem]"
        >
          {siteConfig.name}
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-5 gap-y-1 text-sm sm:gap-x-6"
          aria-label="Main navigation"
        >
          {categories.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className="text-zinc-600 transition-colors hover:text-zinc-900"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.id}
                className={classNames(
                  "cursor-default text-zinc-400",
                  "select-none"
                )}
              >
                {item.label}
              </span>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
