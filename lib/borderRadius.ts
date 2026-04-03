export type BorderRadiusCorners = {
  tl: number;
  tr: number;
  br: number;
  bl: number;
};

export type BorderRadiusState = {
  /** One slider drives all corners */
  linked: boolean;
  corners: BorderRadiusCorners;
};

export function defaultBorderRadiusState(): BorderRadiusState {
  return {
    linked: true,
    corners: { tl: 12, tr: 12, br: 12, bl: 12 },
  };
}

export function buildBorderRadiusValue(state: BorderRadiusState): string {
  const { tl, tr, br, bl } = state.corners;
  if (tl === tr && tr === br && br === bl) {
    return `${tl}px`;
  }
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}

export function buildBorderRadiusCSSDeclaration(
  state: BorderRadiusState
): string {
  return `border-radius: ${buildBorderRadiusValue(state)};`;
}

export function randomBorderRadiusState(): BorderRadiusState {
  const rand = (min: number, max: number) =>
    Math.round(min + Math.random() * (max - min));
  const linked = Math.random() < 0.35;
  if (linked) {
    const v = rand(0, 160);
    return {
      linked: true,
      corners: { tl: v, tr: v, br: v, bl: v },
    };
  }
  return {
    linked: false,
    corners: {
      tl: rand(0, 120),
      tr: rand(0, 120),
      br: rand(0, 120),
      bl: rand(0, 120),
    },
  };
}

export const BORDER_RADIUS_PRESETS: BorderRadiusState[] = [
  {
    linked: true,
    corners: { tl: 0, tr: 0, br: 0, bl: 0 },
  },
  {
    linked: true,
    corners: { tl: 8, tr: 8, br: 8, bl: 8 },
  },
  {
    linked: true,
    corners: { tl: 16, tr: 16, br: 16, bl: 16 },
  },
  {
    linked: true,
    corners: { tl: 160, tr: 160, br: 160, bl: 160 },
  },
  {
    linked: false,
    corners: { tl: 24, tr: 8, br: 24, bl: 8 },
  },
];
