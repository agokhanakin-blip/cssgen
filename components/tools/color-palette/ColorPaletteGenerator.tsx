"use client";

import { useCallback, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import {
  PALETTE_BASE_PRESETS,
  PALETTE_SCHEMES,
  type PaletteState,
  buildPaletteCSSVariables,
  defaultPaletteState,
  generatePalette,
  normalizeHex6,
  randomBaseHex,
} from "@/lib/colorPalette";

const segmentedBtn =
  "w-full rounded-md px-2.5 py-2 text-center text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 sm:px-3 sm:text-sm";

type CopiedTarget = "css" | number | null;

export function ColorPaletteGenerator() {
  const [state, setState] = useState<PaletteState>(defaultPaletteState);
  const [copied, setCopied] = useState<CopiedTarget>(null);

  const effectiveBase = normalizeHex6(state.baseHex) ?? "#6366f1";
  const colors = useMemo(
    () => generatePalette(effectiveBase, state.scheme),
    [effectiveBase, state.scheme]
  );

  const cssBlock = useMemo(() => buildPaletteCSSVariables(colors), [colors]);

  const feedback = useCallback((target: CopiedTarget) => {
    setCopied(target);
    window.setTimeout(() => setCopied(null), 1800);
  }, []);

  const copyCss = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssBlock);
      feedback("css");
    } catch {
      setCopied(null);
    }
  }, [cssBlock, feedback]);

  const copyHex = useCallback(
    async (hex: string, index: number) => {
      try {
        await navigator.clipboard.writeText(hex);
        feedback(index);
      } catch {
        setCopied(null);
      }
    },
    [feedback]
  );

  const pickerValue = normalizeHex6(state.baseHex) ?? "#6366f1";

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <div className="order-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div
            className="rounded-lg border border-zinc-200/90 bg-[var(--background)] p-4 shadow-ds-sm sm:p-5"
            role="region"
            aria-label="Generated palette swatches"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {colors.map((hex, i) => (
                <div
                  key={`${hex}-${i}`}
                  className="flex min-w-[calc(50%-0.25rem)] flex-1 flex-col gap-2 sm:min-w-[5.5rem]"
                >
                  <div
                    className="aspect-square w-full min-h-[5rem] rounded-lg border border-zinc-200/80 shadow-ds-sm sm:min-h-[6.5rem]"
                    style={{ backgroundColor: hex }}
                  />
                  <code className="block truncate text-center font-mono text-xs text-zinc-700">
                    {hex}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copyHex(hex, i)}
                    className="rounded-md border border-zinc-200/90 bg-[var(--surface)] py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:border-zinc-300"
                  >
                    {copied === i ? "Copied!" : "Copy hex"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Base color
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-3 py-2.5 shadow-ds-sm">
              <input
                type="color"
                value={pickerValue}
                onChange={(e) =>
                  setState((s) => ({ ...s, baseHex: e.target.value }))
                }
                className="h-10 w-14 cursor-pointer shrink-0 rounded border border-zinc-200 bg-transparent p-0.5"
                aria-label="Base color"
              />
              <input
                type="text"
                value={state.baseHex}
                onChange={(e) =>
                  setState((s) => ({ ...s, baseHex: e.target.value }))
                }
                className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-zinc-50/50 px-2 py-1.5 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                spellCheck={false}
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Harmony
            </p>
            <div
              className="grid grid-cols-2 gap-1 rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-1 sm:grid-cols-4"
              role="group"
              aria-label="Palette harmony type"
            >
              {PALETTE_SCHEMES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, scheme: id }))}
                  className={classNames(
                    segmentedBtn,
                    state.scheme === id
                      ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Base presets
            </p>
            <div className="flex flex-wrap gap-2">
              {PALETTE_BASE_PRESETS.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, baseHex: hex }))}
                  className="h-10 w-10 rounded-lg border border-zinc-200/90 shadow-ds-sm ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5 hover:shadow-ds-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                  style={{ backgroundColor: hex }}
                  title={hex}
                  aria-label={`Use base ${hex}`}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() =>
                setState((s) => ({ ...s, baseHex: randomBaseHex() }))
              }
              className="w-full rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-ds-sm transition-[border-color,box-shadow,transform] hover:border-zinc-300 hover:shadow-ds-md sm:w-auto"
            >
              Random base color
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
              CSS custom properties — paste into your stylesheet.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void copyCss()}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-ds-sm transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            {copied === "css" ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre
          className="mt-4 overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-100 shadow-ds-sm"
          tabIndex={0}
        >
          <code>{cssBlock}</code>
        </pre>
      </div>
    </div>
  );
}
