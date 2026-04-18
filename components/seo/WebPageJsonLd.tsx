import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbListSchema,
  buildWebPageSchema,
  type BreadcrumbItem,
} from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/urls";

type WebPageJsonLdProps = {
  path: `/${string}` | "/";
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItem[];
};

/**
 * WebPage JSON-LD for marketing and hub routes (about, contact, categories, etc.).
 */
export function WebPageJsonLd({
  path,
  title,
  description,
  breadcrumbItems,
}: WebPageJsonLdProps) {
  const pageUrl = absoluteUrl(path);
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const resolvedBreadcrumbItems =
    breadcrumbItems ?? (path === "/" ? [] : [{ name: "Home", href: "/" }, { name: title, href: path }]);

  const graph: Record<string, unknown>[] = [
    buildWebPageSchema({
      path,
      title,
      description,
      ...(resolvedBreadcrumbItems.length > 0 ? { breadcrumbId } : {}),
    }),
  ];
  if (resolvedBreadcrumbItems.length > 0) {
    graph.push(
      buildBreadcrumbListSchema(resolvedBreadcrumbItems, {
        id: breadcrumbId,
      })
    );
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <JsonLd data={data} />;
}
