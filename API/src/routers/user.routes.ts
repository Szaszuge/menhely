import { Router } from "express";

import * as userController from "../controllers/user.controller";

const router = Router();

router.post('/reserve', userController.reserve);
router.post('/getStatByID', userController.getStatusByID);
router.post('/activateByID', userController.activateById);
router.post('/login', userController.login);
router.post('/recover', userController.recover);
router.post('/resetPass', userController.resetPass)
router.post('/revertPass', userController.revertPass);

router.post('/mailData', userController.mailData);

router.get('/getAll', userController.getAllUsers);
router.post('/promote', userController.Promote);
router.post('/demote', userController.Demote);

router.get('/', (req, res) => {res.send("User routes are connected.")});

module.exports = router;