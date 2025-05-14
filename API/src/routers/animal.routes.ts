import { Router } from "express";

import * as animalController from "../controllers/animal.controller";
import * as fileController from '../controllers/file.controller';
import * as mailController from "../controllers/mailer.controller";

const upload = require('../middlewares/upload.middleware');

const router = Router();

router.post('/add', upload.single('file'), animalController.reserve);
router.post('/update', upload.single('file'), animalController.update);
router.post('/publify', animalController.togglePublic)

router.post('/getByID', animalController.getByID);
router.get('/getAll', animalController.getAllAnimals);
router.get('/getAllRaw', animalController.getAllAnimalsRaw);
router.get('/getHomePets', animalController.getHomePets);

router.post('/isAdoptable', animalController.isAdoptable)

router.post('/delete', animalController.deleteByID)

module.exports = router;