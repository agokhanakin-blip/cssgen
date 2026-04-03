import type { CategoryId } from "./categories";

export type ToolSlug =
  | "gradient-generator"
  | "box-shadow-generator"
  | "border-radius-generator"
  | "color-palette-generator";

export type Tool = {
  slug: ToolSlug;
  title: string;
  categoryId: CategoryId;
};

export function toolHref(slug: ToolSlug): string {
  return `/tools/${slug}`;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId: CategoryId): Tool[] {
  return tools.filter((t) => t.categoryId === categoryId);
}

export function getRelatedTools(slug: ToolSlug): Tool[] {
  const current = tools.find((t) => t.slug === slug);
  if (!current) return [];
  return tools.filter(
    (t) => t.categoryId === current.categoryId && t.slug !== slug
  );
}

export const tools: Tool[] = [
  {
    slug: "gradient-generator",
    title: "Gradient Generator",
    categoryId: "css-generators",
  },
  {
    slug: "box-shadow-generator",
    title: "Box Shadow Generator",
    categoryId: "css-generators",
  },
  {
    slug: "border-radius-generator",
    title: "Border Radius Generator",
    categoryId: "css-generators",
  },
  {
    slug: "color-palette-generator",
    title: "Color Palette Generator",
    categoryId: "color-tools",
  },
];
