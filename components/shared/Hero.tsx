import type { ReactNode } from "react";
import { classNames } from "@/utils/classNames";

type HeroProps = {
  title: string;
  subtitle?: ReactNode;
  /** Primary + secondary actions (e.g. CTA links) */
  actions?: ReactNode;
  className?: string;
};

/** Breaks out of `PageContainer` so the hero spans the full viewport width. */
export function Hero({ title, subtitle, actions, className }: HeroProps) {
  return (
    <section
      className={classNames(
        "relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2 overflow-x-clip overflow-y-visible",
        "mb-16 sm:mb-20 lg:mb-24",
        className
      )}
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38] [background-image:linear-gradient(to_right,rgb(24_24_27_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_27_/_0.05)_1px,transparent_1px)] [background-size:min(100%,56px)_56px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_20%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-teal-400/30 via-emerald-300/15 to-transparent blur-3xl sm:h-[28rem] sm:w-[28rem] [animation:drift_18s_ease-in-out_infinite_alternate]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-amber-400/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 pt-1 sm:px-6 sm:pb-6 lg:px-10 lg:pb-8">
        <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-teal-500/45 via-emerald-400/35 to-amber-400/30 p-px shadow-md shadow-teal-900/5">
          <p className="flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--surface)_94%,transparent)] px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal-900 shadow-inner shadow-white/40 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-400/60 opacity-40" />
              <span className="relative size-2 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 ring-2 ring-white/80" />
            </span>
            Design utilities · in-browser
          </p>
        </div>
        <h1
          id="hero-heading"
          className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:max-w-none sm:text-5xl sm:leading-[1.06] lg:text-[2.95rem] lg:leading-[1.05]"
        >
          {title}
        </h1>
        {subtitle ? (
          <div className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-600 sm:mt-7 sm:text-xl sm:leading-relaxed">
            {subtitle}
          </div>
        ) : null}
        {actions ? (
          <div className="mt-10 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
