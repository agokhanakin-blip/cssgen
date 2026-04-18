import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type ToolPrimarySurfaceProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Premium but lightweight shell around the interactive tool UI.
 * Keeps tool controls visually prioritized without heavy effects.
 */
export function ToolPrimarySurface({ children, className }: ToolPrimarySurfaceProps) {
  return (
    <section
      className={classNames(
        "tool-surface mx-auto mb-14 w-full max-w-5xl rounded-2xl border border-zinc-200/85 bg-white p-4 shadow-ds-md ring-1 ring-inset ring-white/70 transition-shadow duration-200 sm:rounded-[1.15rem] sm:p-6 lg:p-7",
        className
      )}
      aria-label="Tool interface"
    >
      {children}
    </section>
  );
}
