"use client";

import { useState } from "react";

export function Base64ImageConverter() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const onUpload = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result || "");
      setDataUrl(value);
      setPreview(value);
    };
    reader.readAsDataURL(file);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(dataUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-8">
      <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Upload image
        </span>
        <input type="file" accept="image/*" onChange={(e) => onUpload(e.target.files?.[0] ?? null)} />
      </label>

      {preview ? (
        <div className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">Preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Base64 preview" className="max-h-48 rounded-md border border-zinc-200" />
        </div>
      ) : null}

      <section className="border-t border-zinc-200/90 pt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Data URL Output</p>
          <button
            onClick={copy}
            disabled={!dataUrl}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          readOnly
          value={dataUrl}
          rows={8}
          className="w-full rounded-lg border border-zinc-200/90 bg-zinc-950 p-3 font-mono text-xs text-zinc-100"
        />
      </section>
    </div>
  );
}
