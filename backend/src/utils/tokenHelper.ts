import jwt, { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { userDocument } from "../models/user.model";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/getEnv";

export type RefreshTokenPayloadd = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: userDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaultSignOptions: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: ACCESS_TOKEN_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: REFRESH_TOKEN_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayloadd,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaultSignOptions,
    ...signOpts,
  });
};
