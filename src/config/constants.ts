// Animation constants
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.9,
} as const;

export const ANIMATION_DELAYS = {
  SMALL: 0.05,
  MEDIUM: 0.1,
  LARGE: 0.15,
} as const;

// Breakpoint constants
export const BREAKPOINTS = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

// Spacing constants
export const SPACING = {
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
  XXL: 6,
  XXXL: 8,
  HUGE: 10,
  MASSIVE: 12,
} as const;

// Border radius constants
export const BORDER_RADIUS = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  XLARGE: 4,
} as const;

// Z-index constants
export const Z_INDEX = {
  BASE: 0,
  CONTENT: 1,
  OVERLAY: 10,
  MODAL: 100,
  TOOLTIP: 1000,
} as const;
