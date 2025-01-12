import { Router } from "express";
import { getUserHanler } from "../controllers/user.controller";
import verifyUser from "../middlewares/verifyUser.middleware";



const router = Router()

router.use(verifyUser)

router.route('/').get(getUserHanler)


export default  router