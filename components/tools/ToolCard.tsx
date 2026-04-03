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
        "group relative flex min-h-[5.25rem] flex-col justify-center overflow-hidden rounded-lg border border-zinc-200/90 bg-[var(--surface)] p-5 shadow-ds-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-ds-md hover:-translate-y-0.5 active:translate-y-0",
        "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
        className
      )}
    >
      <span className="text-base font-medium tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-800">
        {title}
      </span>
      <span className="mt-2 text-xs font-medium text-zinc-500 opacity-80 transition-opacity group-hover:opacity-100">
        Open tool →
      </span>
    </Link>
  );
}
