"use client";

import { useMemo, useState } from "react";

type Timing = "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out";
type Property = "all" | "opacity" | "transform" | "background-color";

type TransitionState = {
  property: Property;
  duration: number;
  timing: Timing;
  delay: number;
};

const defaults: TransitionState = {
  property: "all",
  duration: 300,
  timing: "ease",
  delay: 0,
};

export function TransitionGenerator() {
  const [state, setState] = useState<TransitionState>(defaults);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const transition = useMemo(
    () =>
      `${state.property} ${state.duration}ms ${state.timing} ${state.delay}ms`,
    [state]
  );
  const css = `transition: ${transition};`;

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
            <button
              onClick={() => setActive((v) => !v)}
              className="mb-4 rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
            >
              Toggle state
            </button>
            <div
              className="h-24 w-24 rounded-lg bg-indigo-500"
              style={{
                transition,
                transform: active ? "translateX(80px) scale(1.06)" : "none",
                opacity: active ? 0.55 : 1,
                backgroundColor: active ? "#ec4899" : "#6366f1",
              }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <SelectField
            label="Property"
            value={state.property}
            onChange={(v) =>
              setState((s) => ({ ...s, property: v as TransitionState["property"] }))
            }
            options={["all", "opacity", "transform", "background-color"]}
          />
          <RangeField
            label="Duration"
            value={state.duration}
            min={0}
            max={2000}
            suffix="ms"
            onChange={(v) => setState((s) => ({ ...s, duration: v }))}
          />
          <SelectField
            label="Timing function"
            value={state.timing}
            onChange={(v) =>
              setState((s) => ({ ...s, timing: v as TransitionState["timing"] }))
            }
            options={["ease", "linear", "ease-in", "ease-out", "ease-in-out"]}
          />
          <RangeField
            label="Delay"
            value={state.delay}
            min={0}
            max={1200}
            suffix="ms"
            onChange={(v) => setState((s) => ({ ...s, delay: v }))}
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

function SelectField({
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function RangeField({
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
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        <p className="text-sm text-zinc-700">
          {value}
          {suffix}
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-900"
      />
    </div>
  );
}
