import { categories } from "@/data/categories";
import { siteConfig } from "@/lib/site";
import { TextLink } from "@/components/shared/TextLink";
import { classNames } from "@/utils/classNames";

const shellClass = "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/90 bg-[var(--surface)]">
      <div className={shellClass}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-800">{siteConfig.name}</p>
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
          </div>
          <div className="flex flex-col items-start gap-8 sm:items-end">
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end"
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
            <nav
              className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end"
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
    </footer>
  );
}
