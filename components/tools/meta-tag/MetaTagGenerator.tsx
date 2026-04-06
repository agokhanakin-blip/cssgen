"use client";

import { useState } from "react";

export function MetaTagGenerator() {
  const [title, setTitle] = useState("Free CSS Generators for Modern UI Design");
  const [description, setDescription] = useState(
    "Create gradients, shadows, border radius, and color palettes with free online tools."
  );
  const [url, setUrl] = useState("https://example.com/tools/gradient-generator");
  const [copied, setCopied] = useState(false);

  const output = `<title>${title}</title>
<meta name="description" content="${description}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />`;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        <Field label="Title" value={title} onChange={setTitle} />
        <Field label="Description" value={description} onChange={setDescription} textarea />
        <Field label="Canonical URL" value={url} onChange={setUrl} />
      </div>

      <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Search preview
        </p>
        <p className="truncate text-lg text-blue-700">{title}</p>
        <p className="truncate text-sm text-emerald-700">{url}</p>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </section>

      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">HTML Output</p>
          <button onClick={copy} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-sm text-zinc-100">
          <code>{output}</code>
        </pre>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
        />
      )}
    </label>
  );
}
