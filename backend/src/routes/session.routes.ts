import { Router } from "express";
import verifyUser from "../middlewares/verifyUser.middleware";
import { deleteSessionsHandler, getSessionsHandler } from "../controllers/session.controller";



const router = Router()

router.use(verifyUser)

router.route('/').get(getSessionsHandler)

router.route('/:id').get(deleteSessionsHandler)



export default  router