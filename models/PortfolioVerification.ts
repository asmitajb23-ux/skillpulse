import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const PORTFOLIO_VERIFICATION_STATUSES = [
  "queued",
  "running",
  "completed",
  "failed",
  "needs_review",
] as const;
export type PortfolioVerificationStatus =
  (typeof PORTFOLIO_VERIFICATION_STATUSES)[number];

export const PORTFOLIO_VERIFICATION_TRIGGERS = [
  "manual",
  "onboarding",
  "profile_update",
  "scheduled",
] as const;
export type PortfolioVerificationTrigger =
  (typeof PORTFOLIO_VERIFICATION_TRIGGERS)[number];

export const TRUST_LEVELS = ["low", "medium", "high"] as const;
export type TrustLevel = (typeof TRUST_LEVELS)[number];

export const VERIFICATION_CHECK_TYPES = [
  "github_repo",
  "live_url",
  "certificate_issuer",
  "skill_claim",
  "resume_consistency",
  "plagiarism",
  "other",
] as const;
export type VerificationCheckType = (typeof VERIFICATION_CHECK_TYPES)[number];

export const VERIFICATION_TARGET_TYPES = [
  "project",
  "certificate",
  "profile",
  "skill",
] as const;
export type VerificationTargetType = (typeof VERIFICATION_TARGET_TYPES)[number];

const VerificationCheckSchema = new Schema(
  {
    type: {
      type: String,
      enum: VERIFICATION_CHECK_TYPES,
      required: true,
    },
    targetType: {
      type: String,
      enum: VERIFICATION_TARGET_TYPES,
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    score: {
      type: Number,
    },
    message: {
      type: String,
    },
    evidence: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const PortfolioVerificationSchema = new Schema(
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
    status: {
      type: String,
      enum: PORTFOLIO_VERIFICATION_STATUSES,
      required: true,
    },
    trigger: {
      type: String,
      enum: PORTFOLIO_VERIFICATION_TRIGGERS,
      required: true,
    },
    projectIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Project" }],
      default: undefined,
    },
    certificateIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Certificate" }],
      default: undefined,
    },
    checks: {
      type: [VerificationCheckSchema],
      required: true,
      default: [],
    },
    overallScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    trustLevel: {
      type: String,
      enum: TRUST_LEVELS,
    },
    summary: {
      type: String,
    },
    verifiedSkillIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      default: undefined,
    },
    flaggedSkillIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      default: undefined,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewerNotes: {
      type: String,
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    errorMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

PortfolioVerificationSchema.index({ studentProfileId: 1, createdAt: -1 });
PortfolioVerificationSchema.index({ studentProfileId: 1, status: 1 });
PortfolioVerificationSchema.index({ status: 1, createdAt: 1 });
PortfolioVerificationSchema.index({ userId: 1 });

export type PortfolioVerification = InferSchemaType<
  typeof PortfolioVerificationSchema
>;

const PortfolioVerificationModel: Model<PortfolioVerification> =
  (mongoose.models.PortfolioVerification as Model<PortfolioVerification>) ||
  mongoose.model<PortfolioVerification>(
    "PortfolioVerification",
    PortfolioVerificationSchema
  );

export default PortfolioVerificationModel;
