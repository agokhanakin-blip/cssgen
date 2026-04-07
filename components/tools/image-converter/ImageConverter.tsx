"use client";

import { useMemo, useRef, useState } from "react";

type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

const OUTPUT_FORMAT_LABELS: Record<OutputFormat, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WEBP",
};

export function ImageConverter() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("image");
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(92);
  const [status, setStatus] = useState(
    "Upload an image, choose output format, then click Convert."
  );
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const qualityEnabled = useMemo(
    () => format === "image/jpeg" || format === "image/webp",
    [format]
  );

  const onUpload = (file: File | null) => {
    if (!file) return;
    const base = file.name.replace(/\.[^/.]+$/, "");
    setFileName(base || "image");
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setOutputUrl(null);
    setStatus("Image uploaded. Click Convert when ready.");
  };

  const convert = () => {
    if (!imageSrc || !imgRef.current) {
      setStatus("Please upload an image first.");
      return;
    }
    if (!imgRef.current.complete) {
      setStatus("Image is still loading. Please try again in a moment.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setStatus("Canvas is not available in this browser.");
      return;
    }

    ctx.drawImage(imgRef.current, 0, 0);
    const q = Math.max(0.1, Math.min(1, quality / 100));
    const convertedUrl = canvas.toDataURL(format, q);
    setOutputUrl(convertedUrl);
    setStatus(`Done. ${OUTPUT_FORMAT_LABELS[format]} file is ready to download.`);
  };

  const download = () => {
    if (!outputUrl) {
      setStatus("Convert the image before downloading.");
      return;
    }
    const ext = format === "image/png" ? "png" : format === "image/jpeg" ? "jpg" : "webp";
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `${fileName}-converted.${ext}`;
    a.click();
    setStatus("Download started.");
  };

  return (
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
                  alt="Uploaded preview"
                  className="max-h-[360px] max-w-full rounded-md"
                />
              </div>
              {outputUrl ? (
                <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
                  Converted file is ready. Use Download to save it.
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
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
        </label>

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

        <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Quality ({quality}%)
          </span>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            disabled={!qualityEnabled}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-zinc-900 disabled:opacity-40"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Quality is used for JPG and WEBP. PNG is lossless.
          </p>
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={convert}
            disabled={!imageSrc}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Convert
          </button>
          <button
            onClick={download}
            disabled={!outputUrl}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Download
          </button>
        </div>

        <p className="text-sm text-zinc-600">{status}</p>
      </section>
    </div>
  );
}
