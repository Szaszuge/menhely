import { Router } from "express";

import * as userController from "../controllers/user.controller";

const router = Router();

router.post('/reserve', userController.reserve);
router.post('/getStatByID', userController.getStatusByID);
router.post('/activateByID', userController.activateById);
router.post('/login', userController.login);
router.post('/recover', userController.recover);
router.get('/getAll', userController.getAllUsers);


router.get('/', (req, res) => {res.send("User routes are connected.")});

module.exports = router;