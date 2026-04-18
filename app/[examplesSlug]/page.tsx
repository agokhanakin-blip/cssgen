import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExamplesPageStructuredData } from "@/components/seo/ExamplesPageStructuredData";
import { ToolExamplesPageTemplate } from "@/components/tools/seo/ToolExamplesPageTemplate";
import {
  getAllToolExamplesSlugs,
  getExpandedToolExamples,
  getToolExamplesPath,
  getToolLandingEnhancement,
  getToolSlugFromExamplesSlug,
} from "@/data/toolLandingEnhancements";
import { getToolBySlug, toolHref, tools } from "@/data/tools";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ examplesSlug: string }>;
};

export function generateStaticParams() {
  return getAllToolExamplesSlugs().map((examplesSlug) => ({ examplesSlug }));
}

function buildExamplesTitle(toolTitle: string): string {
  return `CSS ${toolTitle.replace(/\s*Generator$/i, "")} Examples`;
}

function buildExamplesDescription(toolTitle: string): string {
  return `Explore 20+ ${toolTitle.toLowerCase()} examples with visual previews, copy-ready CSS snippets, and practical implementation notes for real frontend projects.`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { examplesSlug } = await params;
  const toolSlug = getToolSlugFromExamplesSlug(examplesSlug);
  if (!toolSlug) {
    return {
      title: "Examples not found",
      robots: { index: false, follow: false, googleBot: { index: false } },
    };
  }
  const tool = getToolBySlug(toolSlug);
  if (!tool) {
    return {
      title: "Examples not found",
      robots: { index: false, follow: false, googleBot: { index: false } },
    };
  }
  const path = getToolExamplesPath(toolSlug);
  return buildPageMetadata({
    path,
    title: buildExamplesTitle(tool.title),
    description: buildExamplesDescription(tool.title),
  });
}

export default async function ToolExamplesPage({ params }: PageProps) {
  const { examplesSlug } = await params;
  const toolSlug = getToolSlugFromExamplesSlug(examplesSlug);
  if (!toolSlug) notFound();

  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();

  const title = buildExamplesTitle(tool.title);
  const description = buildExamplesDescription(tool.title);
  const path = getToolExamplesPath(toolSlug);
  const examples = getExpandedToolExamples(toolSlug, 20);
  const enhancement = getToolLandingEnhancement(toolSlug);
  const otherExampleLinks = tools
    .filter((t) => t.slug !== toolSlug)
    .slice(0, 8)
    .map((t) => ({
      href: getToolExamplesPath(t.slug),
      label: `CSS ${t.title.replace(/\s*Generator$/i, "")} Examples`,
    }));

  const faq = [
    {
      question: `How do I use ${tool.title.toLowerCase()} examples in production code?`,
      answer:
        "Start by copying one snippet into a reusable class, then map colors and spacing to your design tokens before release.",
    },
    {
      question: "Are these examples static and crawlable?",
      answer:
        "Yes. The examples are server-rendered HTML blocks so they are visible in source and crawlable by search engines.",
    },
    {
      question: "Can I use these examples with Tailwind or CSS-in-JS?",
      answer:
        "Yes. You can transfer generated values into Tailwind arbitrary syntax, styled components, or plain CSS modules.",
    },
    {
      question: "How many examples should I test before picking a final style?",
      answer:
        "Review at least 3-4 variants in real UI context, then choose the one with best readability and visual hierarchy.",
    },
    {
      question: "Do these examples impact performance?",
      answer:
        "These pages are optimized for lightweight markup. Always validate heavy visual effects on slower devices before production.",
    },
    {
      question: "Where can I edit values interactively?",
      answer: `Use the generator page (${tool.title}) for interactive tuning, then return here for more variants.`,
    },
  ];

  return (
    <>
      <ExamplesPageStructuredData
        path={path}
        title={title}
        description={description}
        faq={faq}
        breadcrumbItems={[
          { name: "Home", href: "/" },
          { name: tool.title, href: toolHref(toolSlug) },
          { name: title, href: path },
        ]}
      />
      <ToolExamplesPageTemplate
        title={title}
        intro={`${description} Use this page to discover basic, practical, and advanced examples, then jump back to the generator for custom tuning.`}
        examples={examples}
        generatorHref={toolHref(toolSlug)}
        generatorLabel={tool.title}
        otherExampleLinks={otherExampleLinks}
      />
    </>
  );
}
