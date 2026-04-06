"use client";

import { useMemo, useState } from "react";

type ClampState = {
  minSize: number;
  maxSize: number;
  minViewport: number;
  maxViewport: number;
};

const defaults: ClampState = {
  minSize: 16,
  maxSize: 42,
  minViewport: 320,
  maxViewport: 1280,
};

function buildClamp(state: ClampState): string {
  const slope =
    ((state.maxSize - state.minSize) / (state.maxViewport - state.minViewport)) *
    100;
  const intercept = state.minSize - (slope * state.minViewport) / 100;
  return `clamp(${state.minSize}px, ${intercept.toFixed(3)}px + ${slope.toFixed(
    3
  )}vw, ${state.maxSize}px)`;
}

export function ClampGenerator() {
  const [state, setState] = useState<ClampState>(defaults);
  const [copied, setCopied] = useState(false);
  const clampValue = useMemo(() => buildClamp(state), [state]);
  const css = `font-size: ${clampValue};`;

  const copyCss = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-6 shadow-ds-sm">
            <p style={{ fontSize: clampValue }} className="font-semibold text-zinc-900">
              Responsive headline preview
            </p>
            <p className="mt-3 text-sm text-zinc-600">
              Resize the browser to see fluid typography.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <NumberField
            label="Min size (px)"
            value={state.minSize}
            onChange={(v) => setState((s) => ({ ...s, minSize: v }))}
          />
          <NumberField
            label="Max size (px)"
            value={state.maxSize}
            onChange={(v) => setState((s) => ({ ...s, maxSize: v }))}
          />
          <NumberField
            label="Min viewport (px)"
            value={state.minViewport}
            onChange={(v) => setState((s) => ({ ...s, minViewport: v }))}
          />
          <NumberField
            label="Max viewport (px)"
            value={state.maxViewport}
            onChange={(v) => setState((s) => ({ ...s, maxViewport: v }))}
          />
        </section>
      </div>

      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            CSS Output
          </p>
          <button
            onClick={copyCss}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-sm text-zinc-100">
          <code>{css}</code>
        </pre>
      </section>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      />
    </label>
  );
}
