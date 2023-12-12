import { Router } from 'express';
import reservationsApiController from '../controllers/reservationsController/reservationsApiController.js';


const router = Router();



router.post('/',  (req, res) => {
    reservationsApiController.createReservation(req, res);
  });


router.delete('/:id/delete', (req, res) => {
    reservationsApiController.removeReservation(req, res);
  });

  router.put('/:id', (req, res) => {
    reservationsApiController.updateReservation(req, res);
  });

  router.get('/:id', (req, res) => {
    reservationsApiController.getReservationById(req, res);
  });

  router.get('/', (req, res) => {
    reservationsApiController.getAllReservations(req, res);
  });

  


  export default router;