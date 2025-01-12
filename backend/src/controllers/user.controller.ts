import { NOT_FOUND, OK } from "../constants/http";
import asyncHandler from "../middlewares/asyncHandler.middleware";
import User from "../models/user.model";
import appAssert from "../utils/appAssert";



export const  getUserHanler = asyncHandler(async (req, res)=>{
  const user = await User.findById(req.userId);

  appAssert(user, NOT_FOUND, "User not found")

  res.status(OK).json({
    message: "Hello from user",
    user
  })
})