import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  className?: string;
};

/**
 * Internal page H1 + optional lead (for later copy).
 */
export function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header className={classNames("mb-10 sm:mb-12", className)}>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl lg:text-[2rem] lg:leading-tight">
        {title}
      </h1>
      {description ? (
        <div className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-4">
          {description}
        </div>
      ) : null}
    </header>
  );
}
