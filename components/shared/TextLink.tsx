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
        "rounded-sm text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        variant === "default" &&
          "text-zinc-600 underline decoration-zinc-300/70 underline-offset-4 hover:text-zinc-900 hover:decoration-zinc-400",
        variant === "subtle" &&
          "text-zinc-500 hover:text-zinc-800",
        className
      )}
      {...props}
    />
  );
}
