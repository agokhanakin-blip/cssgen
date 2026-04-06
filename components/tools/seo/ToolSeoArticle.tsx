import type { ToolSeoContentModel } from "@/data/toolSeoContent";
import { classNames } from "@/utils/classNames";

const sectionClass = "scroll-mt-20";
const h2Class =
  "text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl";
const bodyClass =
  "mt-3 space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";
const listClass =
  "mt-3 list-decimal space-y-2 ps-5 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";
const tipsListClass =
  "mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed";

type ToolSeoArticleProps = {
  content: ToolSeoContentModel;
  className?: string;
};

/**
 * SEO-oriented prose blocks below the interactive tool UI.
 */
export function ToolSeoArticle({ content, className }: ToolSeoArticleProps) {
  return (
    <article
      className={classNames(
        "mt-14 max-w-3xl space-y-12 border-t border-zinc-200/80 pt-12 sm:mt-16 sm:space-y-14 sm:pt-14",
        className
      )}
      aria-label="About this tool"
    >
      <section className={sectionClass} aria-labelledby="tool-seo-what">
        <h2 id="tool-seo-what" className={h2Class}>
          {content.whatIsTitle ?? "What is this tool?"}
        </h2>
        <div className={bodyClass}>
          {content.whatIs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="tool-seo-how">
        <h2 id="tool-seo-how" className={h2Class}>
          How to use
        </h2>
        <ol className={listClass}>
          {content.howToSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className={sectionClass} aria-labelledby="tool-seo-example">
        <h2 id="tool-seo-example" className={h2Class}>
          Example usage
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
          {content.exampleUsage}
        </p>
      </section>

      <section className={sectionClass} aria-labelledby="tool-seo-tips">
        <h2 id="tool-seo-tips" className={h2Class}>
          Tips
        </h2>
        <ul className={tipsListClass}>
          {content.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className={sectionClass} aria-labelledby="tool-seo-faq">
        <h2 id="tool-seo-faq" className={h2Class}>
          FAQ
        </h2>
        <dl className="mt-6 space-y-4">
          {content.faq.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200/65 bg-gradient-to-b from-white to-[var(--surface-soft)] px-4 py-4 shadow-ds-sm ring-1 ring-inset ring-white/60 sm:px-5 sm:py-5"
            >
              <dt className="text-base font-semibold text-zinc-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base sm:leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}