import Link from "next/link";
import { classNames } from "@/utils/classNames";

type ToolCardProps = {
  title: string;
  href: string;
  className?: string;
};

export function ToolCard({ title, href, className }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={classNames(
        "group relative flex min-h-[5.75rem] flex-col justify-center overflow-hidden rounded-2xl border border-zinc-200/65 bg-gradient-to-b from-white via-[var(--surface-soft)] to-[color-mix(in_oklab,var(--surface)_96%,#f4f4f5)] p-5 shadow-ds-sm ring-1 ring-inset ring-white/70 transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-teal-300/55 hover:shadow-ds-float hover:shadow-ds-glow",
        "outline-none focus-visible:ring-2 focus-visible:ring-teal-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/85 via-transparent to-teal-500/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden
      />
      <span className="relative text-base font-semibold tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-teal-950">
        {title}
      </span>
      <span className="relative mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.06em] text-teal-700/90 transition-all duration-300 group-hover:tracking-[0.08em]">
        Open tool
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
