// import jwt from "jsonwebtoken";
// import User from "../models/user.model";
// import { NextFunction, Request, Response } from "express";
// import asyncHandler from "./asyncHandler.middleware";
// import appAssert from "../utils/appAssert";
// import { UNAUTHORIZED } from "../constants/http";
// import { ACCESS_TOKEN_SECRET } from "../constants/getEnv";
// import { verifyToken } from "../utils/tokenHelper";

// // Extend Request to include `user`
// declare global {
//   namespace Express {
//     interface Request {
//       payload?: Record<string, any>;
//     }
//   }
// }

// const verifyUser = asyncHandler(
//   async (req: Request, _res: Response, next: NextFunction) => {
//     try {
//       const token =
//         req.cookies?.accessToken ||
//         req.header("Authorization")?.replace("Bearer ", "");

//       // validate token
//       appAssert(token, UNAUTHORIZED, "Not authorized, token is required");

//       //token decode
//       const {decode} = verifyToken(token)

//       const user = await User.findById(decode?.userId).select("-password");

//       appAssert(user, UNAUTHORIZED, "Not authorized, token is required");

//       req.payload = user;
//       next();
//     } catch (error) {
//       console.log("Error in Middleware", error);
//       next(error);
//     }
//   }
// );

// export default verifyUser;
