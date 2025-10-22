export const CERTAINTY_LEVELS = {
  VERY: "very",
  MODERATE: "moderate",
  UNCERTAIN: "uncertain",
};

export const CERTAINTY_CONFIG = {
  [CERTAINTY_LEVELS.VERY]: {
    label: "Very certain",
    color: "text-green-500 fill-green-500/20",
    borderColor: "border-green-300 border-2",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
  },
  [CERTAINTY_LEVELS.MODERATE]: {
    label: "Moderately certain",
    color: "text-yellow-500 fill-yellow-500/20",
    borderColor: "border-yellow-300 border-2",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  [CERTAINTY_LEVELS.UNCERTAIN]: {
    label: "Uncertain",
    color: "text-red-500 fill-red-500/20",
    borderColor: "border-red-300 border-2",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
  },
};

// Pure utility functions
export const getCertaintyLabel = (certainty) => {
  return CERTAINTY_CONFIG[certainty]?.label || "Unknown";
};

export const getCertaintyColor = (certainty) => {
  return CERTAINTY_CONFIG[certainty]?.badgeColor || "bg-gray-100 text-gray-800 border-gray-200";
};

export const getCertaintyBorderColor = (certainty) => {
  return CERTAINTY_CONFIG[certainty]?.borderColor || "border-gray-300";
};

export const getCertaintyIconColor = (certainty) => {
  return CERTAINTY_CONFIG[certainty]?.color || "text-gray-500";
};
