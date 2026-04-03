import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type HeroProps = {
  title: string;
  subtitle?: ReactNode;
  /** Primary + secondary actions (e.g. CTA links) */
  actions?: ReactNode;
  className?: string;
};

export function Hero({ title, subtitle, actions, className }: HeroProps) {
  return (
    <section
      className={classNames("mb-14 sm:mb-16 lg:mb-20", className)}
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        className="max-w-4xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl sm:leading-tight lg:text-[2.5rem] lg:leading-[1.15]"
      >
        {title}
      </h1>
      {subtitle ? (
        <div className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-6 sm:text-lg">
          {subtitle}
        </div>
      ) : null}
      {actions ? (
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {actions}
        </div>
      ) : null}
    </section>
  );
}
