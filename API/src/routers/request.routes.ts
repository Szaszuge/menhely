import { Router } from "express";

import * as requestController from "../controllers/request.controller";
import * as mailController from "../controllers/mailer.controller";

const router = Router();

router.get('/getAll', requestController.getAllRequests);
router.get('/getAllRaw', requestController.getAllRequestsRaw);
router.post('/accept', requestController.acceptRequest, mailController.RenderMailThen, requestController.deleteRequest);
router.post('/refuse', mailController.RenderMailThen, requestController.deleteRequest);

module.exports = router;