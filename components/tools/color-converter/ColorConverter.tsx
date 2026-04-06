"use client";

import { useMemo, useState } from "react";
import {
  hexToRgb,
  hslToRgb,
  normalizeHex6,
  rgbToHex,
  rgbToHsl,
} from "@/lib/colorPalette";

export function ColorConverter() {
  const [hexInput, setHexInput] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);

  const normalized = normalizeHex6(hexInput) ?? "#6366f1";
  const rgb = useMemo(() => hexToRgb(normalized), [normalized]);
  const hsl = useMemo(() => {
    if (!rgb) return null;
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }, [rgb]);

  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "rgb(99, 102, 241)";
  const hslString = hsl
    ? `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
    : "hsl(239, 85%, 67%)";
  const cssVars = `:root {\n  --color-hex: ${normalized};\n  --color-rgb: ${rgbString};\n  --color-hsl: ${hslString};\n}`;

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1800);
  };

  const randomize = () => {
    setHexInput(
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`
    );
  };

  const complementary = (() => {
    if (!hsl) return normalized;
    const { r, g, b } = hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l);
    return rgbToHex(r, g, b);
  })();

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-5 shadow-ds-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <ColorBox label="Base" color={normalized} />
              <ColorBox label="Complementary" color={complementary} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Source color
            </span>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={normalized}
                onChange={(e) => setHexInput(e.target.value)}
                className="h-10 w-12"
              />
              <input
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                className="w-full rounded-md border border-zinc-200 px-2 py-2 font-mono text-sm"
              />
              <button
                onClick={randomize}
                className="shrink-0 rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
              >
                Random
              </button>
            </div>
          </label>

          <ResultRow
            label="HEX"
            value={normalized}
            copied={copied === "hex"}
            onCopy={() => copy(normalized, "hex")}
          />
          <ResultRow
            label="RGB"
            value={rgbString}
            copied={copied === "rgb"}
            onCopy={() => copy(rgbString, "rgb")}
          />
          <ResultRow
            label="HSL"
            value={hslString}
            copied={copied === "hsl"}
            onCopy={() => copy(hslString, "hsl")}
          />
        </section>
      </div>

      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            CSS Output
          </p>
          <button
            onClick={() => copy(cssVars, "css")}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            {copied === "css" ? "Copied!" : "Copy CSS"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-sm text-zinc-100">
          <code>{cssVars}</code>
        </pre>
      </section>
    </div>
  );
}

function ResultRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <p className="w-14 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <code className="flex-1 rounded bg-zinc-50 px-2 py-1.5 font-mono text-sm text-zinc-800">
        {value}
      </code>
      <button
        onClick={onCopy}
        className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

function ColorBox({ label, color }: { label: string; color: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <div
        className="h-24 rounded-lg border border-zinc-200/80 shadow-ds-sm"
        style={{ background: color }}
      />
      <p className="mt-2 font-mono text-xs text-zinc-700">{color}</p>
    </div>
  );
}
