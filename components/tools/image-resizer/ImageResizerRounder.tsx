"use client";

import { useMemo, useRef, useState } from "react";

type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

export function ImageResizerRounder() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [natural, setNatural] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockRatio, setLockRatio] = useState(true);
  const [radius, setRadius] = useState(24);
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(92);
  const [downloadReady, setDownloadReady] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(
    "Upload an image, then click Start Processing."
  );

  const imgRef = useRef<HTMLImageElement | null>(null);
  const ratio = useMemo(() => {
    if (!natural.width || !natural.height) return 1;
    return natural.width / natural.height;
  }, [natural]);

  const onUpload = (file: File | null) => {
    if (!file) return;
    const base = file.name.replace(/\.[^/.]+$/, "");
    setFileName(base || "image");
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setDownloadReady(null);
    setStatus("Image uploaded. Adjust settings, then click Start Processing.");
  };

  const onLoaded = () => {
    const img = imgRef.current;
    if (!img) return;
    setNatural({ width: img.naturalWidth, height: img.naturalHeight });
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
  };

  const onWidthChange = (v: number) => {
    setWidth(v);
    if (lockRatio && ratio > 0) {
      setHeight(Math.max(1, Math.round(v / ratio)));
    }
  };

  const onHeightChange = (v: number) => {
    setHeight(v);
    if (lockRatio && ratio > 0) {
      setWidth(Math.max(1, Math.round(v * ratio)));
    }
  };

  const processImage = () => {
    if (!imageSrc || !imgRef.current) {
      setStatus("Please upload an image first.");
      return;
    }
    if (!imgRef.current.complete) {
      setStatus("Image is still loading. Please try again in a moment.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, width);
    canvas.height = Math.max(1, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const r = Math.min(radius, canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, r);
    ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, r);
    ctx.arcTo(0, canvas.height, 0, 0, r);
    ctx.arcTo(0, 0, canvas.width, 0, r);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
    const q = Math.max(0.1, Math.min(1, quality / 100));
    const url = canvas.toDataURL(format, q);
    setDownloadReady(url);
    setStatus("Done. Your processed image is ready to download.");
  };

  const download = () => {
    if (!downloadReady) {
      setStatus("Click Start Processing before downloading.");
      return;
    }
    const ext = format === "image/png" ? "png" : format === "image/jpeg" ? "jpg" : "webp";
    const a = document.createElement("a");
    a.href = downloadReady;
    a.download = `${fileName}-resized-rounded.${ext}`;
    a.click();
    setStatus("Download started.");
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Preview
          </p>
          <div className="rounded-lg border border-zinc-200/90 bg-white p-5 shadow-ds-sm">
            {imageSrc ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center rounded-lg bg-zinc-100 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    onLoad={onLoaded}
                    alt="Uploaded preview"
                    style={{
                      width: Math.min(width, 420),
                      height: "auto",
                      borderRadius: Math.min(radius, 40),
                    }}
                    className="max-w-full"
                  />
                </div>
                {downloadReady ? (
                  <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
                    Processed image is ready to download.
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-500">
                Upload an image to start
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Upload image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <NumberInput label="Width (px)" value={width} onChange={onWidthChange} />
            <NumberInput label="Height (px)" value={height} onChange={onHeightChange} />
          </div>

          <label className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
            <input
              type="checkbox"
              checked={lockRatio}
              onChange={(e) => setLockRatio(e.target.checked)}
            />
            Keep aspect ratio
          </label>

          <RangeInput
            label="Corner radius"
            value={radius}
            min={0}
            max={220}
            suffix="px"
            onChange={setRadius}
          />

          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Output format
            </span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
              className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </label>

          <RangeInput
            label="Quality"
            value={quality}
            min={10}
            max={100}
            suffix="%"
            onChange={setQuality}
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={processImage}
              disabled={!imageSrc}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Start Processing
            </button>
            <button
              onClick={download}
              disabled={!downloadReady}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Download
            </button>
          </div>
          <p className="text-sm text-zinc-600">{status}</p>
        </section>
      </div>
    </div>
  );
}

function NumberInput({
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
        min={1}
        value={value}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value) || 1))}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      />
    </label>
  );
}

function RangeInput({
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
