import mongoose, { Document, Schema } from "mongoose";
import { passwordCompare, passwordHasher } from "../utils/bcrypt";

export interface userDocument extends Document {
  email: string;
  password: string;
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
      select: false,
    },
    userAgent: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await passwordHasher(this.password);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await passwordCompare(password, this.password);
};

const User = mongoose.model<userDocument>("User", userSchema);

export default User;
