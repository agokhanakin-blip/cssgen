"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Rect = { x: number; y: number; w: number; h: number };
type HandleKind = "move" | "nw" | "ne" | "sw" | "se";

function clampRect(r: Rect, maxW: number, maxH: number, min = 20): Rect {
  let { x, y, w, h } = r;
  w = Math.max(min, w);
  h = Math.max(min, h);
  x = Math.max(0, Math.min(x, maxW - min));
  y = Math.max(0, Math.min(y, maxH - min));
  w = Math.min(w, maxW - x);
  h = Math.min(h, maxH - y);
  return { x, y, w, h };
}

function clientToNatural(
  clientX: number,
  clientY: number,
  img: HTMLImageElement
): { x: number; y: number } {
  const r = img.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return { x: 0, y: 0 };
  const nx = ((clientX - r.left) / r.width) * img.naturalWidth;
  const ny = ((clientY - r.top) / r.height) * img.naturalHeight;
  return {
    x: Math.max(0, Math.min(nx, img.naturalWidth)),
    y: Math.max(0, Math.min(ny, img.naturalHeight)),
  };
}

function resizeFromHandle(
  kind: Exclude<HandleKind, "move">,
  sel: Rect,
  p: { x: number; y: number },
  maxW: number,
  maxH: number,
  min = 20
): Rect {
  let { x, y, w, h } = sel;
  if (kind === "se") {
    w = p.x - x;
    h = p.y - y;
  } else if (kind === "nw") {
    const bx = x + w;
    const by = y + h;
    w = bx - p.x;
    h = by - p.y;
    x = p.x;
    y = p.y;
  } else if (kind === "ne") {
    const bottom = y + h;
    w = p.x - x;
    h = bottom - p.y;
    y = p.y;
  } else {
    /* sw */
    const right = x + w;
    w = right - p.x;
    h = p.y - y;
    x = p.x;
  }
  return clampRect({ x, y, w, h }, maxW, maxH, min);
}

