import { Router } from 'express';
import houseApiController from '../controllers/houseController/houseApiController.js';
import {getApiCities} from "../controllers/citiesController/citiesController.js"
import {isAuthenticatedApi} from '../middlewares/authMiddleware.js';
import userApiController from '../controllers/userController/userApiController.js';

const router = Router();


router.get('/credentials',isAuthenticatedApi,(req, res) => {
  userApiController.getUsersessionId(req, res);
});

router.post('/changestate',isAuthenticatedApi,(req, res) => {
  houseApiController.stopReservations(req, res);
});
  
  router.get('/houses',(req, res) => {
    houseApiController.getRandomHouses(req, res);
  });


  router.get('/cities',(req, res) => {
    getApiCities(req, res);
  });

  


  export default router;