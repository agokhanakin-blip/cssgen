import type { CategoryId } from "./categories";

export type ToolSlug =
  | "gradient-generator"
  | "box-shadow-generator"
  | "border-radius-generator"
  | "color-palette-generator"
  | "text-shadow-generator"
  | "clamp-generator"
  | "transition-generator"
  | "transform-generator"
  | "color-converter"
  | "image-resizer-rounder"
  | "css-unit-converter"
  | "meta-tag-generator"
  | "robots-txt-generator"
  | "base64-image-converter"
  | "filter-generator"
  | "flexbox-generator"
  | "grid-template-generator"
  | "aspect-ratio-generator"
  | "image-crop-tool"
  | "svg-generator"
  | "favicon-generator"
  | "logo-generator";

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
    categoryId: "ui-effects",
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
  {
    slug: "text-shadow-generator",
    title: "Text Shadow Generator",
    categoryId: "ui-effects",
  },
  {
    slug: "clamp-generator",
    title: "Clamp Generator",
    categoryId: "css-generators",
  },
  {
    slug: "transition-generator",
    title: "Transition Generator",
    categoryId: "ui-effects",
  },
  {
    slug: "transform-generator",
    title: "Transform Generator",
    categoryId: "ui-effects",
  },
  {
    slug: "color-converter",
    title: "Color Converter",
    categoryId: "color-tools",
  },
  {
    slug: "image-resizer-rounder",
    title: "Image Resizer & Round Corners",
    categoryId: "css-generators",
  },
  {
    slug: "css-unit-converter",
    title: "CSS Unit Converter",
    categoryId: "css-generators",
  },
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Generator",
    categoryId: "css-generators",
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Generator",
    categoryId: "css-generators",
  },
  {
    slug: "base64-image-converter",
    title: "Base64 Image Converter",
    categoryId: "css-generators",
  },
  {
    slug: "filter-generator",
    title: "Filter Generator",
    categoryId: "ui-effects",
  },
  {
    slug: "flexbox-generator",
    title: "Flexbox Generator",
    categoryId: "css-generators",
  },
  {
    slug: "grid-template-generator",
    title: "Grid Template Generator",
    categoryId: "css-generators",
  },
  {
    slug: "aspect-ratio-generator",
    title: "Aspect Ratio Generator",
    categoryId: "css-generators",
  },
  {
    slug: "image-crop-tool",
    title: "Image Crop Tool",
    categoryId: "css-generators",
  },
  {
    slug: "svg-generator",
    title: "SVG Generator",
    categoryId: "css-generators",
  },
  {
    slug: "favicon-generator",
    title: "Favicon Generator",
    categoryId: "css-generators",
  },
  {
    slug: "logo-generator",
    title: "Logo Generator",
    categoryId: "css-generators",
  },
];
