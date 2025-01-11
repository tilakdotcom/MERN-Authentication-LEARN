import asyncHandler from "../middlewares/asyncHandler.middleware";
import { CREATED } from "../constants/http";
import { z } from "zod";
import { createUser } from "../servies/auth.services";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  userAgent: z.string().optional(),
});

const registerHandler = asyncHandler(async (req, res) => {
  const userAgent = req.headers["User-Agent"];
  const body = registerSchema.parse({
    ...req.body,
    userAgent,
  });

  const { accessToken, refreshToken, session, user } = await createUser(body);

  return setAuthCookies({ accessToken, refreshToken, res })
    .status(CREATED)
    .json({
      message: "User registered successfully!",
      data: user,
    });
});

export { registerHandler };
