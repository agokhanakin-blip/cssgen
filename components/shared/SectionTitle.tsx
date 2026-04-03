import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type SectionTitleProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Uppercase section label (e.g. Tools, Categories).
 */
export function SectionTitle({ children, id, className }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={classNames(
        "text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs",
        className
      )}
    >
      {children}
    </h2>
  );
}
