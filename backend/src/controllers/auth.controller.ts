import asyncHandler from "../middlewares/asyncHandler.middleware";
import { CREATED ,OK} from "../constants/http";
import { createUser, loginUser } from "../servies/auth.services";
import { clearAuthCookie, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schema";
import { verifyToken } from "../utils/tokenHelper";
import Session from "../models/session.model";

const registerHandler = asyncHandler(async (req, res) => {
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

const loginHandler =asyncHandler(async (req, res)=>{
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

const logoutHandler = asyncHandler(async (req, res) => {
  const accessToken = req.cookies.accessToken

  const {payload} = verifyToken(accessToken)
  if(payload){
    await Session.findByIdAndDelete(payload.sessionId)
  }
  return clearAuthCookie(res).status(OK).json({
    message: "User logged out successfully!",
  })

})
export { registerHandler,loginHandler, logoutHandler };
