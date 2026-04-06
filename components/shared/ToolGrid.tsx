import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type ToolGridProps = {
  children: ReactNode;
  className?: string;
};

const gridClass =
  "grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7";

/**
 * Shared responsive grid for tool cards.
 */
export function ToolGrid({ children, className }: ToolGridProps) {
  return <ul className={classNames(gridClass, className)}>{children}</ul>;
}
