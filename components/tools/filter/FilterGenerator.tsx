"use client";

import { useMemo, useState } from "react";

type State = {
  blur: number;
  brightness: number;
  contrast: number;
  saturate: number;
  hue: number;
};

const defaults: State = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hue: 0,
};

export function FilterGenerator() {
  const [state, setState] = useState<State>(defaults);
  const [copied, setCopied] = useState(false);

  const value = useMemo(
    () =>
      `blur(${state.blur}px) brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturate}%) hue-rotate(${state.hue}deg)`,
    [state]
  );
  const css = `filter: ${value};`;

  const copy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const reset = () => setState(defaults);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-6 shadow-ds-sm">
            <div
              style={{ filter: value }}
              className="mx-auto h-40 w-40 rounded-xl bg-gradient-to-br from-indigo-500 via-pink-500 to-amber-400"
            />
          </div>
        </section>
        <section className="space-y-3">
          <Range label="Blur" value={state.blur} min={0} max={20} suffix="px" onChange={(v) => setState((s) => ({ ...s, blur: v }))} />
          <Range label="Brightness" value={state.brightness} min={0} max={200} suffix="%" onChange={(v) => setState((s) => ({ ...s, brightness: v }))} />
          <Range label="Contrast" value={state.contrast} min={0} max={200} suffix="%" onChange={(v) => setState((s) => ({ ...s, contrast: v }))} />
          <Range label="Saturate" value={state.saturate} min={0} max={300} suffix="%" onChange={(v) => setState((s) => ({ ...s, saturate: v }))} />
          <Range label="Hue rotate" value={state.hue} min={0} max={360} suffix="deg" onChange={(v) => setState((s) => ({ ...s, hue: v }))} />
          <button onClick={reset} className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">Reset</button>
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

function Range({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</p>
        <p className="text-sm text-zinc-700">{value}{suffix}</p>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-zinc-900" />
    </div>
  );
}
