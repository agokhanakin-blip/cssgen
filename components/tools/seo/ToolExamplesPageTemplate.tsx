import Link from "next/link";
import type { LandingExample } from "@/data/toolLandingEnhancements";
import { ToolCssExampleGallery } from "@/components/tools/seo/ToolCssExampleGallery";

type ToolExamplesPageTemplateProps = {
  title: string;
  intro: string;
  examples: LandingExample[];
  generatorHref: string;
  generatorLabel: string;
  otherExampleLinks: { href: string; label: string }[];
};

export function ToolExamplesPageTemplate({
  title,
  intro,
  examples,
  generatorHref,
  generatorLabel,
  otherExampleLinks,
}: ToolExamplesPageTemplateProps) {
  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
          {intro}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href={generatorHref}
            className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
          >
            Back to generator → {generatorLabel}
          </Link>
        </div>
      </header>

      <section aria-labelledby="example-list">
        <h2 id="example-list" className="text-xl font-semibold text-zinc-900">
          Example collection
        </h2>
        <ToolCssExampleGallery examples={examples} />
      </section>

      <section aria-labelledby="other-examples">
        <h2 id="other-examples" className="text-xl font-semibold text-zinc-900">
          View other examples
        </h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-sm text-zinc-700 sm:text-base">
          {otherExampleLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
