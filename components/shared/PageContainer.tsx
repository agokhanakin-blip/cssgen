import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Max width + horizontal rhythm aligned with header/footer. */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={classNames(
        "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
