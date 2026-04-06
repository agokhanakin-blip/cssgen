"use client";

import { useMemo, useState } from "react";

export function CssUnitConverter() {
  const [px, setPx] = useState(16);
  const [base, setBase] = useState(16);
  const [copied, setCopied] = useState<string | null>(null);

  const rem = useMemo(() => px / base, [px, base]);
  const em = useMemo(() => px / base, [px, base]);
  const percent = useMemo(() => (px / base) * 100, [px, base]);

  const copy = async (v: string, key: string) => {
    await navigator.clipboard.writeText(v);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Value (px)" value={px} onChange={setPx} />
        <NumberField label="Base font size (px)" value={base} onChange={setBase} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Result label="REM" value={`${rem.toFixed(4)}rem`} copied={copied === "rem"} onCopy={() => copy(`${rem.toFixed(4)}rem`, "rem")} />
        <Result label="EM" value={`${em.toFixed(4)}em`} copied={copied === "em"} onCopy={() => copy(`${em.toFixed(4)}em`, "em")} />
        <Result label="%" value={`${percent.toFixed(2)}%`} copied={copied === "pct"} onCopy={() => copy(`${percent.toFixed(2)}%`, "pct")} />
      </div>
    </div>
  );
}

function NumberField({
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

function Result({
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
    <div className="rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">{label}</p>
      <code className="block rounded bg-zinc-50 px-2 py-2 font-mono text-sm text-zinc-800">{value}</code>
      <button onClick={onCopy} className="mt-2 rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
