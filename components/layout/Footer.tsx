import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";
import { TextLink } from "@/components/shared/TextLink";
import { classNames } from "@/utils/classNames";

const shellClass = "relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-zinc-200/60 bg-gradient-to-b from-[color-mix(in_oklab,var(--surface)_82%,var(--background))] via-[var(--background)] to-[color-mix(in_oklab,var(--accent)_3%,var(--background))]">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/35 to-transparent"
        aria-hidden
      />
      <div className={shellClass}>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 to-emerald-800 text-[0.72rem] font-bold text-white shadow-md ring-1 ring-white/25"
                aria-hidden
              >
                <span className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                <span className="relative">C</span>
              </span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {siteConfig.name}
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-teal-800/75">
                  Crafted for builders
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600">
              Precision utilities for gradients, shadows, layout, color, and
              export-ready assets — fast, focused, and tuned for real UI work.
            </p>
            <p className="text-xs font-medium text-zinc-400">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:flex lg:gap-16">
            <div className="space-y-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Explore
              </p>
              <nav
                className="flex flex-col gap-2.5"
                aria-label="Footer navigation"
              >
                {categories.map((c) =>
                  c.href ? (
                    <TextLink key={c.id} href={c.href} variant="default">
                      {c.label}
                    </TextLink>
                  ) : (
                    <span
                      key={c.id}
                      className={classNames(
                        "text-sm text-zinc-400",
                        "select-none"
                      )}
                    >
                      {c.label}
                    </span>
                  )
                )}
              </nav>
            </div>
            <div className="space-y-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Company
              </p>
              <nav
                className="flex flex-col gap-2.5"
                aria-label="Site pages"
              >
                <TextLink href="/about" variant="default">
                  About
                </TextLink>
                <TextLink href="/contact" variant="default">
                  Contact
                </TextLink>
                <TextLink href="/privacy-policy" variant="default">
                  Privacy Policy
                </TextLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
