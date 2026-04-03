"use client";

import { useCallback, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import {
  BORDER_RADIUS_PRESETS,
  type BorderRadiusCorners,
  type BorderRadiusState,
  buildBorderRadiusCSSDeclaration,
  buildBorderRadiusValue,
  defaultBorderRadiusState,
  randomBorderRadiusState,
} from "@/lib/borderRadius";

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
  unit = "px",
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
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900"
      />
    </div>
  );
}

const CORNER_KEYS: { key: keyof BorderRadiusCorners; label: string }[] = [
  { key: "tl", label: "Top left" },
  { key: "tr", label: "Top right" },
  { key: "br", label: "Bottom right" },
  { key: "bl", label: "Bottom left" },
];

const PREVIEW_BG =
  "linear-gradient(135deg, rgb(99 102 241 / 0.35), rgb(236 72 153 / 0.35))";

export function BorderRadiusGenerator() {
  const [state, setState] = useState<BorderRadiusState>(
    defaultBorderRadiusState
  );
  const [copied, setCopied] = useState(false);

  const cssText = useMemo(
    () => buildBorderRadiusCSSDeclaration(state),
    [state]
  );
  const radiusValue = useMemo(() => buildBorderRadiusValue(state), [state]);

  const setLinked = (linked: boolean) => {
    setState((s) => {
      if (linked) {
        const v = s.corners.tl;
        return {
          linked: true,
          corners: { tl: v, tr: v, br: v, bl: v },
        };
      }
      return { ...s, linked: false };
    });
  };

  const setUniform = (v: number) => {
    setState((s) => ({
      ...s,
      corners: { tl: v, tr: v, br: v, bl: v },
    }));
  };

  const setCorner = (key: keyof BorderRadiusCorners, v: number) => {
    setState((s) => ({
      ...s,
      corners: { ...s.corners, [key]: v },
    }));
  };

  const applyPreset = (preset: BorderRadiusState) => {
    setState({
      linked: preset.linked,
      corners: { ...preset.corners },
    });
  };

  const randomize = () => {
    setState(randomBorderRadiusState());
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

  const uniformVal = state.corners.tl;

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
              className="h-36 w-52 max-w-full border border-zinc-200/80 shadow-ds-sm sm:h-40 sm:w-56"
              style={{
                borderRadius: radiusValue,
                background: PREVIEW_BG,
              }}
              role="img"
              aria-label="Live border radius preview"
            />
          </div>
        </div>

        <div className="order-2 space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Corners
            </p>
            <div
              className="flex gap-1 rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-1"
              role="group"
              aria-label="Corner linking"
            >
              <button
                type="button"
                onClick={() => setLinked(true)}
                className={classNames(
                  segmentedBtn,
                  state.linked
                    ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                All corners
              </button>
              <button
                type="button"
                onClick={() => setLinked(false)}
                className={classNames(
                  segmentedBtn,
                  !state.linked
                    ? "bg-[var(--surface)] text-zinc-900 shadow-ds-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                Individual
              </button>
            </div>
          </div>

          {state.linked ? (
            <SliderRow
              id="br-uniform"
              label="Radius"
              value={uniformVal}
              min={0}
              max={160}
              onChange={setUniform}
            />
          ) : (
            <div className="space-y-6">
              {CORNER_KEYS.map(({ key, label }) => (
                <SliderRow
                  key={key}
                  id={`br-${key}`}
                  label={label}
                  value={state.corners[key]}
                  min={0}
                  max={160}
                  onChange={(v) => setCorner(key, v)}
                />
              ))}
            </div>
          )}

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Presets
            </p>
            <div className="flex flex-wrap gap-2">
              {BORDER_RADIUS_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-200/90 bg-[var(--surface)] shadow-ds-sm ring-1 ring-black/[0.04] transition-transform hover:-translate-y-0.5 hover:shadow-ds-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
                  title={`Preset ${i + 1}`}
                  aria-label={`Apply radius preset ${i + 1}`}
                >
                  <span
                    className="block h-8 w-8 border border-zinc-300/80"
                    style={{
                      borderRadius: buildBorderRadiusValue(preset),
                      background: PREVIEW_BG,
                    }}
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
              Random radius
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
