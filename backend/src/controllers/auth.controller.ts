import asyncHandler from "../middlewares/asyncHandler.middleware";
import { CREATED ,OK, UNAUTHORIZED} from "../constants/http";
import { createUser, loginUser, refreshUserAccessToken, resetPassword, sendPasswordEmail, verifyEmail } from "../servies/auth.services";
import { clearAuthCookie, getRefreshTokenCookiesOptions, setAuthCookies } from "../utils/cookies";
import { emailschema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema } from "./auth.schema";
import { verifyToken } from "../utils/tokenHelper";
import Session from "../models/session.model";
import appAssert from "../utils/appAssert";

export const registerHandler = asyncHandler(async (req, res) => {
  const userAgent = req.headers["user-agent"];
  const body = registerSchema.parse({
    ...req.body,
    userAgent,
  });

  const { accessToken, refreshToken, user } = await createUser(body);

  return setAuthCookies({ accessToken, refreshToken, res })
    .status(CREATED)
    .json({
      message: "User registered successfully!",
      data: user,
    });
});

export const loginHandler =asyncHandler(async (req, res)=>{
  const userAgent = req.headers["user-agent"];
  const body = loginSchema.parse({
    ...req.body,
    userAgent,
  });

  const {accessToken,refreshToken,user} =await loginUser(body)
  return setAuthCookies({accessToken,refreshToken,res}).status(OK).json({
    message : "user Login SuccessFully",
    data:user
  })
})

export const logoutHandler = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken

  const {payload} = verifyToken(accessToken)
  if(payload){
    await Session.findByIdAndDelete(payload.sessionId)
  }
  return clearAuthCookie(res).status(OK).json({
    message: "User logged out successfully!",
  })

})

export const refreshHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string || undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Refresh token not valid or expired")
  
  const {accessToken, newRefreshToken} =  await refreshUserAccessToken(refreshToken || "")

  if(newRefreshToken){
    res.cookie("refreshToken",  newRefreshToken, getRefreshTokenCookiesOptions())
  }

  return res
  .status(OK)
  .cookie("accessToken", accessToken, getRefreshTokenCookiesOptions())
  .json({
    message : "Access Token was successfully  refreshed"
  })
})

export const verifyEmailHandler = asyncHandler(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code) 

  const {user} =await verifyEmail(verificationCode)

  return res
 .status(OK)
 .json({
    message : "Email verification successful",
    data: user
  })
})


export const sendPasswordEmailHandler = asyncHandler(async (req, res)=>{
  const email = emailschema.parse(req.body.email)
  await sendPasswordEmail(email)


  return res.status(OK).json({
    message : "password reset link has been sent to your email"
  })
})

export const resetPasswordHandler = asyncHandler(async (req, res) => {
  const body = resetPasswordSchema.parse({
    ...req.body,
  })
  await resetPassword(body)
  
  
  return clearAuthCookie(res).status(OK).json({
    message: "Password reset successful",
  })
})