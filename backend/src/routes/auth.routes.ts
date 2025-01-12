import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, registerHandler, verifyEmailHandler } from "../controllers/auth.controller";
// import verifyUser from "../middlewares/verifyUser.middleware";



const router = Router()

router.route("/register").post(registerHandler)

router.route("/login").post(loginHandler)

router.route("/logout").get(logoutHandler)

router.route("/refresh").get(refreshHandler,)

router.route("/verify-email/:code").get(verifyEmailHandler)

export default router