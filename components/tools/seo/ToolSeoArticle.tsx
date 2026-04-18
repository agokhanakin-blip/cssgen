import Link from "next/link";
import { ToolStructuredData } from "@/components/seo/ToolStructuredData";
import { ToolCodeSnippetList } from "@/components/tools/seo/ToolCodeSnippetList";
import { ToolCssExampleGallery } from "@/components/tools/seo/ToolCssExampleGallery";
import {
  getToolExamplesPath,
  getToolLandingEnhancement,
  pickLandingExamples,
} from "@/data/toolLandingEnhancements";
import type { ToolSeoContentModel } from "@/data/toolSeoContent";
import { getToolBySlug, getRelatedTools, toolHref, type ToolSlug } from "@/data/tools";
import { classNames } from "@/utils/classNames";

const sectionClass = "scroll-mt-20";
const h2Class = "text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl";
const bodyClass =
  "mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";
const orderedListClass =
  "mt-3 list-decimal space-y-2 ps-5 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";
const unorderedListClass =
  "mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";

type ToolSeoArticleProps = {
  content: ToolSeoContentModel;
  className?: string;
  slug?: ToolSlug;
  renderStructuredData?: boolean;
};

function uniqueFaq(
  items: ToolSeoContentModel["faq"]
): ToolSeoContentModel["faq"] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.question.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Rich SEO landing article under each tool. Content is static-rendered for crawlability.
 */
export function ToolSeoArticle({
  content,
  className,
  slug,
  renderStructuredData = true,
}: ToolSeoArticleProps) {
  const enhancement = slug ? getToolLandingEnhancement(slug) : null;
  const examplePagePath = slug ? getToolExamplesPath(slug) : null;
  const related = slug ? getRelatedTools(slug).slice(0, 3) : [];
  const toolTitle = slug ? getToolBySlug(slug)?.title ?? "this tool" : "this tool";
  const mergedFaq = uniqueFaq(
    enhancement
      ? [...content.faq, ...enhancement.extraFaq]
      : content.faq
  ).slice(0, 6);

  return (
    <>
      {slug && renderStructuredData ? (
        <ToolStructuredData slug={slug} content={{ ...content, faq: mergedFaq }} />
      ) : null}
      <article
        className={classNames(
          "mt-14 max-w-4xl space-y-12 border-t border-zinc-200/80 pt-12 sm:mt-16 sm:space-y-14 sm:pt-14",
          className
        )}
        aria-label="About this tool"
      >
        <section className={sectionClass} aria-labelledby="tool-seo-explore-more">
          <h2 id="tool-seo-explore-more" className={h2Class}>
            Explore more
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
            Once you finish tweaking the tool, jump to examples, FAQ, or related generators.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="#tool-seo-css-examples"
              className="rounded-full border border-zinc-200 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              View examples
            </Link>
            <Link
              href="#tool-seo-faq"
              className="rounded-full border border-zinc-200 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Open FAQ
            </Link>
            <Link
              href="#related-tools-section"
              className="rounded-full border border-zinc-200 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Related tools
            </Link>
            {examplePagePath ? (
              <Link
                href={examplePagePath}
                className="rounded-full border border-zinc-200 bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                View all examples
              </Link>
            ) : null}
          </div>
        </section>

        {enhancement ? (
          <section className={sectionClass} aria-labelledby="tool-seo-intent">
            <h2 id="tool-seo-intent" className={h2Class}>
              How to use CSS {toolTitle} in real projects
            </h2>
            <div className={bodyClass}>
              {enhancement.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        <section className={sectionClass} aria-labelledby="tool-seo-what">
          <h2 id="tool-seo-what" className={h2Class}>
            {content.whatIsTitle ?? `What is ${toolTitle}?`}
          </h2>
          <div className={bodyClass}>
            {content.whatIs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-how">
          <h2 id="tool-seo-how" className={h2Class}>
            How to use {toolTitle}
          </h2>
          <ol className={orderedListClass}>
            {content.howToSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-css-examples">
          <h2 id="tool-seo-css-examples" className={h2Class}>
            CSS Examples
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
            These are crawlable css {toolTitle.toLowerCase()} examples. Start with a preset,
            copy the code, and adapt spacing, color, and timing values to your design tokens.
          </p>
          {enhancement ? (
            <ToolCssExampleGallery examples={pickLandingExamples(enhancement.examples)} />
          ) : (
            <p className="mt-4 text-sm text-zinc-500">Examples are not available for this tool yet.</p>
          )}
          {examplePagePath ? (
            <p className="mt-4">
              <Link
                href={examplePagePath}
                className="text-sm font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
              >
                View all examples → {examplePagePath}
              </Link>
            </p>
          ) : null}
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-ready-code">
          <h2 id="tool-seo-ready-code" className={h2Class}>
            Ready to Use Code Snippets
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
            Paste these snippets directly into your project to speed up implementation and maintain a
            modern css {toolTitle.toLowerCase()} design workflow.
          </p>
          {enhancement ? <ToolCodeSnippetList snippets={enhancement.snippets} /> : null}
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-use-cases">
          <h2 id="tool-seo-use-cases" className={h2Class}>
            Best Use Cases
          </h2>
          <ul className={unorderedListClass}>
            {(enhancement?.useCases ?? []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-mistakes">
          <h2 id="tool-seo-mistakes" className={h2Class}>
            Common Mistakes
          </h2>
          <ul className={unorderedListClass}>
            {(enhancement?.commonMistakes ?? []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-pro-tips">
          <h2 id="tool-seo-pro-tips" className={h2Class}>
            Pro Tips
          </h2>
          <ul className={unorderedListClass}>
            {[...content.tips, ...(enhancement?.proTips ?? [])].map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-faq">
          <h2 id="tool-seo-faq" className={h2Class}>
            FAQ
          </h2>
          <dl className="mt-6 space-y-4">
            {mergedFaq.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200/65 bg-gradient-to-b from-white to-[var(--surface-soft)] px-4 py-4 shadow-ds-sm ring-1 ring-inset ring-white/60 sm:px-5 sm:py-5"
              >
                <dt className="text-base font-semibold text-zinc-900">{item.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-related-links">
          <h2 id="tool-seo-related-links" className={h2Class}>
            Related Tools
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
            Improve implementation speed by combining this workflow with nearby generators.
          </p>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-zinc-700 sm:text-base sm:leading-relaxed">
            {(enhancement?.contextualLinks ?? related.map((t) => ({ label: t.title, href: toolHref(t.slug) }))).map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>

        <section className={sectionClass} aria-labelledby="tool-seo-example-usage">
          <h2 id="tool-seo-example-usage" className={h2Class}>
            Example usage
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
            {content.exampleUsage}
          </p>
        </section>
      </article>
    </>
  );
}