export function ImageCropTool() {
  const [src, setSrc] = useState<string | null>(null);
  const [name, setName] = useState("image");
  const [sel, setSel] = useState<Rect>({ x: 0, y: 0, w: 100, h: 100 });
  const [meta, setMeta] = useState<{ w: number; h: number } | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState(
    "Upload an image, drag on it to select a region, then Crop."
  );
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [viewW, setViewW] = useState(0);
  const dragRef = useRef<{
    kind: HandleKind;
    startPointer: { x: number; y: number };
    startSel: Rect;
    maxW: number;
    maxH: number;
  } | null>(null);

  const pointerHandlers = useMemo(() => {
    const api = {
      move(e: PointerEvent) {
        const img = imgRef.current;
        const d = dragRef.current;
        if (!img || !d) return;
        e.preventDefault();
        const p = clientToNatural(e.clientX, e.clientY, img);
        if (d.kind === "move") {
          const dx = p.x - d.startPointer.x;
          const dy = p.y - d.startPointer.y;
          const { x: sx, y: sy, w, h } = d.startSel;
          setSel(clampRect({ x: sx + dx, y: sy + dy, w, h }, d.maxW, d.maxH, 20));
        } else {
          setSel(
            resizeFromHandle(d.kind, d.startSel, p, d.maxW, d.maxH, 20)
          );
        }
      },
      up() {
        dragRef.current = null;
        window.removeEventListener("pointermove", api.move);
        window.removeEventListener("pointerup", api.up);
        window.removeEventListener("pointercancel", api.up);
      },
    };
    return api;
  }, []);

  const onUpload = (file: File | null) => {
    if (!file) return;
    setName(file.name.replace(/\.[^/.]+$/, "") || "image");
    setSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setMeta(null);
    setOutput(null);
    setStatus("Loading image…");
  };

  useEffect(() => {
    return () => {
      if (src) URL.revokeObjectURL(src);
    };
  }, [src]);

  useEffect(() => {
    if (!src) return;
    const img = imgRef.current;
    if (!img) return;
    const ro = new ResizeObserver(() => {
      setViewW(img.clientWidth);
    });
    ro.observe(img);
    return () => ro.disconnect();
  }, [src, meta]);

  const onImageLoad = () => {
    const img = imgRef.current;
    if (!img) return;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setMeta({ w, h });
    setSel({ x: 0, y: 0, w, h });
    setViewW(img.clientWidth);
    setStatus(
      "Drag the white handles to resize, drag inside the box to move, or use the number fields."
    );
  };

  const applySelFromFields = useCallback(
    (patch: Partial<Rect>) => {
      if (!meta) return;
      setSel((s) => clampRect({ ...s, ...patch }, meta.w, meta.h, 20));
    },
    [meta]
  );

  const startDrag = (kind: HandleKind, e: React.PointerEvent) => {
    const img = imgRef.current;
    if (!img || !meta || !img.complete) return;
    e.preventDefault();
    e.stopPropagation();
    const p = clientToNatural(e.clientX, e.clientY, img);
    dragRef.current = {
      kind,
      startPointer: p,
      startSel: { ...sel },
      maxW: meta.w,
      maxH: meta.h,
    };
    window.addEventListener("pointermove", pointerHandlers.move, {
      passive: false,
    });
    window.addEventListener("pointerup", pointerHandlers.up);
    window.addEventListener("pointercancel", pointerHandlers.up);
  };

  const resetFull = () => {
    if (!meta) return;
    setSel({ x: 0, y: 0, w: meta.w, h: meta.h });
    setStatus("Selection reset to full image.");
  };

  const crop = () => {
    const img = imgRef.current;
    if (!img || !img.complete || !meta) {
      setStatus("Image is not ready yet.");
      return;
    }
    const canvas = document.createElement("canvas");
    const outW = Math.max(1, Math.round(sel.w));
    const outH = Math.max(1, Math.round(sel.h));
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(
      img,
      sel.x,
      sel.y,
      sel.w,
      sel.h,
      0,
      0,
      outW,
      outH
    );
    setOutput(canvas.toDataURL("image/png"));
    setStatus("Crop completed. You can download it now.");
  };

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    a.download = `${name}-crop.png`;
    a.click();
  };

  const displayScale = useMemo(() => {
    if (!meta || meta.w <= 0 || viewW <= 0) return 1;
    return viewW / meta.w;
  }, [meta, viewW]);

  const disp = {
    x: sel.x * displayScale,
    y: sel.y * displayScale,
    w: sel.w * displayScale,
    h: sel.h * displayScale,
  };

  const handleCls =
    "absolute z-10 h-3 w-3 rounded-sm border-2 border-white bg-zinc-900 shadow touch-none";

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Source — click & drag region
          </p>
          {src ? (
            <div className="relative inline-block max-w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt="Crop source"
                onLoad={onImageLoad}
                className="block max-h-[400px] max-w-full rounded-md border border-zinc-200"
                draggable={false}
              />
              {meta ? (
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden
                >
                  <div
                    className="pointer-events-auto absolute cursor-move touch-none rounded-sm border-2 border-white ring-1 ring-zinc-900/80"
                    style={{
                      left: disp.x,
                      top: disp.y,
                      width: disp.w,
                      height: disp.h,
                      boxShadow: "0 0 0 2000px rgba(0,0,0,0.4)",
                    }}
                    onPointerDown={(e) => startDrag("move", e)}
                    title="Drag to move"
                  >
                    <button
                      type="button"
                      aria-label="Resize crop north-west"
                      className={`${handleCls} -left-1.5 -top-1.5 cursor-nwse-resize`}
                      onPointerDown={(e) => startDrag("nw", e)}
                    />
                    <button
                      type="button"
                      aria-label="Resize crop north-east"
                      className={`${handleCls} -right-1.5 -top-1.5 cursor-nesw-resize`}
                      onPointerDown={(e) => startDrag("ne", e)}
                    />
                    <button
                      type="button"
                      aria-label="Resize crop south-west"
                      className={`${handleCls} -bottom-1.5 -left-1.5 cursor-nesw-resize`}
                      onPointerDown={(e) => startDrag("sw", e)}
                    />
                    <button
                      type="button"
                      aria-label="Resize crop south-east"
                      className={`${handleCls} -bottom-1.5 -right-1.5 cursor-nwse-resize`}
                      onPointerDown={(e) => startDrag("se", e)}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-md border border-dashed border-zinc-300 text-sm text-zinc-500">
              Upload image to preview
            </div>
          )}
          {meta ? (
            <p className="mt-2 text-xs text-zinc-500">
              Image {meta.w}×{meta.h}px — selection {Math.round(sel.w)}×
              {Math.round(sel.h)}px
            </p>
          ) : null}
        </section>

        <section className="space-y-3">
          <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Upload image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <NumField
              label="X (px)"
              value={Math.round(sel.x)}
              onChange={(v) => applySelFromFields({ x: v })}
              min={0}
              disabled={!meta}
            />
            <NumField
              label="Y (px)"
              value={Math.round(sel.y)}
              onChange={(v) => applySelFromFields({ y: v })}
              min={0}
              disabled={!meta}
            />
            <NumField
              label="Width (px)"
              value={Math.round(sel.w)}
              onChange={(v) => applySelFromFields({ w: v })}
              min={20}
              disabled={!meta}
            />
            <NumField
              label="Height (px)"
              value={Math.round(sel.h)}
              onChange={(v) => applySelFromFields({ h: v })}
              min={20}
              disabled={!meta}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={resetFull}
              disabled={!meta}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
            >
              Full image
            </button>
            <button
              type="button"
              onClick={crop}
              disabled={!src || !meta}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-40"
            >
              Crop
            </button>
            <button
              type="button"
              onClick={download}
              disabled={!output}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-40"
            >
              Download
            </button>
          </div>
          <p className="text-sm text-zinc-600">{status}</p>
        </section>
      </div>

      {output ? (
        <section className="border-t border-zinc-200/90 pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Cropped output
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={output}
            alt="Cropped output"
            className="max-h-64 max-w-full rounded-md border border-zinc-200 object-contain"
          />
        </section>
      ) : null}
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
  min = 0,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  disabled?: boolean;
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <input
        type="number"
        min={min}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm disabled:opacity-50"
      />
    </label>
  );
}
