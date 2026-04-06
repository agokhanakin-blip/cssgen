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
        "relative z-10 mx-auto w-full max-w-6xl px-4 py-11 sm:px-6 sm:py-16 lg:px-10 lg:py-[4.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
}
