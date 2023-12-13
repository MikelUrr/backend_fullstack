import requestApiReservations from "../controllers/reservationsController/requestApiReservations.js";
import { Router } from 'express';
import {isAuthenticatedApi} from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/', isAuthenticatedApi,(req, res) => {
    requestApiReservations.requestReservation(req, res);
  });



  export default router;