import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const SKILL_CATEGORIES = [
  "language",
  "framework",
  "tool",
  "cloud",
  "database",
  "soft",
  "domain",
  "other",
] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: SKILL_CATEGORIES,
      required: true,
    },
    aliases: {
      type: [String],
      default: undefined,
    },
    description: {
      type: String,
    },
    parentSkillId: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

SkillSchema.index({ category: 1, isActive: 1 });
SkillSchema.index({ aliases: 1 });
SkillSchema.index({ name: "text", aliases: "text", description: "text" });

export type Skill = InferSchemaType<typeof SkillSchema>;

const SkillModel: Model<Skill> =
  (mongoose.models.Skill as Model<Skill>) ||
  mongoose.model<Skill>("Skill", SkillSchema);

export default SkillModel;
