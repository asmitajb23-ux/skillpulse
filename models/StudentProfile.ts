import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const SKILL_PROFICIENCY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
export type SkillProficiency = (typeof SKILL_PROFICIENCY_LEVELS)[number];

export const CLAIMED_SKILL_SOURCES = [
  "self",
  "project",
  "certificate",
  "assessment",
] as const;
export type ClaimedSkillSource = (typeof CLAIMED_SKILL_SOURCES)[number];

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, trim: true },
    field: { type: String, trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
  },
  { _id: false }
);

const ClaimedSkillSchema = new Schema(
  {
    skillId: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    proficiency: {
      type: String,
      enum: SKILL_PROFICIENCY_LEVELS,
      required: true,
    },
    yearsExperience: {
      type: Number,
    },
    source: {
      type: String,
      enum: CLAIMED_SKILL_SOURCES,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { _id: false }
);

const StudentProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
    },
    university: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    major: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    education: {
      type: [EducationSchema],
      default: undefined,
    },
    location: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    githubUsername: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
    },
    targetRoles: {
      type: [String],
      default: undefined,
    },
    targetSkills: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      default: undefined,
    },
    claimedSkills: {
      type: [ClaimedSkillSchema],
      default: undefined,
    },
    completenessScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

StudentProfileSchema.index({ university: 1 });
StudentProfileSchema.index({ "claimedSkills.skillId": 1 });
StudentProfileSchema.index({ targetRoles: 1 });
StudentProfileSchema.index(
  { githubUsername: 1 },
  { unique: true, sparse: true }
);

export type StudentProfile = InferSchemaType<typeof StudentProfileSchema>;

const StudentProfileModel: Model<StudentProfile> =
  (mongoose.models.StudentProfile as Model<StudentProfile>) ||
  mongoose.model<StudentProfile>("StudentProfile", StudentProfileSchema);

export default StudentProfileModel;
