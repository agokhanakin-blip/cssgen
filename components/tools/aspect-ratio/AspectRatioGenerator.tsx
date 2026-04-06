"use client";

import { useMemo, useState } from "react";

export function AspectRatioGenerator() {
  const [w, setW] = useState(16);
  const [h, setH] = useState(9);
  const [copied, setCopied] = useState(false);

  const ratio = useMemo(() => `${w} / ${h}`, [w, h]);
  const padding = useMemo(() => `${((h / w) * 100).toFixed(4)}%`, [w, h]);
  const css = `aspect-ratio: ${ratio};\n/* fallback */\npadding-top: ${padding};`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview</p>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
            <div
              style={{ aspectRatio: ratio }}
              className="w-full rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
            />
          </div>
        </section>
        <section className="space-y-3">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Width unit</span>
            <input type="number" min={1} value={w} onChange={(e) => setW(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm" />
          </label>
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Height unit</span>
            <input type="number" min={1} value={h} onChange={(e) => setH(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm" />
          </label>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
            <p><strong>Ratio:</strong> {ratio}</p>
            <p><strong>Padding fallback:</strong> {padding}</p>
          </div>
        </section>
      </div>
      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">CSS Output</p>
          <button onClick={copy} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">{copied ? "Copied!" : "Copy CSS"}</button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-sm text-zinc-100"><code>{css}</code></pre>
      </section>
    </div>
  );
}
