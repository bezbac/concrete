const COLORS = {
  neutral: {
    "75": "#131313",
    "125": "#202020",
    "150": "#262626",
    "190": "#313031",
    "310": "#4f4e4f",
    "380": "#586069",
    "620": "#959da5",
    "840": "#d1d5da",
    "1000": "#fff",
  },
  syntax: {
    string: "#9ecbff",
    keyword: "#D76496",
    entity: "#b392f0",
    regexp: "#85e89d",
    deleted: "#f97583",
    comment: "#6a737d",
    variable: "#f1993b",
    support: "#4091c9",
    punctuation: "#F9D849",
  },
  semantic: {
    error: "#e54468",

    deletedResource: "#d73a49",
    addedResource: "#85e89d",
    untrackedResource: "#f692ce",
    conflictingResource: "#b392f0",
    modifiedResource: "#f1993b",
    ignoredResource: "#6a737d",

    lintError: "#F32E2E",
    lintWarning: "#FFA826",
    lintInfo: "#4091c9",
  },
  gutter: {
    deleted: "#d73a49",
    modified: "#f1993b",
    added: "#28a745",
  },
  background: {
    debugToolBar: "#2b3036",

    deleted: "#86181d",
    modified: "#c24e00",
    added: "#144620",

    badge: "#1d5bc9",

    matchHighlight: "#ffd33d33",
    findMatch: "#ffd33d44",
    findMatchHighlight: "#ffd33d22",

    selection: "#3392FF44",
    activeSelection: "#1d5bc9",
    inactiveSelection: "#3392FF22",

    addedDiff: "#28a74530",
    removedDiff: "#d73a4930",

    scrollbar: {
      base: "#6a737d33",
      hover: "#6a737d44",
      active: "#6a737d88",
    },
  },
  accent: "#4091c9",
  transparent: "#00000000",
};

const EXTENDED_COLORS = {
  ...COLORS,
  ansi: {
    normal: {
      white: COLORS.neutral[840],
      black: COLORS.neutral[190],
      blue: COLORS.syntax.support,
      cyan: COLORS.syntax.string,
      green: COLORS.syntax.regexp,
      red: COLORS.syntax.deleted,
      magenta: COLORS.syntax.entity,
      yellow: COLORS.syntax.variable,
    },
    bright: {
      white: COLORS.neutral[1000],
      black: COLORS.neutral[310],
      blue: COLORS.syntax.support,
      cyan: COLORS.syntax.string,
      green: COLORS.syntax.regexp,
      red: COLORS.syntax.deleted,
      magenta: COLORS.syntax.entity,
      yellow: COLORS.syntax.variable,
    },
  },
};

export type Colors = typeof EXTENDED_COLORS;
export default EXTENDED_COLORS;
