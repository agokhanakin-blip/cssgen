import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

const variants = {
  primary:
    "border-zinc-900 bg-zinc-900 text-white shadow-ds-sm hover:border-zinc-800 hover:bg-zinc-800 hover:shadow-ds-md",
  secondary:
    "border-zinc-200/90 bg-[var(--surface)] text-zinc-800 shadow-ds-sm hover:border-zinc-300 hover:bg-zinc-50/90 hover:shadow-ds-md",
};

/**
 * Pill link — hero CTAs, category entry points.
 */
export function LinkButton({
  children,
  className,
  variant = "secondary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={classNames(
        "inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-[border-color,box-shadow,background-color,color,transform] hover:-translate-y-px active:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
