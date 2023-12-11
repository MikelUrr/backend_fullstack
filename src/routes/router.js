import { Router } from 'express';
import userRouter from "./userRouter.js"
import houseRouter from "./houseRouter.js"
import reservationsRouter from "./reservationsRouter.js"
import auth from "./auth.js"
import filteredRouter from "./filteredRouter.js"
import randomRouter from "./randomRouter.js"


const router = Router();

router.use ('/user', userRouter);
router.use ('/house', houseRouter)
router.use ('/reservations', reservationsRouter)
router.use ('/search', filteredRouter)
router.use ('/login', auth)
router.use ('/landing', randomRouter)







export default router;