import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";



const router = Router()

router.route("/register").post(registerHandler)


export default router