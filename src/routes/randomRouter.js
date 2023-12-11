import { Router } from 'express';
import houseApiController from '../controllers/houseController/houseApiController.js';




const router = Router();



  
  router.get('/houses', (req, res) => {
    houseApiController.getRandomHouses(req, res);
  });

  


  export default router;