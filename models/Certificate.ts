import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const ARTIFACT_VERIFICATION_STATUSES = [
  "unverified",
  "pending",
  "verified",
  "rejected",
  "needs_review",
] as const;

const CertificateSchema = new Schema(
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
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    credentialId: {
      type: String,
      trim: true,
    },
    credentialUrl: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    issueDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    skillIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
      default: undefined,
    },
    verificationStatus: {
      type: String,
      enum: ARTIFACT_VERIFICATION_STATUSES,
      required: true,
      default: "unverified",
    },
    issuerVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastVerifiedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

CertificateSchema.index({ studentProfileId: 1, issueDate: -1 });
CertificateSchema.index({ userId: 1 });
CertificateSchema.index(
  { issuer: 1, credentialId: 1 },
  { sparse: true }
);
CertificateSchema.index({ verificationStatus: 1 });

export type Certificate = InferSchemaType<typeof CertificateSchema>;

const CertificateModel: Model<Certificate> =
  (mongoose.models.Certificate as Model<Certificate>) ||
  mongoose.model<Certificate>("Certificate", CertificateSchema);

export default CertificateModel;
