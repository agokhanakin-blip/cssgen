import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
  /** Optional kicker above H1 (e.g. category tools). */
  eyebrow?: string;
};

/**
 * Internal page H1 + optional lead (for later copy).
 */
export function PageHeader({
  title,
  description,
  className,
  eyebrow,
}: PageHeaderProps) {
  return (
    <header className={classNames("mb-11 sm:mb-14", className)}>
      <div className="relative inline-block max-w-4xl">
        {eyebrow ? (
          <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-teal-800/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="relative pb-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.125rem] sm:leading-tight lg:text-[2.35rem]">
          <span className="relative z-10">{title}</span>
          <span
            className="absolute bottom-0 left-0 h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600/80 shadow-sm shadow-teal-500/30 sm:w-20"
            aria-hidden
          />
        </h1>
      </div>
      {description ? (
        <div className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:mt-7 sm:text-[1.05rem]">
          {description}
        </div>
      ) : null}
    </header>
  );
}
