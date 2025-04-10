import { Router } from "express";

import * as animalController from "../controllers/animal.controller";
import * as fileController from '../controllers/file.controller';
const upload = require('../middlewares/upload.middleware');

const router = Router();

router.post('/add', upload.single('file'), animalController.reserve);


module.exports = router;