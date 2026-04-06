"use client";

import { useMemo, useState } from "react";

type TextShadowState = {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
};

const defaults: TextShadowState = {
  x: 0,
  y: 3,
  blur: 8,
  color: "#111827",
  opacity: 35,
};

const presets: TextShadowState[] = [
  { x: 0, y: 1, blur: 2, color: "#000000", opacity: 25 },
  { x: 0, y: 4, blur: 12, color: "#111827", opacity: 30 },
  { x: 1, y: 1, blur: 0, color: "#111827", opacity: 35 },
  { x: 0, y: 6, blur: 18, color: "#4338ca", opacity: 32 },
];

function hexToRgbTuple(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const h =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [r, g, b];
}

function toShadowValue(state: TextShadowState): string {
  const [r, g, b] = hexToRgbTuple(state.color);
  const a = Math.max(0, Math.min(100, state.opacity)) / 100;
  return `${state.x}px ${state.y}px ${state.blur}px rgba(${r}, ${g}, ${b}, ${a})`;
}

export function TextShadowGenerator() {
  const [state, setState] = useState<TextShadowState>(defaults);
  const [copied, setCopied] = useState(false);

  const value = useMemo(() => toShadowValue(state), [state]);
  const css = `text-shadow: ${value};`;

  const copyCss = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const randomize = () => {
    setState({
      x: Math.round(Math.random() * 16) - 8,
      y: Math.round(Math.random() * 20),
      blur: Math.round(Math.random() * 20),
      color: `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`,
      opacity: 20 + Math.round(Math.random() * 50),
    });
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-zinc-200/90 bg-[var(--surface)] p-8 shadow-ds-sm">
            <p
              className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl"
              style={{ textShadow: value }}
            >
              CSS
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <Control
            label="Offset X"
            value={`${state.x}px`}
            input={
              <input
                type="range"
                min={-30}
                max={30}
                value={state.x}
                onChange={(e) =>
                  setState((s) => ({ ...s, x: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900"
              />
            }
          />
          <Control
            label="Offset Y"
            value={`${state.y}px`}
            input={
              <input
                type="range"
                min={-30}
                max={30}
                value={state.y}
                onChange={(e) =>
                  setState((s) => ({ ...s, y: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900"
              />
            }
          />
          <Control
            label="Blur"
            value={`${state.blur}px`}
            input={
              <input
                type="range"
                min={0}
                max={40}
                value={state.blur}
                onChange={(e) =>
                  setState((s) => ({ ...s, blur: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900"
              />
            }
          />
          <Control
            label="Opacity"
            value={`${state.opacity}%`}
            input={
              <input
                type="range"
                min={0}
                max={100}
                value={state.opacity}
                onChange={(e) =>
                  setState((s) => ({ ...s, opacity: Number(e.target.value) }))
                }
                className="w-full accent-zinc-900"
              />
            }
          />
          <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Color
            </p>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={state.color}
                onChange={(e) =>
                  setState((s) => ({ ...s, color: e.target.value }))
                }
                className="h-10 w-12"
              />
              <input
                value={state.color}
                onChange={(e) =>
                  setState((s) => ({ ...s, color: e.target.value }))
                }
                className="w-full rounded-md border border-zinc-200 px-2 py-1.5 font-mono text-sm"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => setState(p)}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
              >
                Preset {i + 1}
              </button>
            ))}
            <button
              onClick={randomize}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
            >
              Random
            </button>
          </div>
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

function Control({
  label,
  value,
  input,
}: {
  label: string;
  value: string;
  input: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        <p className="text-sm text-zinc-700">{value}</p>
      </div>
      {input}
    </div>
  );
}
