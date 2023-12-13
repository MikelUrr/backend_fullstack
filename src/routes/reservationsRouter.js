import { Router } from 'express';
import reservationsApiController from '../controllers/reservationsController/reservationsApiController.js';
import {isAuthenticatedApi} from '../middlewares/authMiddleware.js';

const router = Router();



router.post('/', isAuthenticatedApi, (req, res) => {
    reservationsApiController.createReservation(req, res);
  });


router.delete('/:id/delete', isAuthenticatedApi, (req, res) => {
    reservationsApiController.removeReservation(req, res);
  });

  router.put('/:id', isAuthenticatedApi, (req, res) => {
    reservationsApiController.updateReservation(req, res);
  });

  router.get('/:id', isAuthenticatedApi,(req, res) => {
    reservationsApiController.getReservationById(req, res);
  });

  router.get('/', isAuthenticatedApi, (req, res) => {
    reservationsApiController.getAllReservations(req, res);
  });

  


  export default router;