"use client";

import { useMemo, useState } from "react";

export function GridTemplateGenerator() {
  const [columns, setColumns] = useState("1fr 1fr 1fr");
  const [rows, setRows] = useState("auto auto");
  const [gap, setGap] = useState(16);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () =>
      `display: grid;\ngrid-template-columns: ${columns};\ngrid-template-rows: ${rows};\ngap: ${gap}px;`,
    [columns, rows, gap]
  );

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
              className="rounded-lg border border-zinc-200 p-3"
              style={{ display: "grid", gridTemplateColumns: columns, gridTemplateRows: rows, gap }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex h-16 items-center justify-center rounded-md bg-indigo-500 text-sm font-medium text-white">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="space-y-3">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Columns</span>
            <input value={columns} onChange={(e) => setColumns(e.target.value)} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm font-mono" />
          </label>
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">Rows</span>
            <input value={rows} onChange={(e) => setRows(e.target.value)} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm font-mono" />
          </label>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gap</p>
              <p className="text-sm text-zinc-700">{gap}px</p>
            </div>
            <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-zinc-900" />
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
