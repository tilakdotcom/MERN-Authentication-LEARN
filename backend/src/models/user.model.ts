import mongoose, { Document, Schema } from "mongoose";
import { passwordCompare, passwordHasher } from "../utils/bcrypt";

export interface userDocument extends Document {
  email: string;
  password: string;
  emailVerified: boolean;
  userAgent?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<userDocument>(
  {
    email: {
      type: "string",
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: "string",
      required: true,
    },
    userAgent: {
      type: "string",
    },
    emailVerified: {
      type: "boolean",
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await passwordHasher(this.password);
  next();
});

userSchema.methods.comparePassword = async function (pass: string) {
  return await passwordCompare( pass, this.password);
};

const User = mongoose.model<userDocument>("User", userSchema);

export default User;
