"use client";

import { useMemo, useState } from "react";

type Mode = "shape" | "image-embed";

export function SvgGenerator() {
  const [mode, setMode] = useState<Mode>("shape");
  const [width, setWidth] = useState(240);
  const [height, setHeight] = useState(140);
  const [rx, setRx] = useState(18);
  const [fill, setFill] = useState("#6366f1");
  const [stroke, setStroke] = useState("#1f2937");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [embeddedImage, setEmbeddedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const svg = useMemo(
    () =>
      mode === "shape"
        ? `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />\n</svg>`
        : `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <clipPath id="rounded-clip">\n      <rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" />\n    </clipPath>\n  </defs>\n  ${
            embeddedImage
              ? `<image href="${embeddedImage}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" clip-path="url(#rounded-clip)" />`
              : `<rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="#e5e7eb" />\n  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-size="${Math.max(
                  12,
                  Math.round(width * 0.06)
                )}" fill="#6b7280">Upload image</text>`
          }\n  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="transparent" stroke="${stroke}" stroke-width="${strokeWidth}" />\n</svg>`,
    [mode, width, height, rx, fill, stroke, strokeWidth, embeddedImage]
  );

  const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const copy = async () => {
    await navigator.clipboard.writeText(svg);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const download = () => {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shape.svg";
    a.click();
  };

  const onUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEmbeddedImage(String(reader.result || ""));
      setMode("image-embed");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={encoded} alt="SVG preview" className="max-h-[260px] max-w-full rounded-md border border-zinc-200" />
        </section>
        <section className="space-y-3">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Mode
            </span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
              className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
            >
              <option value="shape">Shape mode</option>
              <option value="image-embed">Image to SVG mode</option>
            </select>
          </label>
          {mode === "image-embed" ? (
            <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Upload image
              </span>
              <input type="file" accept="image/*" onChange={(e) => onUpload(e.target.files?.[0] ?? null)} />
              <p className="mt-2 text-xs text-zinc-500">
                This mode embeds your image data into an SVG file.
              </p>
            </label>
          ) : null}
          <Num label="Width" value={width} min={20} onChange={setWidth} />
          <Num label="Height" value={height} min={20} onChange={setHeight} />
          <Num label="Corner radius" value={rx} min={0} onChange={setRx} />
          <Num label="Stroke width" value={strokeWidth} min={0} onChange={setStrokeWidth} />
          {mode === "shape" ? <ColorField label="Fill" value={fill} onChange={setFill} /> : null}
          <ColorField label="Stroke" value={stroke} onChange={setStroke} />
          <div className="flex gap-2">
            <button onClick={copy} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              {copied ? "Copied!" : "Copy SVG"}
            </button>
            <button onClick={download} className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50">
              Download SVG
            </button>
          </div>
        </section>
      </div>
      <section className="border-t border-zinc-200/90 pt-8">
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-xs text-zinc-100">
          <code>{svg}</code>
        </pre>
      </section>
    </div>
  );
}

function Num({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
      <input type="number" min={min} value={value} onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm" />
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm font-mono" />
      </div>
    </label>
  );
}
