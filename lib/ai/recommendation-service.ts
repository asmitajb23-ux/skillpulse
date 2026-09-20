import {
  HOURS_PER_GAP_POINT,
  MAX_RECOMMENDATION_HOURS,
  MIN_RECOMMENDATION_HOURS,
} from "./constants";
import { getActionableGaps } from "./skill-gap-service";
import type {
  AiRecommendationProvider,
  LearningPhase,
  LearningRoadmap,
  LearningResource,
  Recommendation,
  RecommendationType,
  SkillGap,
  SkillGapAnalysis,
} from "./types";

const PRIORITY_RANK = { high: 0, medium: 1, low: 2 } as const;

function estimateHours(gap: SkillGap, type: RecommendationType): number {
  const base = Math.max(gap.gap, type === "verify" || type === "assess" ? 10 : 20);
  const hours = Math.round(base * HOURS_PER_GAP_POINT);
  return Math.min(MAX_RECOMMENDATION_HOURS, Math.max(MIN_RECOMMENDATION_HOURS, hours));
}

function resourcesFor(gap: SkillGap, type: RecommendationType): LearningResource[] {
  if (type === "verify") {
    return [
      {
        title: `Portfolio evidence for ${gap.skillName}`,
        kind: "portfolio",
      },
    ];
  }

  if (type === "assess") {
    return [
      {
        title: `${gap.skillName} skill check`,
        kind: "assessment",
      },
    ];
  }

  if (type === "practice") {
    return [
      {
        title: `Build a focused ${gap.skillName} project`,
        kind: "project",
      },
    ];
  }

  return [
    {
      title: `${gap.skillName} fundamentals`,
      kind: "course",
    },
    {
      title: `${gap.skillName} official docs`,
      kind: "docs",
    },
  ];
}

function recommendationType(gap: SkillGap): RecommendationType {
  if (gap.status === "missing") return "learn";
  if (gap.isClaimed && !gap.isAssessed && !gap.isVerified) return "assess";
  if (gap.isAssessed && !gap.isVerified) return "verify";
  if (gap.gap > 0) return "practice";
  return "verify";
}

function titleFor(gap: SkillGap, type: RecommendationType): string {
  switch (type) {
    case "learn":
      return `Learn ${gap.skillName} from scratch`;
    case "practice":
      return `Strengthen ${gap.skillName} with applied practice`;
    case "assess":
      return `Assess claimed ${gap.skillName} ability`;
    case "verify":
      return `Verify ${gap.skillName} with portfolio evidence`;
  }
}

function rationaleFor(gap: SkillGap, type: RecommendationType): string {
  const detail = gap.reasons[0] ?? `Remaining gap is ${gap.gap} points.`;

  switch (type) {
    case "learn":
      return `${detail} Start with structured learning before projects.`;
    case "practice":
      return `${detail} Practice against the target proficiency of ${gap.targetProficiency}.`;
    case "assess":
      return `${detail} An assessment will replace discounted claimed scores with measured ability.`;
    case "verify":
      return `${detail} Verification raises trust in this skill for employers.`;
  }
}

export function buildRecommendations(analysis: SkillGapAnalysis): Recommendation[] {
  const actionable = getActionableGaps(analysis);

  const recommendations = actionable.map((gap) => {
    const type = recommendationType(gap);
    return {
      id: `rec-${gap.skillId}-${type}`,
      skillId: gap.skillId,
      skillName: gap.skillName,
      type,
      title: titleFor(gap, type),
      rationale: rationaleFor(gap, type),
      priority: gap.priority,
      estimatedHours: estimateHours(gap, type),
      resources: resourcesFor(gap, type),
    } satisfies Recommendation;
  });

  return recommendations.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
}

function phase(
  id: string,
  title: string,
  order: number,
  description: string,
  recommendations: Recommendation[],
): LearningPhase {
  return {
    id,
    title,
    order,
    description,
    focusSkillIds: Array.from(new Set(recommendations.map((item) => item.skillId))),
    estimatedHours: recommendations.reduce((sum, item) => sum + item.estimatedHours, 0),
    recommendations,
  };
}

export function buildLearningRoadmap(analysis: SkillGapAnalysis): LearningRoadmap {
  const recommendations = buildRecommendations(analysis);

  const learn = recommendations.filter((item) => item.type === "learn");
  const assessOrPractice = recommendations.filter(
    (item) => item.type === "assess" || item.type === "practice",
  );
  const verify = recommendations.filter((item) => item.type === "verify");

  const phases = [
    phase(
      "phase-foundations",
      "Close missing skills",
      1,
      "Acquire skills that are required for the goal but currently absent.",
      learn,
    ),
    phase(
      "phase-strengthen",
      "Assess and strengthen weak skills",
      2,
      "Measure claimed ability and close remaining proficiency gaps.",
      assessOrPractice,
    ),
    phase(
      "phase-verify",
      "Verify skills with evidence",
      3,
      "Turn assessed or practiced skills into portfolio-backed proof.",
      verify,
    ),
  ].filter((item) => item.recommendations.length > 0);

  return {
    goal: analysis.goal,
    generatedAt: new Date().toISOString(),
    totalEstimatedHours: recommendations.reduce((sum, item) => sum + item.estimatedHours, 0),
    phases,
    recommendations,
  };
}

export class RuleBasedRecommendationService implements AiRecommendationProvider {
  async recommend(analysis: SkillGapAnalysis): Promise<Recommendation[]> {
    return buildRecommendations(analysis);
  }

  async buildRoadmap(analysis: SkillGapAnalysis): Promise<LearningRoadmap> {
    return buildLearningRoadmap(analysis);
  }
}
