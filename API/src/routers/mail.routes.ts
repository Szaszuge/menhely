import { Router } from "express";

import * as mailController from "../controllers/mailer.controller";

const router = Router();

router.post('/render', mailController.RenderMail);

router.get('/', (req, res) => {res.send("Mail routes are connected.")});

module.exports = router;