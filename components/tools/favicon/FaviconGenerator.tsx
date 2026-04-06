"use client";

import { useRef, useState } from "react";

const sizes = [16, 32, 48, 64, 180];

export function FaviconGenerator() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("favicon");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onUpload = (file: File | null) => {
    if (!file) return;
    setName(file.name.replace(/\.[^/.]+$/, "") || "favicon");
    setSrc(URL.createObjectURL(file));
    setReady(false);
  };

  const downloadSize = (size: number) => {
    const img = imgRef.current;
    if (!img || !img.complete) return;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, size, size);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${name}-${size}x${size}.png`;
    a.click();
  };

  const htmlSnippet = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`;

  const copySnippet = async () => {
    await navigator.clipboard.writeText(htmlSnippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Upload source
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
          />
          {src ? (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                onLoad={() => setReady(true)}
                alt="Favicon source"
                className="max-h-44 max-w-full rounded-md border border-zinc-200"
              />
            </div>
          ) : null}
        </section>
        <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Download sizes
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => downloadSize(s)}
                disabled={!ready}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 disabled:opacity-40"
              >
                {s}x{s}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-zinc-600">
            Upload a square image for best results.
          </p>
        </section>
      </div>
      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            HTML Snippet
          </p>
          <button
            onClick={copySnippet}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-xs text-zinc-100">
          <code>{htmlSnippet}</code>
        </pre>
      </section>
    </div>
  );
}
