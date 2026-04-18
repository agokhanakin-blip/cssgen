import type { LandingSnippet } from "@/data/toolLandingEnhancements";

type ToolCodeSnippetListProps = {
  snippets: LandingSnippet[];
};

export function ToolCodeSnippetList({ snippets }: ToolCodeSnippetListProps) {
  return (
    <div className="mt-5 grid gap-4 sm:gap-5">
      {snippets.map((snippet) => (
        <article
          key={snippet.title}
          className="rounded-2xl border border-zinc-200/75 bg-white p-4 shadow-ds-sm sm:p-5"
        >
          <h3 className="text-base font-semibold text-zinc-900">{snippet.title}</h3>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-100">
            <code>{snippet.code}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}
