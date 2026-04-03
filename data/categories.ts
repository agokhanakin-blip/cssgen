export type CategoryId = "color-tools" | "css-generators" | "ui-effects";

export type CategoryNavItem = {
  id: CategoryId;
  label: string;
  /** `null` = no route this phase (e.g. UI Effects) */
  href: string | null;
  /** One-line pitch for homepage category section */
  pitch: string;
};

export const categories: CategoryNavItem[] = [
  {
    id: "color-tools",
    label: "Color Tools",
    href: "/color-tools",
    pitch: "Generate beautiful color palettes",
  },
  {
    id: "css-generators",
    label: "CSS Generators",
    href: "/css-generators",
    pitch: "Create shadows, gradients and more",
  },
  {
    id: "ui-effects",
    label: "UI Effects",
    href: null,
    pitch: "Polish interfaces with depth and motion",
  },
];

export function categoryHref(id: CategoryId): string | null {
  return categories.find((c) => c.id === id)?.href ?? null;
}
