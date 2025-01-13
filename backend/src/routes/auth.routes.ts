import { Router } from "express";
import { loginHandler, logoutHandler, refreshHandler, registerHandler, resetPasswordHandler, sendPasswordEmailHandler, verifyEmailHandler } from "../controllers/auth.controller";
// import verifyUser from "../middlewares/verifyUser.middleware";



const router = Router()

router.route("/register").post(registerHandler)

router.route("/login").post(loginHandler)

router.route("/logout").get(logoutHandler)

router.route("/refresh").get(refreshHandler,)

router.route("/verify-email/:code").get(verifyEmailHandler)

router.route("/forgot-password").post(sendPasswordEmailHandler)

router.route("/reset-password").patch(resetPasswordHandler)

export default router