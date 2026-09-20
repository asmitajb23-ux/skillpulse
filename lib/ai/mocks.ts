import { analyzeSkillGap } from "./skill-gap-service";
import { buildLearningRoadmap, buildRecommendations } from "./recommendation-service";
import type { SkillGapInput } from "./types";

/**
 * Sample candidate targeting a frontend engineer role.
 * Mixes missing, weak/claimed, assessed, and verified skills.
 */
export const SAMPLE_SKILL_GAP_INPUT: SkillGapInput = {
  goal: "Frontend Engineer",
  targetSkills: [
    { skillId: "html", name: "HTML", category: "frontend", proficiency: 90 },
    { skillId: "css", name: "CSS", category: "frontend", proficiency: 85 },
    { skillId: "javascript", name: "JavaScript", category: "frontend", proficiency: 85 },
    { skillId: "typescript", name: "TypeScript", category: "frontend", proficiency: 80 },
    { skillId: "react", name: "React", category: "frontend", proficiency: 85 },
    { skillId: "nextjs", name: "Next.js", category: "frontend", proficiency: 80 },
    { skillId: "testing", name: "Frontend Testing", category: "quality", proficiency: 70 },
    { skillId: "accessibility", name: "Accessibility", category: "frontend", proficiency: 75 },
  ],
  claimedSkills: [
    { skillId: "html", name: "HTML", proficiency: 90 },
    { skillId: "css", name: "CSS", proficiency: 80 },
    { skillId: "javascript", name: "JavaScript", proficiency: 75 },
    { skillId: "react", name: "React", proficiency: 70 },
    { skillId: "testing", name: "Frontend Testing", proficiency: 40 },
  ],
  assessedSkills: [
    { skillId: "javascript", name: "JavaScript", proficiency: 62 },
    { skillId: "react", name: "React", proficiency: 55 },
    { skillId: "css", name: "CSS", proficiency: 78 },
  ],
  verifiedSkills: [
    { skillId: "html", name: "HTML", proficiency: 92 },
    { skillId: "css", name: "CSS", proficiency: 80 },
  ],
};

export function runSampleSkillGapAnalysis() {
  const analysis = analyzeSkillGap(SAMPLE_SKILL_GAP_INPUT);
  const recommendations = buildRecommendations(analysis);
  const roadmap = buildLearningRoadmap(analysis);

  return { analysis, recommendations, roadmap };
}
