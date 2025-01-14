import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler.middleware";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/tokenHelper";
import ApiErrorCode from "../constants/appErroCode";

const verifyUser = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken ||
        (req.header("Authorization")?.replace("Bearer ", "") as string);

      // validate token
      appAssert(
        token,
        UNAUTHORIZED,
        "Not authorized, token is required gg",
        ApiErrorCode.INVALID_ACCCESS_TOKEN
      );

      //token decode
      const { payload, error } = verifyToken(token);

      appAssert(
        payload,
        UNAUTHORIZED,
        error === "jwt expired"
          ? "token is Expired"
          : "Not authorized, payload is required",
        ApiErrorCode.INVALID_ACCCESS_TOKEN
      );
      req.userId = payload.userId;
      req.sessionId = payload.sessionId;
      next();
    } catch (error) {
      console.log("Error in Middleware", error);
      next(error);
    }
  }
);

export default verifyUser;
