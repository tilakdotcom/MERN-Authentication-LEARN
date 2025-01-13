import { CLIENT_URI } from "../constants/getEnv";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import VerifyCationType from "../constants/verificationCodeType";
import { sendResetPassword, sendVerificationEmail } from "../mailers/mail";
import Session from "../models/session.model";
import User from "../models/user.model";
import VerifyCationCode from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import { passwordHasher } from "../utils/bcrypt";
import {
  fineMinutesAgo,
  oneDayInMS,
  oneHourFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date-time";
import {
  RefreshTokenPayloadd,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
} from "../utils/tokenHelper";

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
    type: VerifyCationType.VERIFY_EMAIL,
    expiresAt: oneYearFromNow(),
  });

  //send verification email
  const url = `${CLIENT_URI}/email-verify/${verificationCode._id}`;
  sendVerificationEmail(user.email, url);

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

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayloadd>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await Session.findById(payload.sessionId).select("-password");

  const now = Date.now();

  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Refresh token is not valid or expired"
  );

  // REFRESH the session if it expires in next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= oneDayInMS;

  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = refreshToken
    ? signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

export const verifyEmail = async (code: string) => {
  const validCode = await VerifyCationCode.findOne({
    _id: code,
    type: VerifyCationType.VERIFY_EMAIL,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, UNAUTHORIZED, "Invalid verification code");

  const user = await User.findByIdAndUpdate(
    validCode.userId,
    { $set: { emailVerified: true } },
    { new: true }
  ).select("-password");

  appAssert(user, NOT_FOUND, "User not found");

  await validCode.deleteOne();

  return { user };
};

export const sendPasswordEmail = async (email: string) => {
  const user = await User.findOne({ email });
  appAssert(user, NOT_FOUND, "User not found");

  const count = await VerifyCationCode.countDocuments({
    userId: user._id,
    type: VerifyCationType.RESET_PASSWORD,
    createdAt: { $gt: fineMinutesAgo() },
  });

  appAssert(
    count < 2,
    TOO_MANY_REQUESTS,
    "Too many requests received for reset password"
  );

  const expiresAt = oneHourFromNow();
  const verificationCode = await VerifyCationCode.create({
    userId: user._id,
    type: VerifyCationType.RESET_PASSWORD,
    expiresAt,
  });

  const url = `${CLIENT_URI}/password-reset?code=${
    verificationCode._id
  }&exp=${expiresAt.getTime()}`;

 sendResetPassword(user.email, url);

  return {
    url,
    user,
  };
};

type TResetPassword = {
  password: string;
  code: string;
};

export const resetPassword = async ({ code, password }: TResetPassword) => {
  const validCode = await VerifyCationCode.findOne({
    _id: code,
    type: VerifyCationType.RESET_PASSWORD,
    expiresAt: { $gt: new Date() },
  });
  appAssert(validCode, UNAUTHORIZED, "Invalid verification code");
  const hashedPassword = await passwordHasher(password);
  const user = await User.findByIdAndUpdate(
    validCode.userId,
    { $set: { password: hashedPassword } },
    { new: true }
  ).select("-password");
  appAssert(user, NOT_FOUND, "User not found");

  await validCode.deleteOne();
  await Session.deleteMany({
    userId: user._id,
  });

  return {
    user,
  };
};
