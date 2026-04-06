"use client";

import { useMemo, useState } from "react";

type IconId =
  | "spark"
  | "bolt"
  | "ring"
  | "leaf"
  | "cube"
  | "heart"
  | "shield"
  | "star"
  | "hex"
  | "diamond";
type Layout = "icon-left" | "icon-top";
type FontStackId = "system" | "serif" | "mono" | "display";
type PresetId =
  | "saas-dark"
  | "soft-light"
  | "neon"
  | "tech-blue"
  | "minimal-mono"
  | "retro-warm"
  | "forest"
  | "sunset"
  | "editorial"
  | "midnight-gold";

const ICON_PATHS: Record<IconId, string> = {
  spark:
    "M50 8l8 20 20 8-20 8-8 20-8-20-20-8 20-8 8-20zm-24 52l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10zm48-4l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8z",
  bolt: "M58 8L22 56h20l-6 36 36-50H52l6-34z",
  ring:
    "M50 12c21 0 38 17 38 38S71 88 50 88 12 71 12 50 29 12 50 12zm0 14c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24z",
  leaf:
    "M80 18c-22 2-38 10-48 24-9 12-11 26-10 40 14 1 28-1 40-10 14-10 22-26 24-48 0-2-2-4-6-6zm-48 40c8 0 14 2 20 8-6-1-12 1-16 5-4 4-6 10-5 16-6-6-8-12-8-20 0-5 4-9 9-9z",
  cube:
    "M50 10l34 18v44L50 90 16 72V28L50 10zm0 13L30 33l20 11 20-11-20-10zm-23 20v20l18 10V53L27 43zm46 0L55 53v20l18-10V43z",
  heart:
    "M50 84C26 66 12 50 12 34c0-12 10-20 20-20 8 0 14 4 18 10 4-6 10-10 18-10 10 0 20 8 20 20 0 16-14 32-38 50z",
  shield:
    "M50 14l28 10v28c0 18-28 36-28 36S22 70 22 52V24l28-10z",
  star: "M50 12l11 23 25 4-18 17 4 25-22-12-22 12 4-25-18-17 25-4z",
  hex: "M30 16h40l15 26-15 26H30L15 42l15-26z",
  diamond: "M50 18l28 32-28 32-28-32 28-32z",
};

const FONT_STACKS: Record<FontStackId, string> = {
  system:
    "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  serif: "Georgia, 'Times New Roman', Times, serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  display: "'Trebuchet MS', 'Lucida Grande', 'Arial Narrow', sans-serif",
};

