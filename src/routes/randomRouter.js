import { Router } from 'express';
import houseApiController from '../controllers/houseController/houseApiController.js';
import {getApiCities} from "../controllers/citiesController/citiesController.js"



const router = Router();



  
  router.get('/houses', (req, res) => {
    houseApiController.getRandomHouses(req, res);
  });


  router.get('/cities', (req, res) => {
    getApiCities(req, res);
  });

  


  export default router;