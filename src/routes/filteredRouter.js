import requestApiReservations from "../controllers/reservationsController/requestApiReservations.js";
import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {
    requestApiReservations.requestReservation(req, res);
  });



  export default router;