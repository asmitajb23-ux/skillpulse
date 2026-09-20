import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { SKILL_PROFICIENCY_LEVELS } from "./StudentProfile";

export const SKILL_ASSESSMENT_TYPES = [
  "quiz",
  "coding",
  "ai_interview",
  "project_review",
] as const;
export type SkillAssessmentType = (typeof SKILL_ASSESSMENT_TYPES)[number];

export const SKILL_ASSESSMENT_STATUSES = [
  "in_progress",
  "completed",
  "abandoned",
  "expired",
] as const;
export type SkillAssessmentStatus = (typeof SKILL_ASSESSMENT_STATUSES)[number];

const AssessmentQuestionSchema = new Schema(
  {
    prompt: { type: String, required: true },
    choices: { type: [String], default: undefined },
    correctKey: { type: String },
    studentAnswer: { type: String },
    isCorrect: { type: Boolean },
    score: { type: Number },
  },
  { _id: false }
);

const SkillAssessmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentProfileId: {
      type: Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    skillId: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    relatedSkillIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      default: undefined,
    },
    type: {
      type: String,
      enum: SKILL_ASSESSMENT_TYPES,
      required: true,
    },
    status: {
      type: String,
      enum: SKILL_ASSESSMENT_STATUSES,
      required: true,
    },
    questions: {
      type: [AssessmentQuestionSchema],
      default: undefined,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    maxScore: {
      type: Number,
    },
    proficiencyResult: {
      type: String,
      enum: SKILL_PROFICIENCY_LEVELS,
    },
    feedback: {
      type: String,
    },
    gapNotes: {
      type: [String],
      default: undefined,
    },
    evidenceProjectIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      default: undefined,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

SkillAssessmentSchema.index({ studentProfileId: 1, skillId: 1, createdAt: -1 });
SkillAssessmentSchema.index({ userId: 1, createdAt: -1 });
SkillAssessmentSchema.index({ status: 1, createdAt: 1 });
SkillAssessmentSchema.index({ skillId: 1, proficiencyResult: 1 });

export type SkillAssessment = InferSchemaType<typeof SkillAssessmentSchema>;

const SkillAssessmentModel: Model<SkillAssessment> =
  (mongoose.models.SkillAssessment as Model<SkillAssessment>) ||
  mongoose.model<SkillAssessment>("SkillAssessment", SkillAssessmentSchema);

export default SkillAssessmentModel;
