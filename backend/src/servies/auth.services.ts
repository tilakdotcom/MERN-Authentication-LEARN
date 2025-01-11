import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/getEnv";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerifyCationType from "../constants/verificationCodeType";
import Session from "../models/session.model";
import User from "../models/user.model";
import VerifyCationCode from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { oneYearFromNow } from "../utils/date-time";
import jwt from "jsonwebtoken";
import { refreshTokenSignOptions, signToken } from "../utils/tokenHelper";

type createUserData = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createUser = async (data: createUserData) => {
  //check if user is already existing
  const existingUser = await User.exists({ email: data.email });
  appAssert(!existingUser, CONFLICT, "User already exists");

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

  const sessionInfo = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

type loginUserData = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async (data: loginUserData) => {
  const user = await User.findOne({ email: data.email });

  appAssert(user, UNAUTHORIZED, "invalid user");

  const isValid = await user.comparePassword(data.password);
  appAssert(isValid, UNAUTHORIZED, "invalid  user password");

  const userId = user._id;

  const session = await Session.create({
    userId,
    userAgent: data.userAgent || undefined,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({ ...sessionInfo, userId });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
