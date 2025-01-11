import { Router } from "express";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/auth.controller";
// import verifyUser from "../middlewares/verifyUser.middleware";



const router = Router()

router.route("/register").post(registerHandler)

router.route("/login").post(loginHandler)

router.route("/logout").get(logoutHandler)



export default router