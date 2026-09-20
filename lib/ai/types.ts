/**
 * Domain types for SkillPulse skill-gap analysis, recommendations,
 * and learning roadmaps. These are AI-ready and independent of
 * MongoDB models, auth, and HTTP routes.
 */

export type SkillGapStatus = "missing" | "weak" | "verified";

export type RecommendationType = "learn" | "practice" | "assess" | "verify";

export type PriorityLevel = "high" | "medium" | "low";

/** Normalized 0–100 proficiency. */
export type Proficiency = number;

export interface SkillSnapshot {
  skillId: string;
  name: string;
  category?: string;
  /** 0–100. Omit when the signal only confirms presence. */
  proficiency?: Proficiency;
}

export interface SkillGapInput {
  goal: string;
  targetSkills: SkillSnapshot[];
  claimedSkills: SkillSnapshot[];
  assessedSkills: SkillSnapshot[];
  verifiedSkills: SkillSnapshot[];
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  category?: string;
  status: SkillGapStatus;
  targetProficiency: Proficiency;
  claimedProficiency?: Proficiency;
  assessedProficiency?: Proficiency;
  verifiedProficiency?: Proficiency;
  /**
   * Trust-weighted proficiency used for gap math:
   * verified > assessed > discounted claimed > 0.
   */
  effectiveProficiency: Proficiency;
  /** targetProficiency - effectiveProficiency, floored at 0. */
  gap: number;
  isVerified: boolean;
  isClaimed: boolean;
  isAssessed: boolean;
  priority: PriorityLevel;
  reasons: string[];
}

export interface SkillGapAnalysisSummary {
  totalTargetSkills: number;
  missingCount: number;
  weakCount: number;
  verifiedCount: number;
  overallReadiness: number;
}

export interface SkillGapAnalysis {
  goal: string;
  analyzedAt: string;
  gaps: SkillGap[];
  missingSkills: SkillGap[];
  weakSkills: SkillGap[];
  verifiedSkills: SkillGap[];
  summary: SkillGapAnalysisSummary;
}

export interface LearningResource {
  title: string;
  kind: "course" | "docs" | "project" | "assessment" | "portfolio";
  url?: string;
}

export interface Recommendation {
  id: string;
  skillId: string;
  skillName: string;
  type: RecommendationType;
  title: string;
  rationale: string;
  priority: PriorityLevel;
  estimatedHours: number;
  resources: LearningResource[];
}

export interface LearningPhase {
  id: string;
  title: string;
  order: number;
  description: string;
  focusSkillIds: string[];
  estimatedHours: number;
  recommendations: Recommendation[];
}

export interface LearningRoadmap {
  goal: string;
  generatedAt: string;
  totalEstimatedHours: number;
  phases: LearningPhase[];
  recommendations: Recommendation[];
}

/**
 * Future LLM / provider hook. Rule-based services implement this
 * so an external AI client can be swapped in without changing callers.
 */
export interface AiRecommendationProvider {
  recommend(analysis: SkillGapAnalysis): Promise<Recommendation[]>;
  buildRoadmap(analysis: SkillGapAnalysis): Promise<LearningRoadmap>;
}
