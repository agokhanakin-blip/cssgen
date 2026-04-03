export type PaletteScheme =
  | "monochrome"
  | "analogous"
  | "complementary"
  | "triadic";

export type PaletteState = {
  baseHex: string;
  scheme: PaletteScheme;
};

export const PALETTE_SCHEMES: { id: PaletteScheme; label: string }[] = [
  { id: "monochrome", label: "Monochrome" },
  { id: "analogous", label: "Analogous" },
  { id: "complementary", label: "Complementary" },
  { id: "triadic", label: "Triadic" },
];

export function defaultPaletteState(): PaletteState {
  return {
    baseHex: "#6366f1",
    scheme: "analogous",
  };
}

export function normalizeHex6(hex: string): string | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6 || !/^[0-9a-fA-F]+$/.test(h)) return null;
  return `#${h.toLowerCase()}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const n = normalizeHex6(hex);
  if (!n) return null;
  const h = n.slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  const H = ((h % 360) + 360) % 360;
  const S = Math.min(100, Math.max(0, s)) / 100;
  const L = Math.min(100, Math.max(0, l)) / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (H < 60) {
    rp = c;
    gp = x;
  } else if (H < 120) {
    rp = x;
    gp = c;
  } else if (H < 180) {
    gp = c;
    bp = x;
  } else if (H < 240) {
    gp = x;
    bp = c;
  } else if (H < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

const FALLBACK = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#e9d5ff"];

export function generatePalette(
  baseHex: string,
  scheme: PaletteScheme
): string[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [...FALLBACK];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const h = hsl.h;
  const s = Math.min(100, Math.max(18, hsl.s));
  const l = Math.min(90, Math.max(14, hsl.l));

  const toHex = (hh: number, ss: number, ll: number) => {
    const { r, g, b } = hslToRgb(wrapHue(hh), ss, ll);
    return rgbToHex(r, g, b);
  };

  switch (scheme) {
    case "monochrome": {
      const lights = [22, 36, 52, 68, 84];
      return lights.map((li) => toHex(h, s, li));
    }
    case "analogous": {
      return [-34, -17, 0, 17, 34].map((d) => toHex(h + d, s, l));
    }
    case "complementary": {
      const hc = h + 180;
      return [
        toHex(h, s, l),
        toHex(h, Math.max(22, s - 12), Math.min(86, l + 16)),
        toHex(hc, s, l),
        toHex(hc, Math.max(22, s - 12), Math.min(86, l + 14)),
        toHex(h + 90, s * 0.62, (l + 52) / 2),
      ];
    }
    case "triadic": {
      const h2 = h + 120;
      const h3 = h + 240;
      return [
        toHex(h, s, l),
        toHex(h2, s, l),
        toHex(h3, s, l),
        toHex(h2, s * 0.58, Math.min(86, l + 18)),
        toHex(h3, s * 0.58, Math.min(86, l + 18)),
      ];
    }
    default:
      return [...FALLBACK];
  }
}

export function buildPaletteCSSVariables(colors: string[]): string {
  const lines = colors.map(
    (c, i) => `  --palette-${i + 1}: ${normalizeHex6(c) ?? c};`
  );
  return `:root {\n${lines.join("\n")}\n}`;
}

export function randomBaseHex(): string {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
}

export const PALETTE_BASE_PRESETS = [
  "#6366f1",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#0ea5e9",
] as const;
