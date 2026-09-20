export const PROFICIENCY_MIN = 0;
export const PROFICIENCY_MAX = 100;

/** Default target level when a target skill omits proficiency. */
export const DEFAULT_TARGET_PROFICIENCY = 80;

/** Claimed (unverified) skills are discounted until assessed or verified. */
export const CLAIMED_CONFIDENCE_WEIGHT = 0.7;

/** Default proficiency when a snapshot only confirms presence. */
export const DEFAULT_PRESENCE_PROFICIENCY = 50;

/** Gap sizes used to assign high / medium / low priority. */
export const HIGH_GAP_THRESHOLD = 40;
export const MEDIUM_GAP_THRESHOLD = 15;

export const HOURS_PER_GAP_POINT = 0.4;
export const MIN_RECOMMENDATION_HOURS = 4;
export const MAX_RECOMMENDATION_HOURS = 40;
