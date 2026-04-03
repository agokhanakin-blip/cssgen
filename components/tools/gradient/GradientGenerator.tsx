"use client";

import { useCallback, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import {
  GRADIENT_MAX_STOPS,
  GRADIENT_MIN_STOPS,
  GRADIENT_PRESETS,
  type GradientState,
  type GradientType,
  buildBackgroundValue,
  buildGradientCSSDeclaration,
  defaultGradientState,
  randomGradientState,
} from "@/lib/gradient";

const segmentedBtn =
  "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2";

export function GradientGenerator() {
  const [state, setState] = useState<GradientState>(defaultGradientState);
  const [copied, setCopied] = useState(false);

  const cssText = useMemo(() => buildGradientCSSDeclaration(state), [state]);
  const background = useMemo(() => buildBackgroundValue(state), [state]);

  const setType = (type: GradientType) => {
    setState((s) => ({ ...s, type }));
  };

  const setAngle = (angle: number) => {
    setState((s) => ({ ...s, angle }));
  };

  const setStopColor = (index: number, color: string) => {
    setState((s) => {
      const stops = s.stops.map((st, i) =>
        i === index ? { ...st, color } : st
      );
      return { ...s, stops };
    });
  };

  const addStop = () => {
    setState((s) => {
      if (s.stops.length >= GRADIENT_MAX_STOPS) return s;
      const last = s.stops[s.stops.length - 1]?.color ?? "#ffffff";
      return { ...s, stops: [...s.stops, { color: last }] };
    });
  };

  const removeStop = (index: number) => {
    setState((s) => {
      if (s.stops.length <= GRADIENT_MIN_STOPS) return s;
      return {
        ...s,
        stops: s.stops.filter((_, i) => i !== index),
      };
    });
  };

  const applyPreset = (preset: GradientState) => {
    setState({
      ...preset,
      stops: preset.stops.map((st) => ({ ...st })),
    });
  };

  const randomize = () => {
    setState(randomGradientState());
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
        {/* Preview */}
        <div className="order-1 lg:order-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div
            className={classNames(
              "min-h-[220px] w-full rounded-lg border border-zinc-200/90 shadow-ds-md sm:min-h-[280px] lg:aspect-[4/3] lg:min-h-0",
              "ring-1 ring-black/[0.04]"
            )}
            style={{ background }}
            role="img"
            aria-label="Live gradient preview"
          />
        </div>

        {/* Controls */}
        <div className="order-2 space-y-8 lg:order-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Type
            </p>
            <div
              className="flex gap-1 rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-1"
              role="group"
              aria-label="Gradient type"
            >
              {(["linear", "radial"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={classNames(
                    segmentedBtn,
                    state.type === t
                      ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  )}
                >
                  {t === "linear" ? "Linear" : "Radial"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <label
                htmlFor="gradient-angle"
                className="text-xs font-semibold uppercase tracking-wide text-zinc-500"
              >
                Angle
              </label>
              <span className="text-sm tabular-nums text-zinc-700">
                {state.angle}°
              </span>
            </div>
            <input
              id="gradient-angle"
              type="range"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              disabled={state.type !== "linear"}
              className={classNames(
                "h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
              )}
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Colors ({state.stops.length}/{GRADIENT_MAX_STOPS})
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addStop}
                  disabled={state.stops.length >= GRADIENT_MAX_STOPS}
                  className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
                >
                  Add color
                </button>
              </div>
            </div>
            <ul className="space-y-3">
              {state.stops.map((stop, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-3 py-2.5 shadow-ds-sm"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => setStopColor(i, e.target.value)}
                    className="h-10 w-14 cursor-pointer shrink-0 rounded border border-zinc-200 bg-transparent p-0.5"
                    aria-label={`Color ${i + 1}`}
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => setStopColor(i, e.target.value)}
                    className="min-w-0 flex-1 rounded-md border border-zinc-200 bg-zinc-50/50 px-2 py-1.5 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={() => removeStop(i)}
                    disabled={state.stops.length <= GRADIENT_MIN_STOPS}
                    className="shrink-0 rounded-md px-2 py-1 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Remove color ${i + 1}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {GRADIENT_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="h-10 w-10 shrink-0 rounded-lg border border-zinc-200/90 shadow-ds-sm ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5 hover:shadow-ds-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                  style={{ background: buildBackgroundValue(preset) }}
                  title={`Preset ${i + 1}`}
                  aria-label={`Apply preset ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={randomize}
              className="w-full rounded-lg border border-zinc-200/90 bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-ds-sm transition-[border-color,box-shadow,transform] hover:border-zinc-300 hover:shadow-ds-md sm:w-auto"
            >
              Random gradient
            </button>
          </div>
        </div>
      </div>

      {/* CSS output */}
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
