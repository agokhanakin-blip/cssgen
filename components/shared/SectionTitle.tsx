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
        "flex flex-wrap items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-teal-900 sm:text-xs",
        className
      )}
    >
      <span
        className="relative h-px w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-transparent sm:w-12"
        aria-hidden
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80" />
      </span>
      {children}
    </h2>
  );
}