export function LogoGenerator() {
  const [brand, setBrand] = useState("Brand Name");
  const [tagline, setTagline] = useState("Design system toolkit");
  const [showTagline, setShowTagline] = useState(true);
  const [icon, setIcon] = useState<IconId>("spark");
  const [layout, setLayout] = useState<Layout>("icon-left");
  const [fontStack, setFontStack] = useState<FontStackId>("system");
  const [bgColor, setBgColor] = useState("#0f172a");
  const [transparentBg, setTransparentBg] = useState(false);
  const [iconColor, setIconColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#ffffff");
  const [width, setWidth] = useState(860);
  const [height, setHeight] = useState(320);
  const [cornerRadius, setCornerRadius] = useState(28);
  const [titleSize, setTitleSize] = useState(54);
  const [taglineSize, setTaglineSize] = useState(20);
  const [titleTracking, setTitleTracking] = useState(0.32);
  const [iconScale, setIconScale] = useState(100);
  const [copied, setCopied] = useState(false);

  const logoSvg = useMemo(() => {
    const baseIcon = layout === "icon-top" ? 86 : 92;
    const iconSize = (baseIcon * iconScale) / 100;
    const iconX = layout === "icon-top" ? width / 2 - iconSize / 2 : 54;
    const iconY = layout === "icon-top" ? 40 : height / 2 - iconSize / 2;

    const textX = layout === "icon-top" ? width / 2 : iconX + iconSize + 32;
    const titleY = layout === "icon-top" ? iconY + iconSize + 62 : height / 2 - 8;
    const tagY = titleY + Math.round(titleSize * 0.62);
    const anchor = layout === "icon-top" ? "middle" : "start";
    const subAnchor = anchor;

    const rx = Math.min(cornerRadius, width / 2, height / 2);
    const fontMain = FONT_STACKS[fontStack];

    const titleText = `<text x="${textX}" y="${titleY}" font-family="${escapeAttr(fontMain)}" font-size="${layout === "icon-top" ? titleSize + 4 : titleSize}" font-weight="700" letter-spacing="${titleTracking}em" fill="${textColor}" text-anchor="${anchor}">
    ${escapeXml(brand)}
  </text>`;

    const tagText = showTagline
      ? `<text x="${textX}" y="${tagY}" font-family="${escapeAttr(fontMain)}" font-size="${layout === "icon-top" ? taglineSize + 2 : taglineSize}" font-weight="500" fill="${textColor}" opacity="0.82" text-anchor="${subAnchor}">
    ${escapeXml(tagline)}
  </text>`
      : "";

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${
    transparentBg
      ? ""
      : `<rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" fill="${bgColor}" />`
  }
  <g transform="translate(${iconX}, ${iconY}) scale(${iconSize / 100})">
    <path d="${ICON_PATHS[icon]}" fill="${iconColor}" />
  </g>
  ${titleText}
  ${tagText}
</svg>`;
  }, [
    brand,
    tagline,
    showTagline,
    icon,
    layout,
    fontStack,
    bgColor,
    transparentBg,
    iconColor,
    textColor,
    width,
    height,
    cornerRadius,
    titleSize,
    taglineSize,
    titleTracking,
    iconScale,
  ]);

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`;

  const copySvg = async () => {
    await navigator.clipboard.writeText(logoSvg);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const downloadSvg = () => {
    const blob = new Blob([logoSvg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${slugify(brand) || "logo"}.svg`;
    a.click();
  };

  const downloadPng = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${slugify(brand) || "logo"}.png`;
      a.click();
    };
    img.src = dataUrl;
  };

  const applyPreset = (preset: PresetId) => {
    switch (preset) {
      case "saas-dark":
        setBgColor("#0f172a");
        setTransparentBg(false);
        setIconColor("#ffffff");
        setTextColor("#ffffff");
        setLayout("icon-left");
        setIcon("spark");
        setFontStack("system");
        setCornerRadius(28);
        setTitleSize(54);
        setTaglineSize(20);
        setTitleTracking(0.32);
        setIconScale(100);
        setShowTagline(true);
        break;
      case "soft-light":
        setBgColor("#f8fafc");
        setTransparentBg(false);
        setIconColor("#334155");
        setTextColor("#0f172a");
        setLayout("icon-left");
        setIcon("ring");
        setFontStack("system");
        setCornerRadius(24);
        setTitleSize(52);
        setTaglineSize(20);
        setTitleTracking(0.2);
        setIconScale(100);
        setShowTagline(true);
        break;
      case "neon":
        setBgColor("#09090b");
        setTransparentBg(false);
        setIconColor("#22d3ee");
        setTextColor("#e2e8f0");
        setLayout("icon-top");
        setIcon("bolt");
        setFontStack("display");
        setCornerRadius(20);
        setTitleSize(56);
        setTaglineSize(21);
        setTitleTracking(0.45);
        setIconScale(108);
        setShowTagline(true);
        break;
      case "tech-blue":
        setBgColor("#1e3a8a");
        setTransparentBg(false);
        setIconColor("#93c5fd");
        setTextColor("#f8fafc");
        setLayout("icon-left");
        setIcon("hex");
        setFontStack("mono");
        setCornerRadius(22);
        setTitleSize(52);
        setTaglineSize(18);
        setTitleTracking(0.15);
        setIconScale(96);
        setShowTagline(true);
        break;
      case "minimal-mono":
        setBgColor("#ffffff");
        setTransparentBg(true);
        setIconColor("#171717");
        setTextColor("#171717");
        setLayout("icon-top");
        setIcon("diamond");
        setFontStack("mono");
        setCornerRadius(0);
        setTitleSize(50);
        setTaglineSize(17);
        setTitleTracking(0.55);
        setIconScale(88);
        setShowTagline(true);
        break;
      case "retro-warm":
        setBgColor("#fef3c7");
        setTransparentBg(false);
        setIconColor("#b45309");
        setTextColor("#78350f");
        setLayout("icon-left");
        setIcon("star");
        setFontStack("serif");
        setCornerRadius(32);
        setTitleSize(52);
        setTaglineSize(22);
        setTitleTracking(0.08);
        setIconScale(100);
        setShowTagline(true);
        break;
      case "forest":
        setBgColor("#14532d");
        setTransparentBg(false);
        setIconColor("#4ade80");
        setTextColor("#ecfccb");
        setLayout("icon-left");
        setIcon("leaf");
        setFontStack("system");
        setCornerRadius(26);
        setTitleSize(54);
        setTaglineSize(19);
        setTitleTracking(0.25);
        setIconScale(102);
        setShowTagline(true);
        break;
      case "sunset":
        setBgColor("#431407");
        setTransparentBg(false);
        setIconColor("#fb923c");
        setTextColor("#ffedd5");
        setLayout("icon-top");
        setIcon("heart");
        setFontStack("display");
        setCornerRadius(30);
        setTitleSize(58);
        setTaglineSize(21);
        setTitleTracking(0.28);
        setIconScale(104);
        setShowTagline(true);
        break;
      case "editorial":
        setBgColor("#ffffff");
        setTransparentBg(false);
        setIconColor("#0f172a");
        setTextColor("#0f172a");
        setLayout("icon-left");
        setIcon("cube");
        setFontStack("serif");
        setCornerRadius(12);
        setTitleSize(56);
        setTaglineSize(20);
        setTitleTracking(0.04);
        setIconScale(92);
        setShowTagline(true);
        break;
      case "midnight-gold":
        setBgColor("#0c0a09");
        setTransparentBg(false);
        setIconColor("#facc15");
        setTextColor("#fef9c3");
        setLayout("icon-left");
        setIcon("shield");
        setFontStack("display");
        setCornerRadius(18);
        setTitleSize(53);
        setTaglineSize(19);
        setTitleTracking(0.38);
        setIconScale(100);
        setShowTagline(true);
        break;
      default:
        break;
    }
  };

  const PRESETS: { id: PresetId; label: string }[] = [
    { id: "saas-dark", label: "SaaS Dark" },
    { id: "soft-light", label: "Soft Light" },
    { id: "neon", label: "Neon" },
    { id: "tech-blue", label: "Tech Blue" },
    { id: "minimal-mono", label: "Minimal" },
    { id: "retro-warm", label: "Retro Warm" },
    { id: "forest", label: "Forest" },
    { id: "sunset", label: "Sunset" },
    { id: "editorial", label: "Editorial" },
    { id: "midnight-gold", label: "Midnight Gold" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-zinc-200/90 bg-white p-4 shadow-ds-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Logo preview
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt="Generated logo preview"
            className="max-h-[320px] max-w-full rounded-md border border-zinc-200 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Crect%20width=%2212%22%20height=%2212%22%20fill=%22%23f4f4f5%22/%3E%3Cpath%20d=%22M0%200h6v6H0M6%206h6v6H6%22%20fill=%22%23e4e4e7%22/%3E%3C/svg%3E')] bg-repeat"
          />
        </section>

        <section className="space-y-3">
          <TextField label="Brand name" value={brand} onChange={setBrand} />
          <TextField label="Tagline" value={tagline} onChange={setTagline} />
          <label className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
            <input
              type="checkbox"
              checked={showTagline}
              onChange={(e) => setShowTagline(e.target.checked)}
            />
            Show tagline
          </label>
          <SelectField
            label="Icon"
            value={icon}
            onChange={(v) => setIcon(v as IconId)}
            options={[
              { id: "spark", label: "Spark" },
              { id: "bolt", label: "Bolt" },
              { id: "ring", label: "Ring" },
              { id: "leaf", label: "Leaf" },
              { id: "cube", label: "Cube" },
              { id: "heart", label: "Heart" },
              { id: "shield", label: "Shield" },
              { id: "star", label: "Star" },
              { id: "hex", label: "Hex" },
              { id: "diamond", label: "Diamond" },
            ]}
          />
          <SelectField
            label="Layout"
            value={layout}
            onChange={(v) => setLayout(v as Layout)}
            options={[
              { id: "icon-left", label: "Icon Left" },
              { id: "icon-top", label: "Icon Top" },
            ]}
          />
          <SelectField
            label="Typography"
            value={fontStack}
            onChange={(v) => setFontStack(v as FontStackId)}
            options={[
              { id: "system", label: "System UI" },
              { id: "serif", label: "Serif" },
              { id: "mono", label: "Monospace" },
              { id: "display", label: "Display" },
            ]}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <ColorField label="Background" value={bgColor} onChange={setBgColor} />
            <ColorField label="Icon" value={iconColor} onChange={setIconColor} />
            <ColorField label="Text" value={textColor} onChange={setTextColor} />
          </div>
          <label className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-white p-3 text-sm shadow-ds-sm">
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
            />
            Transparent background
          </label>

          <div className="rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-3 shadow-ds-sm">
            <p className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Style tuning
            </p>
            <div className="space-y-3">
              <RangeField
                label="Corner radius"
                value={cornerRadius}
                onChange={setCornerRadius}
                min={0}
                max={48}
                unit="px"
              />
              <RangeField
                label="Title size"
                value={titleSize}
                onChange={setTitleSize}
                min={28}
                max={72}
                unit="px"
              />
              <RangeField
                label="Tagline size"
                value={taglineSize}
                onChange={setTaglineSize}
                min={12}
                max={28}
                unit="px"
              />
              <RangeField
                label="Letter spacing"
                value={titleTracking}
                onChange={setTitleTracking}
                min={-0.05}
                max={0.85}
                step={0.01}
                unit="em"
                displayRound={2}
              />
              <RangeField
                label="Icon scale"
                value={iconScale}
                onChange={setIconScale}
                min={70}
                max={130}
                unit="%"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Presets
            </p>
            <div className="flex max-h-[148px] flex-wrap gap-2 overflow-y-auto pr-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-50"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <NumField label="Width" value={width} onChange={setWidth} min={320} />
            <NumField label="Height" value={height} onChange={setHeight} min={180} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copySvg}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              {copied ? "Copied!" : "Copy SVG"}
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Download SVG
            </button>
            <button
              type="button"
              onClick={downloadPng}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Download PNG
            </button>
          </div>
        </section>
      </div>

      <section className="border-t border-zinc-200/90 pt-8">
        <pre className="overflow-x-auto rounded-lg border border-zinc-200/90 bg-zinc-950 p-4 text-xs text-zinc-100">
          <code>{logoSvg}</code>
        </pre>
      </section>
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  displayRound,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  displayRound?: number;
}) {
  const shown =
    displayRound !== undefined ? value.toFixed(displayRound) : String(value);
  return (
    <label className="block">
      <span className="flex justify-between text-xs font-medium text-zinc-600">
        <span>{label}</span>
        <span className="font-mono text-zinc-500">
          {shown}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-zinc-900"
      />
    </label>
  );
}

function TextField({
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      />
    </label>
  );
}

function NumField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
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
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      />
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
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-10" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm font-mono"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <label className="block rounded-lg border border-zinc-200/90 bg-white p-3 shadow-ds-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-zinc-200 px-2 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
