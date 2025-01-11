import mongoose, { Document, Schema } from "mongoose";
import { thirtyDaysFromNow } from "../utils/date-time";

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userAgent: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: thirtyDaysFromNow,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;
