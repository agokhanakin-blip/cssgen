"use client";

import { useMemo, useState } from "react";

type Direction = "row" | "column";
type Justify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around";
type Align = "stretch" | "flex-start" | "center" | "flex-end";

export function FlexboxGenerator() {
  const [direction, setDirection] = useState<Direction>("row");
  const [justify, setJustify] = useState<Justify>("center");
  const [align, setAlign] = useState<Align>("center");
  const [gap, setGap] = useState(12);
  const [wrap, setWrap] = useState(false);
  const [copied, setCopied] = useState(false);

  const css = useMemo(
    () =>
      `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\ngap: ${gap}px;\nflex-wrap: ${wrap ? "wrap" : "nowrap"};`,
    [direction, justify, align, gap, wrap]
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
              className="h-56 rounded-lg border border-zinc-200 p-3"
              style={{
                display: "flex",
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                gap,
                flexWrap: wrap ? "wrap" : "nowrap",
              }}
            >
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-sm font-medium text-white">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="space-y-3">
          <Select
            label="Direction"
            value={direction}
            onChange={(v) => setDirection(v as Direction)}
            options={["row", "column"]}
          />
          <Select
            label="Justify"
            value={justify}
            onChange={(v) => setJustify(v as Justify)}
            options={["flex-start", "center", "flex-end", "space-between", "space-around"]}
          />
          <Select
            label="Align"
            value={align}
            onChange={(v) => setAlign(v as Align)}
            options={["stretch", "flex-start", "center", "flex-end"]}
          />
          <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Gap</p>
              <p className="text-sm text-zinc-700">{gap}px</p>
            </div>
            <input type="range" min={0} max={48} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-zinc-900" />
          </div>
          <label className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
            <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />
            Enable wrap
          </label>
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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm">
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
