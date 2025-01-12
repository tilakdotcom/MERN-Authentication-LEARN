
import { z } from "zod";


export const emailschema =  z.string().email()
export const passwordSchema =  z.string().min(8).max(100)
const userAgentSchema = z.string().optional()

export const registerSchema = z.object({
  email:emailschema,
  password:passwordSchema,
  userAgent:userAgentSchema
});


export const loginSchema = z.object({
  email:emailschema,
  password:passwordSchema,
  userAgent:userAgentSchema
});

export const verificationCodeSchema  = z.string().min(4).max(24)