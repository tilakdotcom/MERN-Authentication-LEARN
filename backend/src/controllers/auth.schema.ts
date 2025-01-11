
import { z } from "zod";


const emailschema =  z.string().email()
const passwordSchema =  z.string().min(8).max(100)
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
