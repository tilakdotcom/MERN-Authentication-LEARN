import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import VerifyCationType from "../constants/verificationCodeType";
import Session from "../models/session.model";
import User from "../models/user.model";
import VerifyCationCode from "../models/verificationCode.model";
import appAssert from "../utils/appAssert";
import {
  oneDayInMS,
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
