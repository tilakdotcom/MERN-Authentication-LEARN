import { CookieOptions, Response } from "express";
import { FifteenMinutesFromNow, thirtyDaysFromNow } from "./date-time";

type SetAuthParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

const defaultCookies: CookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  // secure: process.env.NODE_ENV === "production",
};

const getAccessTokenCookiesOptions = (): CookieOptions => {
  return { ...defaultCookies, expires: FifteenMinutesFromNow() };
};

const getRefreshTokenCookiesOptions = (): CookieOptions => {
  return {
    ...defaultCookies,
    expires: thirtyDaysFromNow(), // 30 days
    path: "/auth/refresh",
  };
};

const setAuthCookies = ({
  accessToken,
  refreshToken,
  res,
}: SetAuthParams) => {};
