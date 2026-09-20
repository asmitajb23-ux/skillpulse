import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const ARTIFACT_VERIFICATION_STATUSES = [
  "unverified",
  "pending",
  "verified",
  "rejected",
  "needs_review",
] as const;
export type ArtifactVerificationStatus =
  (typeof ARTIFACT_VERIFICATION_STATUSES)[number];

const ProjectSchema = new Schema(
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
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      trim: true,
    },
    repoUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    mediaUrls: {
      type: [String],
      default: undefined,
    },
    skillIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      required: true,
      validate: {
        validator: (value: unknown[]) => Array.isArray(value) && value.length >= 1,
        message: "At least one skill is required",
      },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isOngoing: {
      type: Boolean,
      required: true,
      default: false,
    },
    highlights: {
      type: [String],
      default: undefined,
    },
    techNotes: {
      type: String,
    },
    verificationStatus: {
      type: String,
      enum: ARTIFACT_VERIFICATION_STATUSES,
      required: true,
      default: "unverified",
    },
    lastVerifiedAt: {
      type: Date,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

ProjectSchema.index({ studentProfileId: 1, createdAt: -1 });
ProjectSchema.index({ userId: 1 });
ProjectSchema.index({ skillIds: 1 });
ProjectSchema.index({ verificationStatus: 1, studentProfileId: 1 });

export type Project = InferSchemaType<typeof ProjectSchema>;

const ProjectModel: Model<Project> =
  (mongoose.models.Project as Model<Project>) ||
  mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;
