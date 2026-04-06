"use client";

import { useMemo, useState } from "react";

type TransformState = {
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  skewX: number;
};

const defaults: TransformState = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  scale: 1,
  skewX: 0,
};

function toTransform(state: TransformState): string {
  return `translate(${state.translateX}px, ${state.translateY}px) rotate(${state.rotate}deg) scale(${state.scale}) skewX(${state.skewX}deg)`;
}

export function TransformGenerator() {
  const [state, setState] = useState<TransformState>(defaults);
  const [copied, setCopied] = useState(false);

  const transform = useMemo(() => toTransform(state), [state]);
  const css = `transform: ${transform};`;

  const copyCss = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const randomize = () => {
    setState({
      translateX: Math.round(Math.random() * 120) - 60,
      translateY: Math.round(Math.random() * 80) - 40,
      rotate: Math.round(Math.random() * 360) - 180,
      scale: Number((0.6 + Math.random() * 1.2).toFixed(2)),
      skewX: Math.round(Math.random() * 40) - 20,
    });
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="flex min-h-[280px] items-center justify-center rounded-lg border border-zinc-200/90 bg-white p-8 shadow-ds-sm">
            <div className="h-24 w-24 rounded-lg bg-indigo-500" style={{ transform }} />
          </div>
        </section>
        <section className="space-y-4">
          <Slider
            label="Translate X"
            value={state.translateX}
            min={-120}
            max={120}
            suffix="px"
            onChange={(v) => setState((s) => ({ ...s, translateX: v }))}
          />
          <Slider
            label="Translate Y"
            value={state.translateY}
            min={-120}
            max={120}
            suffix="px"
            onChange={(v) => setState((s) => ({ ...s, translateY: v }))}
          />
          <Slider
            label="Rotate"
            value={state.rotate}
            min={-180}
            max={180}
            suffix="deg"
            onChange={(v) => setState((s) => ({ ...s, rotate: v }))}
          />
          <Slider
            label="Scale"
            value={state.scale}
            min={0.5}
            max={2}
            step={0.01}
            suffix=""
            onChange={(v) => setState((s) => ({ ...s, scale: Number(v.toFixed(2)) }))}
          />
          <Slider
            label="Skew X"
            value={state.skewX}
            min={-45}
            max={45}
            suffix="deg"
            onChange={(v) => setState((s) => ({ ...s, skewX: v }))}
          />
          <button
            onClick={randomize}
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Random
          </button>
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

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (v: number) => void;
  step?: number;
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
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-900"
      />
    </div>
  );
}
