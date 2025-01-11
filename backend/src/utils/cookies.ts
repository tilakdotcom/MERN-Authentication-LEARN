import { CookieOptions, Response } from "express";
import { FifteenMinutesFromNow, thirtyDaysFromNow } from "./date-time";

type SetAuthParams = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const  REFRESH_PATH = "/auth/refresh"
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
    path: REFRESH_PATH,
  };
};

const setAuthCookies = ({
  accessToken,
  refreshToken,
  res,
}: SetAuthParams) => {
  return res
  .cookie("accessToken",accessToken,getAccessTokenCookiesOptions())
  .cookie("refreshToken",refreshToken,getRefreshTokenCookiesOptions())
};


const clearAuthCookie =(res:Response)=>{
  return res.clearCookie("accessToken").clearCookie("refreshToken",{
    path: REFRESH_PATH,
  });
}

export { setAuthCookies,clearAuthCookie };