/**
 * SkillPulse AI/domain foundation.
 *
 * Rule-based services today; swap in an LLM provider later via
 * `AiRecommendationProvider` without changing callers.
 */

export type {
  AiRecommendationProvider,
  LearningPhase,
  LearningResource,
  LearningRoadmap,
  PriorityLevel,
  Proficiency,
  Recommendation,
  RecommendationType,
  SkillGap,
  SkillGapAnalysis,
  SkillGapAnalysisSummary,
  SkillGapInput,
  SkillGapStatus,
  SkillSnapshot,
} from "./types";

export { analyzeSkillGap, getActionableGaps } from "./skill-gap-service";
export {
  RuleBasedRecommendationService,
  buildLearningRoadmap,
  buildRecommendations,
} from "./recommendation-service";
export { SAMPLE_SKILL_GAP_INPUT, runSampleSkillGapAnalysis } from "./mocks";
export {
  CLAIMED_CONFIDENCE_WEIGHT,
  DEFAULT_TARGET_PROFICIENCY,
} from "./constants";
