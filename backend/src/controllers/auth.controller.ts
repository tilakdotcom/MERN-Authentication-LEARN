import asyncHandler from "../middlewares/asyncHandler.middleware";
import { CREATED } from "../constants/http";
import { z } from "zod";

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

  res.status(CREATED).json({ message: "User registered successfully!" });
});

export { registerHandler };
