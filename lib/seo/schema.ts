import { categories } from "@/data/categories";
import type { ToolSlug } from "@/data/tools";
import { getToolBySlug, toolHref } from "@/data/tools";
import type { ToolSeoContentModel } from "@/data/toolSeoContent";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo/urls";

export function organizationId(): string {
  return `${getSiteUrl()}/#organization`;
}

export function websiteId(): string {
  return `${getSiteUrl()}/#website`;
}

function getSiteUrl(): string {
  return siteConfig.siteUrl.replace(/\/+$/, "");
}

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

export function buildToolBreadcrumbItems(slug: ToolSlug): BreadcrumbItem[] {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return [
      { name: "Home", href: "/" },
      { name: "Tools", href: "/css-generators" },
    ];
  }

  const category = categories.find((c) => c.id === tool.categoryId);
  const items: BreadcrumbItem[] = [{ name: "Home", href: "/" }];

  if (category?.href) {
    items.push({ name: category.label, href: category.href });
  }

  items.push({ name: tool.title, href: toolHref(slug) });

  return items;
}

export function buildBreadcrumbListSchema(
  items: BreadcrumbItem[],
  options?: { id?: string }
) {
  return {
    "@type": "BreadcrumbList",
    ...(options?.id ? { "@id": options.id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function buildSoftwareApplicationSchema(input: {
  slug: ToolSlug;
  name: string;
  description: string;
  featureList?: string[];
}) {
  const url = absoluteUrl(toolHref(input.slug));
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: input.name,
    description: input.description,
    url,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(input.featureList && input.featureList.length > 0
      ? { featureList: input.featureList }
      : {}),
    isAccessibleForFree: true,
    publisher: { "@id": organizationId() },
  };
}

export function buildFaqPageSchema(input: {
  pageUrl: string;
  faq: ToolSeoContentModel["faq"];
}) {
  return {
    "@type": "FAQPage",
    "@id": `${input.pageUrl}#faq`,
    url: input.pageUrl,
    mainEntity: input.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildWebPageSchema(input: {
  path: string;
  title: string;
  description: string;
  aboutId?: string;
  breadcrumbId?: string;
}) {
  const url = absoluteUrl(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": websiteId() },
    publisher: { "@id": organizationId() },
    inLanguage: "en-US",
    ...(input.aboutId ? { about: { "@id": input.aboutId } } : {}),
    ...(input.breadcrumbId ? { breadcrumb: { "@id": input.breadcrumbId } } : {}),
  };
}
