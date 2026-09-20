import {
  CLAIMED_CONFIDENCE_WEIGHT,
  DEFAULT_PRESENCE_PROFICIENCY,
  DEFAULT_TARGET_PROFICIENCY,
  HIGH_GAP_THRESHOLD,
  MEDIUM_GAP_THRESHOLD,
  PROFICIENCY_MAX,
  PROFICIENCY_MIN,
} from "./constants";
import type { PriorityLevel, Proficiency, SkillSnapshot } from "./types";

export function clampProficiency(value: number): Proficiency {
  return Math.min(PROFICIENCY_MAX, Math.max(PROFICIENCY_MIN, Math.round(value)));
}

export function normalizeSkillKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function snapshotKey(skill: SkillSnapshot): string {
  const id = normalizeSkillKey(skill.skillId);
  if (id) return `id:${id}`;
  return `name:${normalizeSkillKey(skill.name)}`;
}

export function indexSkills(skills: SkillSnapshot[]): Map<string, SkillSnapshot> {
  const index = new Map<string, SkillSnapshot>();

  for (const skill of skills) {
    index.set(snapshotKey(skill), skill);
    index.set(`name:${normalizeSkillKey(skill.name)}`, skill);
    if (skill.skillId) {
      index.set(`id:${normalizeSkillKey(skill.skillId)}`, skill);
    }
  }

  return index;
}

export function findSkill(
  index: Map<string, SkillSnapshot>,
  skill: SkillSnapshot,
): SkillSnapshot | undefined {
  return (
    index.get(`id:${normalizeSkillKey(skill.skillId)}`) ??
    index.get(`name:${normalizeSkillKey(skill.name)}`)
  );
}

export function resolveProficiency(
  skill: SkillSnapshot | undefined,
  fallbackWhenPresent: number = DEFAULT_PRESENCE_PROFICIENCY,
): Proficiency | undefined {
  if (!skill) return undefined;
  if (typeof skill.proficiency === "number") {
    return clampProficiency(skill.proficiency);
  }
  return clampProficiency(fallbackWhenPresent);
}

export function resolveTargetProficiency(skill: SkillSnapshot): Proficiency {
  return resolveProficiency(skill, DEFAULT_TARGET_PROFICIENCY) ?? DEFAULT_TARGET_PROFICIENCY;
}

export function effectiveProficiency(input: {
  claimed?: Proficiency;
  assessed?: Proficiency;
  verified?: Proficiency;
}): Proficiency {
  if (typeof input.verified === "number") {
    return clampProficiency(input.verified);
  }
  if (typeof input.assessed === "number") {
    return clampProficiency(input.assessed);
  }
  if (typeof input.claimed === "number") {
    return clampProficiency(input.claimed * CLAIMED_CONFIDENCE_WEIGHT);
  }
  return 0;
}

export function gapPriority(gap: number, isMissing: boolean): PriorityLevel {
  if (isMissing || gap >= HIGH_GAP_THRESHOLD) return "high";
  if (gap >= MEDIUM_GAP_THRESHOLD) return "medium";
  return "low";
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
