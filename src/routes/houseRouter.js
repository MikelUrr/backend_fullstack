import { Router } from 'express';
import houseApiController from '../controllers/houseController/houseApiController.js';
import {isAuthenticatedApi} from '../middlewares/authMiddleware.js';



const router = Router();



router.post('/', isAuthenticatedApi, (req, res) => {
    houseApiController.createHouse(req, res);
  });


router.delete('/:id',isAuthenticatedApi,(req, res) => {
    houseApiController.removeHouse(req, res);
  });

  router.put('/:id', isAuthenticatedApi,(req, res) => {
    houseApiController.updateHouse(req, res);
  });

  router.get('/:id', isAuthenticatedApi,(req, res) => {
    houseApiController.getHousesById(req, res);
  });

  router.get('/', isAuthenticatedApi,(req, res) => {
    houseApiController.getAllHouses(req, res);
  });

  router.get('/user/:id', isAuthenticatedApi,(req, res) => {
    houseApiController.getHousesByUserId(req, res);
  });

 
  


  export default router;