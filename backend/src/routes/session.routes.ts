import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.middleware";
import { getSessionsHandler } from "../controllers/session.controller";



const router = Router()

router.use(verifyUser)

router.route('/').get(getSessionsHandler)


export default  router