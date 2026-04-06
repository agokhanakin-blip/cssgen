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
    "border-transparent bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-800 text-white shadow-lg shadow-teal-900/25 ring-1 ring-white/25 [box-shadow:inset_0_1px_0_0_rgb(255_255_255_/_0.22)] hover:from-teal-400 hover:via-teal-500 hover:to-emerald-700 hover:shadow-xl hover:shadow-teal-900/30",
  secondary:
    "border-zinc-200/70 bg-[color-mix(in_oklab,var(--surface)_96%,transparent)] text-zinc-800 shadow-ds-sm ring-1 ring-inset ring-white/60 backdrop-blur-sm hover:border-teal-200/80 hover:bg-teal-50/50 hover:shadow-ds-md",
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
        "inline-flex min-h-12 items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold tracking-tight transition-[border-color,box-shadow,background-color,color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0.5",
        "outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
