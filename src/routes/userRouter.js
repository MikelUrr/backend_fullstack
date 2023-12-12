import { Router } from 'express';
import userApiController from '../controllers/userController/userApiController.js';
import reservationsApiController from '../controllers/reservationsController/reservationsApiController.js';
import {photoUpload} from "./../middlewares/multerConfig.js"



const router = Router();



router.post('/', photoUpload.single('foto'), (req, res) => {
    userApiController.createUser(req, res);
  });


router.delete('/:id/delete', (req, res) => {
    userApiController.removeUser(req, res);
  });

  router.put('/:id', photoUpload.single('foto'), (req, res) => {
    userApiController.updateUser(req, res);
  });
//con este get /user/id obtienes todos los datos de usuario
  router.get('/:id', (req, res) => {
    userApiController.getusersById(req, res);
  });

  router.get('/', (req, res) => {
    userApiController.getAllUsers(req, res);
  });
//con este user/id/get obtienes todas las casa del usuario
  router.get('/:id/houses', (req, res) => {
    
    userApiController.getHousesByUserId(req, res);
  });

  //con este /user/id/reservation obtienes las reservas que ha hecho el usuario como guest

  router.get('/:id/reservation', (req, res) => {
    
    reservationsApiController.getReservationByuserId(req, res);
  });

  //con este user/houseid/housereservation se obtiene las reservas que tiene la casa
  router.get('/:id/housereservation', (req, res) => {
  
    reservationsApiController.getReservationByhouseId(req, res);
  });


  export default router;