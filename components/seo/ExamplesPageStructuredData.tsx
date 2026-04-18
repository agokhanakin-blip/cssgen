import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  buildBreadcrumbListSchema,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/lib/seo";

type ExamplesPageStructuredDataProps = {
  path: `/${string}`;
  title: string;
  description: string;
  faq: { question: string; answer: string }[];
  breadcrumbItems: { name: string; href?: string }[];
};

export function ExamplesPageStructuredData({
  path,
  title,
  description,
  faq,
  breadcrumbItems,
}: ExamplesPageStructuredDataProps) {
  const pageUrl = absoluteUrl(path);
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const graph: Record<string, unknown>[] = [
    buildWebPageSchema({
      path,
      title,
      description,
      breadcrumbId,
    }),
    buildBreadcrumbListSchema(breadcrumbItems, { id: breadcrumbId }),
  ];

  if (faq.length > 0) {
    graph.push(buildFaqPageSchema({ pageUrl, faq }));
  }

  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
