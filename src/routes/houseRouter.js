import { Router } from 'express';
import houseApiController from '../controllers/houseController/houseApiController.js';




const router = Router();



router.post('/',  (req, res) => {
    houseApiController.createHouse(req, res);
  });


router.delete('/:id/delete', (req, res) => {
    houseApiController.removeHouse(req, res);
  });

  router.put('/:id', (req, res) => {
    houseApiController.updateHouse(req, res);
  });

  router.get('/:id', (req, res) => {
    houseApiController.getHousesById(req, res);
  });

  router.get('/', (req, res) => {
    houseApiController.getAllHouses(req, res);
  });



  export default router;