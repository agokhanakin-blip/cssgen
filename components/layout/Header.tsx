import Link from "next/link";
import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";
import { classNames } from "@/utils/classNames";

const shellClass =
  "mx-auto flex h-[3.5rem] max-w-6xl items-center justify-between gap-6 px-4 sm:h-[3.65rem] sm:px-6 lg:px-10";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-[color-mix(in_oklab,var(--surface)_78%,transparent)] shadow-[0_1px_0_0_rgb(255_255_255_/_0.65)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--surface)_72%,transparent)]">
      <div className={shellClass}>
        <Link
          href="/"
          className="group relative flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <span
            className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-800 text-[0.72rem] font-bold tracking-tight text-white shadow-lg shadow-teal-900/20 ring-1 ring-white/30 transition duration-300 group-hover:shadow-xl group-hover:shadow-teal-800/25"
            aria-hidden
          >
            <span className="absolute inset-0 bg-gradient-to-tr from-white/25 to-transparent opacity-90" />
            <span className="relative">C</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-800">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 hidden text-[0.62rem] font-medium uppercase tracking-[0.16em] text-teal-800/80 sm:block">
              Design tools
            </span>
          </span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 text-[0.8125rem] font-medium sm:gap-x-2"
          aria-label="Main navigation"
        >
          {categories.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className="relative rounded-full px-3 py-1.5 text-zinc-600 transition-[color,background-color] after:absolute after:inset-x-2 after:-bottom-px after:h-px after:rounded-full after:bg-gradient-to-r after:from-teal-500 after:to-emerald-500 after:opacity-0 after:transition-opacity hover:bg-teal-500/[0.08] hover:text-zinc-900 hover:after:opacity-100"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.id}
                className={classNames(
                  "rounded-full px-2 py-1 text-zinc-400",
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
