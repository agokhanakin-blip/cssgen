import Link from "next/link";
import type { ComponentProps } from "react";
import { classNames } from "@/utils/classNames";

export type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: "default" | "subtle";
};

/**
 * Inline text link — footer, meta navigation.
 */
export function TextLink({
  className,
  variant = "default",
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={classNames(
        "rounded-sm text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-teal-600/45 focus-visible:ring-offset-2",
        variant === "default" &&
          "text-zinc-600 underline decoration-zinc-300/80 underline-offset-[5px] hover:text-teal-800 hover:decoration-teal-400/90",
        variant === "subtle" &&
          "text-zinc-500 hover:text-teal-900",
        className
      )}
      {...props}
    />
  );
}
