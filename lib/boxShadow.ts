export type BoxShadowState = {
  inset: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  /** 0–100 */
  opacity: number;
};

export function defaultBoxShadowState(): BoxShadowState {
  return {
    inset: false,
    offsetX: 0,
    offsetY: 8,
    blur: 24,
    spread: -4,
    color: "#18181b",
    opacity: 12,
  };
}

function normalizeHex6(hex: string): string {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]+$/.test(h)) {
    return "18181b";
  }
  return h;
}

/** CSS color string (rgba) for the shadow */
export function buildShadowColor(hex: string, opacityPct: number): string {
  const h = normalizeHex6(hex);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = Math.min(100, Math.max(0, Math.round(opacityPct))) / 100;
  const aStr = a.toFixed(3).replace(/\.?0+$/, "");
  return `rgba(${r}, ${g}, ${b}, ${aStr || "0"})`;
}

/** Single box-shadow layer value (no property name) */
export function buildBoxShadowValue(state: BoxShadowState): string {
  const color = buildShadowColor(state.color, state.opacity);
  const parts = [
    state.inset ? "inset" : null,
    `${state.offsetX}px`,
    `${state.offsetY}px`,
    `${state.blur}px`,
    `${state.spread}px`,
    color,
  ].filter(Boolean);
  return parts.join(" ");
}

export function buildBoxShadowCSSDeclaration(state: BoxShadowState): string {
  return `box-shadow: ${buildBoxShadowValue(state)};`;
}

export function randomBoxShadowState(): BoxShadowState {
  const rand = (min: number, max: number) =>
    Math.round(min + Math.random() * (max - min));
  return {
    inset: Math.random() < 0.2,
    offsetX: rand(-20, 24),
    offsetY: rand(4, 36),
    blur: rand(4, 48),
    spread: rand(-8, 16),
    color: `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`,
    opacity: rand(8, 45),
  };
}

export const BOX_SHADOW_PRESETS: BoxShadowState[] = [
  {
    inset: false,
    offsetX: 0,
    offsetY: 4,
    blur: 14,
    spread: -2,
    color: "#18181b",
    opacity: 8,
  },
  {
    inset: false,
    offsetX: 0,
    offsetY: 12,
    blur: 32,
    spread: -8,
    color: "#18181b",
    opacity: 14,
  },
  {
    inset: true,
    offsetX: 0,
    offsetY: 2,
    blur: 8,
    spread: 0,
    color: "#18181b",
    opacity: 18,
  },
  {
    inset: false,
    offsetX: 8,
    offsetY: 8,
    blur: 0,
    spread: 0,
    color: "#18181b",
    opacity: 22,
  },
  {
    inset: false,
    offsetX: 0,
    offsetY: 24,
    blur: 48,
    spread: -12,
    color: "#4338ca",
    opacity: 20,
  },
];
