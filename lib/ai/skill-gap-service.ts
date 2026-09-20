import { DEFAULT_TARGET_PROFICIENCY } from "./constants";
import {
  average,
  effectiveProficiency,
  findSkill,
  gapPriority,
  indexSkills,
  resolveProficiency,
  resolveTargetProficiency,
} from "./skill-utils";
import type {
  SkillGap,
  SkillGapAnalysis,
  SkillGapInput,
  SkillSnapshot,
} from "./types";

function classifyGap(params: {
  claimed?: SkillSnapshot;
  assessed?: SkillSnapshot;
  verified?: SkillSnapshot;
  gap: number;
}): SkillGap["status"] {
  const { claimed, assessed, verified, gap } = params;
  const hasEvidence = Boolean(claimed || assessed || verified);

  if (!hasEvidence) return "missing";
  if (verified && gap === 0) return "verified";
  return "weak";
}

function buildReasons(gap: SkillGap): string[] {
  const reasons: string[] = [];

  if (gap.status === "missing") {
    reasons.push(
      `${gap.skillName} is required for this goal but does not appear in claimed, assessed, or verified skills.`,
    );
    return reasons;
  }

  if (!gap.isVerified && gap.isClaimed) {
    reasons.push(
      `${gap.skillName} is claimed but not verified, so claimed proficiency is discounted.`,
    );
  }

  if (gap.isAssessed && typeof gap.assessedProficiency === "number") {
    reasons.push(
      `Assessment score is ${gap.assessedProficiency} vs a target of ${gap.targetProficiency}.`,
    );
  }

  if (gap.isVerified && typeof gap.verifiedProficiency === "number") {
    if (gap.gap > 0) {
      reasons.push(
        `Verified evidence exists, but proficiency ${gap.verifiedProficiency} is still below the target of ${gap.targetProficiency}.`,
      );
    } else {
      reasons.push(
        `Verified evidence meets the target proficiency of ${gap.targetProficiency}.`,
      );
    }
  }

  if (gap.gap > 0 && gap.status === "weak") {
    reasons.push(`Remaining gap is ${gap.gap} points.`);
  }

  return reasons;
}

export function analyzeSkillGap(input: SkillGapInput): SkillGapAnalysis {
  const claimedIndex = indexSkills(input.claimedSkills);
  const assessedIndex = indexSkills(input.assessedSkills);
  const verifiedIndex = indexSkills(input.verifiedSkills);

  const gaps: SkillGap[] = input.targetSkills.map((target) => {
    const claimed = findSkill(claimedIndex, target);
    const assessed = findSkill(assessedIndex, target);
    const verified = findSkill(verifiedIndex, target);

    const targetProficiency = resolveTargetProficiency(target);
    const claimedProficiency = resolveProficiency(claimed);
    const assessedProficiency = resolveProficiency(assessed);
    const verifiedProficiency = resolveProficiency(verified);

    const effective = effectiveProficiency({
      claimed: claimedProficiency,
      assessed: assessedProficiency,
      verified: verifiedProficiency,
    });
    const gapSize = Math.max(0, targetProficiency - effective);
    const status = classifyGap({ claimed, assessed, verified, gap: gapSize });

    const gap: SkillGap = {
      skillId: target.skillId,
      skillName: target.name,
      category: target.category,
      status,
      targetProficiency,
      claimedProficiency,
      assessedProficiency,
      verifiedProficiency,
      effectiveProficiency: effective,
      gap: gapSize,
      isVerified: Boolean(verified),
      isClaimed: Boolean(claimed),
      isAssessed: Boolean(assessed),
      priority: gapPriority(gapSize, status === "missing"),
      reasons: [],
    };

    gap.reasons = buildReasons(gap);
    return gap;
  });

  const missingSkills = gaps.filter((gap) => gap.status === "missing");
  const weakSkills = gaps.filter((gap) => gap.status === "weak" || (gap.isVerified && gap.gap > 0));
  const verifiedSkills = gaps.filter((gap) => gap.isVerified);
  const readinessScores = gaps.map((gap) =>
    Math.round((gap.effectiveProficiency / (gap.targetProficiency || DEFAULT_TARGET_PROFICIENCY)) * 100),
  );

  return {
    goal: input.goal,
    analyzedAt: new Date().toISOString(),
    gaps,
    missingSkills,
    weakSkills,
    verifiedSkills,
    summary: {
      totalTargetSkills: gaps.length,
      missingCount: missingSkills.length,
      weakCount: weakSkills.length,
      verifiedCount: verifiedSkills.length,
      overallReadiness: Math.min(100, average(readinessScores)),
    },
  };
}

export function getActionableGaps(analysis: SkillGapAnalysis): SkillGap[] {
  return analysis.gaps.filter((gap) => gap.status === "missing" || gap.gap > 0);
}
