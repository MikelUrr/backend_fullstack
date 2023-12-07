import { Router } from 'express';
import userRouter from "./userRouter.js"
import houseRouter from "./houseRouter.js"
import reservationsRouter from "./reservationsRouter.js"
import auth from "./auth.js"


const router = Router();

router.use ('/user', userRouter);
router.use ('/house', houseRouter)
router.use ('/reservations', reservationsRouter)

router.use ('/login', auth)






export default router;