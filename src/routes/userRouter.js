import { Router } from 'express';
import userApiController from '../controllers/userController/userApiController.js';
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

  router.get('/:id', (req, res) => {
    userApiController.getusersById(req, res);
  });

  router.get('/', (req, res) => {
    userApiController.getAllUsers(req, res);
  });

  export default router;