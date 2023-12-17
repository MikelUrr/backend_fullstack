import { Router } from 'express';
import userApiController from '../controllers/userController/userApiController.js';
import reservationsApiController from '../controllers/reservationsController/reservationsApiController.js';
import {photoUpload} from "./../middlewares/multerConfig.js"
import {isAuthenticatedApi} from '../middlewares/authMiddleware.js';


const router = Router();



router.post('/', photoUpload.single('foto'),(req, res) => {
    userApiController.createUser(req, res);
  });


router.delete('/:id/delete', isAuthenticatedApi,(req, res) => {
    userApiController.removeUser(req, res);
  });

  router.put('/:id', photoUpload.single('foto'), isAuthenticatedApi, (req, res) => {
    userApiController.updateUser(req, res);
  });
  router.post('/useractive', isAuthenticatedApi, (req, res) => {
    userApiController.deactivateUser(req, res);
  });
//con este get /user/id obtienes todos los datos de usuario
  router.get('/:id', isAuthenticatedApi,(req, res) => {
    userApiController.getusersById(req, res);
  });

  router.get('/', isAuthenticatedApi,(req, res) => {
    userApiController.getAllUsers(req, res);
  });
//con este user/id/get obtienes todas las casa del usuario
  router.get('/:id/houses', isAuthenticatedApi,(req, res) => {
    
    userApiController.getHousesByUserId(req, res);
  });

  //con este /user/id/reservation obtienes las reservas que ha hecho el usuario como guest

  router.get('/:id/reservation', isAuthenticatedApi,(req, res) => {
    
    reservationsApiController.getReservationByuserId(req, res);
  });

  //con este user/houseid/housereservation se obtiene las reservas que tiene la casa
  router.get('/:id/housereservation', isAuthenticatedApi,(req, res) => {
  
    reservationsApiController.getReservationByhouseId(req, res);
  });


  export default router;