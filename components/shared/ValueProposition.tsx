const items = [
  { n: "01", text: "Fast and easy to use" },
  { n: "02", text: "No signup required" },
  { n: "03", text: "Copy-ready CSS code" },
] as const;

/**
 * Trust / value bullets for the homepage.
 */
export function ValueProposition() {
  return (
    <section
      className="border-t border-zinc-200/70 pt-16 sm:pt-20"
      aria-labelledby="value-proposition-heading"
    >
      <h2
        id="value-proposition-heading"
        className="max-w-xl text-balance text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
      >
        Why Use Our CSS Tools?
      </h2>
      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
        Polished defaults, live preview, and copy-ready output you can ship
        with confidence.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
        {items.map(({ n, text }) => (
          <li
            key={n}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200/65 bg-gradient-to-b from-white to-[color-mix(in_oklab,var(--surface-soft)_88%,#f4f4f5)] p-5 shadow-ds-sm ring-1 ring-inset ring-white/70 transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-ds-md sm:p-6"
          >
            <div className="mb-4 flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/12 to-emerald-600/10 text-xs font-bold tabular-nums text-teal-900 ring-1 ring-teal-600/15 transition-colors group-hover:from-teal-500/18 group-hover:to-emerald-600/14">
                {n}
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-zinc-800">
              {text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
