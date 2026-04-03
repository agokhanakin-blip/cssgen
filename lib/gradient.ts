export type GradientType = "linear" | "radial";

export type GradientStop = {
  color: string;
};

export type GradientState = {
  type: GradientType;
  /** Degrees, used when type === "linear" */
  angle: number;
  stops: GradientStop[];
};

export const GRADIENT_MIN_STOPS = 2;
export const GRADIENT_MAX_STOPS = 5;

export function defaultGradientState(): GradientState {
  return {
    type: "linear",
    angle: 90,
    stops: [{ color: "#6366f1" }, { color: "#ec4899" }],
  };
}

/** Evenly distributed color stops for CSS */
export function formatStopList(stops: GradientStop[]): string {
  const n = stops.length;
  if (n === 0) return "transparent";
  if (n === 1) return stops[0].color;
  return stops
    .map((s, i) => {
      const pct = Math.round((i / (n - 1)) * 100);
      return `${s.color} ${pct}%`;
    })
    .join(", ");
}

/** Value for `background` / `background-image` */
export function buildBackgroundValue(state: GradientState): string {
  const list = formatStopList(state.stops);
  if (state.type === "linear") {
    return `linear-gradient(${state.angle}deg, ${list})`;
  }
  return `radial-gradient(circle, ${list})`;
}

/** Single-line declaration for copy */
export function buildGradientCSSDeclaration(state: GradientState): string {
  return `background: ${buildBackgroundValue(state)};`;
}

function randomHex(): string {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
}

export function randomGradientState(): GradientState {
  const count =
    GRADIENT_MIN_STOPS +
    Math.floor(
      Math.random() * (GRADIENT_MAX_STOPS - GRADIENT_MIN_STOPS + 1)
    );
  const stops = Array.from({ length: count }, () => ({
    color: randomHex(),
  }));
  return {
    type: Math.random() < 0.55 ? "linear" : "radial",
    angle: Math.floor(Math.random() * 361),
    stops,
  };
}

export const GRADIENT_PRESETS: GradientState[] = [
  {
    type: "linear",
    angle: 120,
    stops: [{ color: "#f093fb" }, { color: "#f5576c" }],
  },
  {
    type: "linear",
    angle: 45,
    stops: [{ color: "#4facfe" }, { color: "#00f2fe" }],
  },
  {
    type: "radial",
    angle: 0,
    stops: [{ color: "#0f0c29" }, { color: "#302b63" }, { color: "#24243e" }],
  },
  {
    type: "linear",
    angle: 180,
    stops: [
      { color: "#ffecd2" },
      { color: "#fcb69f" },
      { color: "#ff9a9e" },
    ],
  },
  {
    type: "linear",
    angle: 270,
    stops: [{ color: "#11998e" }, { color: "#38ef7d" }],
  },
];
