import { Router } from "express";

import * as userController from "../controllers/user.controller";

const router = Router();
/**
 * USER modul útvonalai
 */

// reserve new user

router.post('/reserve', userController.reserve);

// login user

//router.post('/login', userController.login);

router.get('/', (req, res) => {res.send("User routes are connected.")});

module.exports = router;