import type { LandingExample } from "@/data/toolLandingEnhancements";

type ToolCssExampleGalleryProps = {
  examples: LandingExample[];
};

export function ToolCssExampleGallery({ examples }: ToolCssExampleGalleryProps) {
  return (
    <div className="mt-5 grid gap-4 sm:gap-5">
      {examples.map((example) => (
        <article
          key={example.title}
          className="rounded-2xl border border-zinc-200/75 bg-white p-4 shadow-ds-sm sm:p-5"
        >
          <h3 className="text-base font-semibold text-zinc-900">{example.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {example.description}
          </p>
          <div className="mt-4 rounded-xl bg-zinc-50 p-3">
            <div style={example.previewStyle}>{example.previewLabel}</div>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-100">
            <code>{example.css}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}
