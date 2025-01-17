import mongoose, { Document, Schema } from "mongoose";
import VerifyCationType from "../constants/verificationCodeType";

interface VerifyCationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerifyCationType;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VerifyCationCodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VerifyCationCode = mongoose.model<VerifyCationCodeDocument>(
  "VerifyCationCode",
  VerifyCationCodeSchema,
  "verifyCation_codes"
);

export default VerifyCationCode;
