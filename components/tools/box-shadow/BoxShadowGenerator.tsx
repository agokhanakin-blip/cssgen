"use client";

import { useCallback, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import {
  BOX_SHADOW_PRESETS,
  type BoxShadowState,
  buildBoxShadowCSSDeclaration,
  buildBoxShadowValue,
  defaultBoxShadowState,
  randomBoxShadowState,
} from "@/lib/boxShadow";

const segmentedBtn =
  "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

type SliderRowProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (n: number) => void;
};

function SliderRow({
  id,
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
}: SliderRowProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
        >
          {label}
        </label>
        <span className="text-sm tabular-nums text-zinc-700">
          {value}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900"
      />
    </div>
  );
}

export function BoxShadowGenerator() {
  const [state, setState] = useState<BoxShadowState>(defaultBoxShadowState);
  const [copied, setCopied] = useState(false);

  const cssText = useMemo(
    () => buildBoxShadowCSSDeclaration(state),
    [state]
  );
  const shadowValue = useMemo(() => buildBoxShadowValue(state), [state]);

  const setInset = (inset: boolean) => {
    setState((s) => ({ ...s, inset }));
  };

  const applyPreset = (preset: BoxShadowState) => {
    setState({ ...preset });
  };

  const randomize = () => {
    setState(randomBoxShadowState());
  };

  const copyCss = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [cssText]);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="order-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div
            className={classNames(
              "flex min-h-[220px] items-center justify-center rounded-lg border border-zinc-200/90 bg-[var(--background)] p-8 sm:min-h-[280px] lg:aspect-[4/3] lg:min-h-0"
            )}
          >
            <div
              className="h-28 w-44 max-w-full rounded-lg bg-[var(--surface)] sm:h-32 sm:w-52"
              style={{ boxShadow: shadowValue }}
              role="img"
              aria-label="Live box shadow preview"
            />
          </div>
        </div>

        <div className="order-2 space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Position
            </p>
            <div
              className="flex gap-1 rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-1"
              role="group"
              aria-label="Shadow position"
            >
              <button
                type="button"
                onClick={() => setInset(false)}
                className={classNames(
                  segmentedBtn,
                  !state.inset
                    ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Outer
              </button>
              <button
                type="button"
                onClick={() => setInset(true)}
                className={classNames(
                  segmentedBtn,
                  state.inset
                    ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Inset
              </button>
            </div>
          </div>

          <SliderRow
            id="bs-x"
            label="Offset X"
            value={state.offsetX}
            min={-48}
            max={48}
            unit="px"
            onChange={(offsetX) => setState((s) => ({ ...s, offsetX }))}
          />
          <SliderRow
            id="bs-y"
            label="Offset Y"
            value={state.offsetY}
            min={-48}
            max={48}
            unit="px"
            onChange={(offsetY) => setState((s) => ({ ...s, offsetY }))}
          />
          <SliderRow
            id="bs-blur"
            label="Blur"
            value={state.blur}
            min={0}
            max={64}
            unit="px"
            onChange={(blur) => setState((s) => ({ ...s, blur }))}
          />
          <SliderRow
            id="bs-spread"
            label="Spread"
            value={state.spread}
            min={-24}
            max={32}
            unit="px"
            onChange={(spread) => setState((s) => ({ ...s, spread }))}
          />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Color
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-3 py-2.5 shadow-ds-sm">
              <input
                type="color"
                value={
                  state.color.startsWith("#") && state.color.length >= 4
                    ? `#${normalizeForPicker(state.color)}`
                    : "#18181b"
                }
                onChange={(e) =>
                  setState((s) => ({ ...s, color: e.target.value }))
                }
                className="h-10 w-14 cursor-pointer shrink-0 rounded border border-zinc-200 bg-transparent p-0.5"
                aria-label="Shadow color"
              />
              <input
                type="text"
                value={state.color}
                onChange={(e) =>
                  setState((s) => ({ ...s, color: e.target.value }))
                }
                className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-zinc-50/50 px-2 py-1.5 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                spellCheck={false}
              />
            </div>
          </div>

          <SliderRow
            id="bs-opacity"
            label="Opacity"
            value={state.opacity}
            min={0}
            max={100}
            unit="%"
            onChange={(opacity) => setState((s) => ({ ...s, opacity }))}
          />

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {BOX_SHADOW_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200/90 bg-[var(--surface)] shadow-ds-sm ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5 hover:shadow-ds-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                  title={`Preset ${i + 1}`}
                  aria-label={`Apply shadow preset ${i + 1}`}
                >
                  <span
                    className="h-7 w-7 rounded-md bg-[var(--surface)]"
                    style={{ boxShadow: buildBoxShadowValue(preset) }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={randomize}
              className="w-full rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-ds-sm transition-[border-color,box-shadow,transform] hover:border-zinc-300 hover:shadow-ds-md sm:w-auto"
            >
              Random shadow
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200/90 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              CSS
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Copy this into your stylesheet.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void copyCss()}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-ds-sm transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre
          className="mt-4 overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-100 shadow-ds-sm"
          tabIndex={0}
        >
          <code>{cssText}</code>
        </pre>
      </div>
    </div>
  );
}

function normalizeForPicker(hex: string): string {
  const h = hex.replace(/^#/, "");
  if (h.length === 3) {
    return h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length === 6 && /^[0-9a-fA-F]+$/.test(h)) return h;
  return "18181b";
}
