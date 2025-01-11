import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/getEnv";
import { CONFLICT } from "../constants/http";
import VerifyCationType from "../constants/verificationCodeType";
import Session from "../models/session.model";
import User from "../models/user.model";
import VerifyCationCode from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date-time";
import jwt from "jsonwebtoken";

type createUserData = {
  email: string;
  password: string;
  userAgent?: string;
};

const createUser = async (data: createUserData) => {
  //check if user is already existing
  const existingUser = await User.exists({ email: data.email });
  appAssert(!existingUser,CONFLICT ,"User already exists",)


  //create a new user
  const user = await User.create({
    email: data.email,
    password: data.password,
    userAgent: data.userAgent || undefined,
  });

  const userId = user._id;

  const verificationCode = await VerifyCationCode.create({
    userId,
    code: "123213",
    type: VerifyCationType.VERIFY_EMAIL,
    expiresAt: oneYearFromNow(),
  });

  //send verification email
  const session = await Session.create({
    userId,
    userAgent: data.userAgent || undefined,
  });

  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
    audience: ["user"],
  });

  const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
    audience: ["user"],
  });

  return {
    user,
    session,
    accessToken,
    refreshToken,
  };
};
export { createUser };
