const items = [
  "Fast and easy to use",
  "No signup required",
  "Copy-ready CSS code",
] as const;

/**
 * Trust / value bullets for the homepage.
 */
export function ValueProposition() {
  return (
    <section
      className="border-t border-zinc-200/90 pt-14 sm:pt-16"
      aria-labelledby="value-proposition-heading"
    >
      <h2
        id="value-proposition-heading"
        className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
      >
        Why Use Our CSS Tools?
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {items.map((text) => (
          <li
            key={text}
            className="rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-5 py-4 text-sm leading-relaxed text-zinc-700 shadow-ds-sm sm:py-5"
          >
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
