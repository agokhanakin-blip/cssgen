import { JsonLd } from "@/components/seo/JsonLd";
import type { ToolSlug } from "@/data/tools";
import { getToolBySlug, toolHref } from "@/data/tools";
import type { ToolSeoContentModel } from "@/data/toolSeoContent";
import {
  absoluteUrl,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  buildToolBreadcrumbItems,
  buildWebPageSchema,
} from "@/lib/seo";

type ToolStructuredDataProps = {
  slug: ToolSlug;
  content?: ToolSeoContentModel;
  toolName?: string;
  toolDescription?: string;
  canonicalUrl?: string;
  faq?: ToolSeoContentModel["faq"];
};

const FAQ_TARGET_MIN = 6;
const FAQ_TARGET_MAX = 7;

function normalizeSeoToolName(name: string): string {
  return name.toLowerCase().includes("css")
    ? `${name} (Free Online Tool)`
    : `CSS ${name} (Free Online Tool)`;
}

function normalizeSeoDescription(name: string, description: string): string {
  const clean = description.trim();
  return `${normalizeSeoToolName(name)} helps developers build modern UI faster with ready-to-use CSS output, practical examples, and copy-ready code snippets. ${clean}`;
}

function defaultFaq(name: string): ToolSeoContentModel["faq"] {
  const lower = name.toLowerCase();
  return [
    {
      question: `How do I use ${lower} output in production projects?`,
      answer:
        "Start from one reusable class, move repeated values into CSS variables, and validate responsive behavior before shipping.",
    },
    {
      question: `Is this ${lower} output compatible with Tailwind or CSS-in-JS?`,
      answer:
        "Yes. You can copy generated values directly into Tailwind arbitrary values, styled components, or regular CSS files.",
    },
    {
      question: `What is the best workflow for teams using a ${lower}?`,
      answer:
        "Use the tool for exploration, save final values as design tokens, and review screenshots in pull requests for consistency.",
    },
    {
      question: `Can I customize generated values for accessibility and performance?`,
      answer:
        "Yes. Adjust contrast, intensity, spacing, and transitions according to your accessibility checks and performance budget.",
    },
    {
      question: `Does this tool generate standards-compliant CSS?`,
      answer:
        "Yes. Output is based on modern CSS syntax supported by current evergreen browsers.",
    },
    {
      question: `When should I avoid overusing generated effects?`,
      answer:
        "Avoid excessive visual intensity on dense pages, and prefer subtle defaults when readability is the main goal.",
    },
  ];
}

function mergeFaq(
  sourceFaq: ToolSeoContentModel["faq"],
  name: string
): ToolSeoContentModel["faq"] {
  if (sourceFaq.length === 0) return sourceFaq;

  const merged = [...sourceFaq, ...defaultFaq(name)];
  const seen = new Set<string>();
  const deduped = merged.filter((item) => {
    const key = item.question.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.slice(0, Math.max(FAQ_TARGET_MIN, Math.min(FAQ_TARGET_MAX, deduped.length)));
}

function buildFeatureList(
  content: ToolSeoContentModel | undefined,
  seoName: string
): string[] {
  const fromHowTo = (content?.howToSteps ?? [])
    .slice(0, 4)
    .map((step) => step.replace(/\.$/, ""));
  const defaults = [
    "Live visual preview with production-ready CSS output",
    "Copy-ready snippets for real frontend workflows",
    `Optimized for queries like css ${seoName.toLowerCase()} examples and how to use css ${seoName.toLowerCase()}`,
  ];

  const merged = [...fromHowTo, ...defaults].filter(Boolean);
  return [...new Set(merged)].slice(0, 7);
}

export function ToolStructuredData({
  slug,
  content,
  toolName,
  toolDescription,
  canonicalUrl,
  faq,
}: ToolStructuredDataProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  const path = toolHref(slug);
  const pageUrl = canonicalUrl ?? absoluteUrl(path);
  const rawName = toolName ?? tool.title;
  const seoName = normalizeSeoToolName(rawName);
  const rawDescription =
    toolDescription ??
    content?.whatIs[0] ??
    "Browser-based design utility with live preview and export.";
  const description = normalizeSeoDescription(rawName, rawDescription);
  const sourceFaq = faq ?? content?.faq ?? [];
  const faqItems = mergeFaq(sourceFaq, rawName);
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  const breadcrumb = buildBreadcrumbListSchema(buildToolBreadcrumbItems(slug), {
    id: breadcrumbId,
  });
  const software = buildSoftwareApplicationSchema({
    slug,
    name: seoName,
    description,
    featureList: buildFeatureList(content, rawName),
  });
  const webpage = buildWebPageSchema({
    path,
    title: seoName,
    description,
    aboutId: `${pageUrl}#software`,
    breadcrumbId,
  });

  const graph: Record<string, unknown>[] = [webpage, software, breadcrumb];
  if (sourceFaq.length > 0 && faqItems.length > 0) {
    graph.push(buildFaqPageSchema({ pageUrl, faq: faqItems }));
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <JsonLd data={data} />;
}
